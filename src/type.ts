import { commands } from "./commands";

export type ResponseType = {
  dir: string;
  cmd: string;
  runTime: string;
  args?: string[];
};

export type CommandKeys = keyof ReturnType<typeof commands>;
