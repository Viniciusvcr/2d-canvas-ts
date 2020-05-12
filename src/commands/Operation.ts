import Command from "./Command";

export default class Operation {
  history: Command[];
  undone: Command[];
  private static instance?: Operation;

  constructor() {
    this.history = [];
    this.undone = [];
  }

  static getInstance() {
    if (!Operation.instance) {
      Operation.instance = new Operation();
    }

    return Operation.instance;
  }

  executeCommand(command: Command) {
    command.execute();
    this.history.push(command);
    console.log(this.history);
  }

  undoCommand() {
    const lastCommand = this.history.pop();

    if (lastCommand) {
      lastCommand.undo();
      this.undone.push(lastCommand);
    }
  }

  redoCommand() {
    const lastUndone = this.undone.pop();

    if (lastUndone) {
      lastUndone.execute();
      this.history.push(lastUndone);
    }
  }
}
