import { ResponseType } from "../type";
import { ls } from "./ls";
import { clear } from "./clear";
import { echo } from "./echo";
import { help } from "./help";
import { cd } from "./cd";

export const commands = (
  props: ResponseType,
  changeDir: (dir: string | "..") => void
) => ({
  clear,
  ls: () => ls(props),
  help: () => help(props),
  echo: () => echo(props),
  open: () => {},
  cd: () => cd(props, changeDir),
});
