// Vscode
import * as vscode from 'vscode';

// Npm
import dayjs from "dayjs";
import { stocks } from 'stock-api';

// Utils
import config from '../utils/config';
import global from '../utils/global';

// Types
import Stock from '../../types/stock';
import Command from '../../types/command';

/**
 * 股票小助手监听命令
 */
export async function activate() {
  // 展示消息
  vscode.window.showInformationMessage('🐷 韭菜小猪启动股票监听成功 🎉 ~');

  // 数据定时器
  main();
  global.timer && clearInterval(global.timer);
  global.timer = setInterval(() => main(), config.interval * 1000);
};

/**
 * 渲染股票数据
 */
export async function main() {
  // 读取配置数据
  const codes = config.stocks.map(stock => stock.code);

  // 加载配置数据
  const items = await (new stocks['sina']).getStocks(codes);

  // 合并配置数据
  updateStatusBar(config.stocks.map(stock => {
    const item = items.find(item => item.code === stock.code);

    return { ...stock, ...item };
  }));
}

/**
 * 渲染状态栏
 */
export async function updateStatusBar(stocks: Stock[]) {
  let totalIncome = 0;
  let totalAmount = 0;

  // 清除旧状态
  global.statusBars.map(statusBar => statusBar.hide());

  // 增加新状态
  global.statusBars = stocks
    .sort((x, y) => y.unit * y.volume - x.unit * x.volume)
    .map(stock => {
      const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 3);

      // 格式化股票数据
      const baseData = `「${stock.name}」${stock.now.toFixed(2)} ${(stock.percent * 100).toFixed(2)}%`;

      // 格式化个人数据
      const personNow = stock.now ? stock.now : stock.yesterday;
      const personAmount = stock.volume * personNow;
      const personIncome = stock.percent * stock.volume * stock.now;
      const personPercent = stock.unit > 0 ? (stock.now / stock.unit - 1) : 0;
      const personData = (stock.volume > 0) ? `${(personPercent * 100).toFixed(2)}% ${(personIncome).toFixed(2)}` : '';

      // 填充数据
      statusBar.color = stock.percent > 0 ? config.up_color : config.down_color;
      statusBar.text = `${baseData} ${personData}`;

      // 记录数据
      totalIncome = totalIncome + personIncome;
      totalAmount = totalAmount + personAmount;

      // 上涨警告
      if (stock.percent > config.up_percent) {
        vscode.window.showInformationMessage(`${baseData} ${personData}`);
      }

      // 下跌警告
      if (stock.percent < config.down_percent) {
        vscode.window.showErrorMessage(`${baseData} ${personData}`);
      }

      return statusBar;
    });

  // 创建更新时间
  const timeBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 3);
  timeBar.color = totalAmount > 0 ? config.up_color : config.down_color;
  timeBar.text = `⏰ ${dayjs().format('HH:mm:ss')}`;

  // 创建收益情况
  const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 3);
  statusBar.color = totalAmount > 0 ? config.up_color : config.down_color;
  statusBar.text = `😊 ${totalAmount.toFixed(2)} 💰 ${totalIncome.toFixed(2)}`;

  // 显示新状态
  global.statusBars = [timeBar, statusBar, ...global.statusBars];
  global.statusBars.map(statusBar => statusBar.show());
}

/**
 * 股票小助手注销命令
 */
export function deactivate() {
  global.timer && clearInterval(global.timer);
  global.statusBars.map(statusBar => statusBar.hide());
};

const commend: Command = {
  name: 'stock-for-vscode.watch',
  activate: activate,
  deactivate: deactivate,
};

export default commend;
