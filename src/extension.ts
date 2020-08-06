// Vscode
import * as vscode from 'vscode';

// Commands
import commands from './commends';

/**
 * 注册命令
 * @param context
 */
export function activate(context: vscode.ExtensionContext) {
  commands.map(command => {
    context.subscriptions.push(vscode.commands.registerCommand(command.name, command.activate));
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(command.deactivate));
  });
}

/**
 * 注销命令
 */
export function deactivate() { }
