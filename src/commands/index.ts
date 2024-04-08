import { ResponseType } from "@/type";
import { ls } from "./ls";
import { clear } from "./clear";
import { echo } from "./echo";
import { help } from "./help";
import { cd } from "./cd";
import { read } from "./read";

export const commands = (props: ResponseType) => ({
  clear,
  ls: () => ls(props),
  help: () => help(props),
  echo: () => echo(props),
  read: () => read(props),
  cd: () => cd(props),
});
