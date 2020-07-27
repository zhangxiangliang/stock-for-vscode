export interface Command {
  name: string,
  activate: (...args: any[]) => any,
  deactivate: (...args: any[]) => any,
}

export default Command;
