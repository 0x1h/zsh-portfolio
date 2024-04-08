import { CommandKeys } from "@/type";

export const availableCommands: CommandKeys[] = [
  "ls",
  "help",
  "echo",
  "read",
  "clear",
  "cd",
] as const;
