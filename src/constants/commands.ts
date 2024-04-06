import { CommandKeys } from "../type";

export const availableCommands: CommandKeys[] = [
  "ls",
  "help",
  "echo",
  "open",
  "clear",
  "cd",
] as const;
