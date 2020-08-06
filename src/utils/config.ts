// Vscode
import * as vscode from 'vscode';

// Types
import Stock from '../../types/stock';
import VscodeConfig from '../../types/vscode-config';

/**
 * 股票数据格式化
 */
export function initStocks(stocks: any[]): Stock[] {
  return stocks.map(stock => ({
    name: stock.name || '',
    code: stock.code || '',
    unit: stock.unit || 0,
    volume: stock.volume || 0,

    now: stock.now || 0,
    low: stock.low || 0,
    high: stock.high || 0,
    percent: stock.percent || 0,
    yesterday: stock.yesterday || 0,

    watch_low: stock.watch_low || 0,
    watch_high: stock.watch_high || 0,
  }));
}

/**
 * 股票小助手配置加载
 */
export function initConfig(): VscodeConfig {
  // 获取股票小助手配置
  const tool = vscode.workspace.getConfiguration();

  return {
    api: tool.get('api') || 'sina',
    stocks: initStocks(tool.get('stocks') || []),

    interval: tool.get('interval') || 100,
    up_color: tool.get('up_color') || '#ffffff',
    down_color: tool.get('down_color') || '#000000',

    up_percent: tool.get('up_percent') || 0.1,
    down_percent: tool.get('down_percent') || -0.08,
  };
}

/**
 * 股票小助手配置获取
 */
const config: VscodeConfig = initConfig();

export default config;
