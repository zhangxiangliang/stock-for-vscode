// Vscode
import * as vscode from 'vscode';

// Utils
import config from '../utils/config';

// Types
import Command from '../../types/command';

let timer: any = null;

/**
 * 股票小助手监听命令
 */
export async function activate() {
  console.log(config);
  vscode.window.showInformationMessage('🐷 韭菜小猪启动股票监听成功 ~');
};

/**
 * 股票小助手注销命令
 */
export function deactivate() {
  timer && clearInterval(timer);
};

const commend: Command = {
  name: 'stock-for-vscode.watch',
  activate: activate,
  deactivate: deactivate,
};

export default commend;
