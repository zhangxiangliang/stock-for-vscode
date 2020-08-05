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

  // let disposable = vscode.commands.registerCommand('stock-for-vscode.watch', () => {
  //   console.log(commands);
  //   // The code you place here will be executed every time your command is executed

  //   // Display a message box to the user
  //
  // });

  // context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
