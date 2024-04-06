import { directories } from "../constants/dirs";
import type { ResponseType } from "../type";
import { findDirectory } from "../utils/find-dir";
const cmdPlayground = document.getElementById(
  "cmd-playground"
) as HTMLTextAreaElement;

export const successResponse = ({ cmd, dir, runTime, args }: ResponseType) => `
  <div class="border-b border-zinc-700 px-3 space-y-1 py-4 w-full">
    <div class="text-zinc-300">~/${dir}<span class="text-[10px] ml-1">(${runTime})</span></div>
    <div class="font-semibold">${cmd} ${args?.join(" ")}</div>
  </div>
`;

const rejectResponse = ({ cmd, dir, runTime, args }: ResponseType) => `
<div class="border-l-4 border-red-300 px-3 space-y-1 py-4 bg-red-700/20 w-full">
  <div class="text-zinc-300">~/${dir}<span class="text-[10px] ml-1">(${runTime})</span></div>
  <div class="font-semibold">${cmd} ${args?.join(" ")}</div>
  <div>cd: no such file or directory: ${args?.[0]}</div>
</div>
`;

export const cd = (
  props: ResponseType,
  changeDir: (dir: string | "..") => void
) => {
  const currentDirName = props.dir.split("/");
  const findDir = findDirectory(
    currentDirName[currentDirName.length - 1],
    directories
  );

  const dirs = findDir.subDirs.map((dir) => dir.dir);

  if (props.args?.[0] === undefined) {
    const block = successResponse(props);
    cmdPlayground.innerHTML += block;
    return;
  }

  if (
    dirs.includes(props?.args?.[0] as string) ||
    (props.dir !== "" && props.args?.[0] === "..")
  ) {
    const IS_FOLDER = !props.args?.[0].includes(".");
    if (!IS_FOLDER && props.args?.[0] !== "..") return;

    const block = successResponse(props);
    changeDir(props.args?.[0] as string);
    cmdPlayground.innerHTML += block;
  } else {
    const block = rejectResponse(props);
    cmdPlayground.innerHTML += block;
  }
};
