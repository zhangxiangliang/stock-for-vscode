// Vscode
import * as vscode from 'vscode';

// Types
import VscodeConfig from '../../types/vscode-config';

/**
 * 股票小助手配置加载
 */
export function loadConfig(): VscodeConfig {
  // 获取股票小助手配置
  const tool = vscode.workspace.getConfiguration();

  return {
    api: tool.get('api') || 'netease',
    stocks: tool.get('stocks') || [],

    interval: tool.get('interval') || 100,
    up_color: tool.get('up_color') || '#ffffff',
    down_color: tool.get('down_color') || '#000000',
  };
}

/**
 * 股票小助手配置获取
 */
const config: VscodeConfig = loadConfig();

export default config;
