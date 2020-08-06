// Vscode
import * as vscode from 'vscode';

// Utils
import global from '../utils/global';

// Types
import Command from '../../types/command';



/**
 * 股票小助手关闭监听命令
 */
export async function activate() {
  // 展示消息
  vscode.window.showErrorMessage('🐷 韭菜小猪关闭股票监听成功 🚫~');

  global.timer && clearInterval(global.timer);
  global.statusBars.map(statusBar => statusBar.hide());
};

/**
 * 股票小助手注销命令
 */
export function deactivate() { };

const commend: Command = {
  name: 'stock-for-vscode.unwatch',
  activate: activate,
  deactivate: deactivate,
};

export default commend;
