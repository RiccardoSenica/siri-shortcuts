import { ShortcutsResponse } from './types';
import { pingCommand } from './commands/ping';
import { timeCommand } from './commands/time';

type CommandHandler = (
  userId: string,
  parameters?: Record<string, string>
) => Promise<ShortcutsResponse>;

export class CommandRegistry {
  private commands: Map<string, CommandHandler>;

  constructor() {
    this.commands = new Map();
    this.registerDefaultCommands();
  }

  private registerDefaultCommands() {
    this.register('ping', pingCommand);
    this.register('time', timeCommand);
  }

  register(command: string, handler: CommandHandler) {
    this.commands.set(command.toLowerCase(), handler);
  }

  getCommand(command: string): CommandHandler | undefined {
    return this.commands.get(command.toLowerCase());
  }
}
