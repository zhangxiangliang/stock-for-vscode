// Vscode
import * as vscode from 'vscode';

// Types
import Stock from '../../types/stock';
import Command from '../../types/command';

let timer: any = null;

/**
 * 股票小助手监听命令
 */
export async function activate() { };

/**
 * 股票小助手注销命令
 */
export function deactivate() {
  timer && clearInterval(timer);
};


/**
 * 股票小助手监听配置
 */
export function getConfig() {
  // 获取股票小助手配置
  const config = vscode.workspace.getConfiguration();

  // 获取接口代码、时间间隔、获取股票代码
  const api: string = config.get('api') || 'netease';
  const stocks: Stock[] = config.get('stocks') || [];

  // 获取刷新间隔 和 涨跌幅颜色
  const interval: number = config.get('interval') || 100;
  const upColor: string = config.get('up_color') || '#ffffff';
  const downColor: string = config.get('down_color') || '#000000';

  return {
    api,
    stocks,

    interval,
    upColor,
    downColor,
  };
}

const commend: Command = {
  name: 'stock-for-vscode.watch',
  activate: activate,
  deactivate: deactivate,
};

export default commend;
