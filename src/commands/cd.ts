import { directories } from "@/constants/dirs";
import { changeDirectory } from "@/utils/change-dir";
import type { ResponseType } from "@/type";
import { findDirectory } from "@/utils/find-dir";
import { store } from "@/lib/store";
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
  <div>cd: no such directory: ${args?.[0]}</div>
</div>
`;

const warnResponse = ({ cmd, dir, runTime, args }: ResponseType) => `
  <div class="border-l-4 border-yellow-300 px-3 space-y-1 py-4 bg-yellow-700/20 w-full">
    <div class="text-zinc-300">~/${dir}<span class="text-[10px] ml-1">(${runTime})</span></div>
    <div class="font-semibold">${cmd} ${args?.join(" ")}</div>
    <div>cd: '${args?.[0]}' is file, use 'read' command instead</div>
  </div>
`;

export const cd = (props: ResponseType) => {
  const { chanageFolders } = store();
  const currentDirName = props.dir.split("/");
  const findDir = findDirectory(
    currentDirName[currentDirName.length - 1],
    directories
  );

  const dirs = findDir.subDirs?.map((dir) => dir.dir);

  if (props.args?.[0] === undefined) {
    const block = successResponse(props);
    cmdPlayground.innerHTML += block;
    return;
  }
  
  console.log(props.args?.[0]);

  if (
    dirs?.includes(props?.args?.[0] as string) ||
    (props.dir !== "" && props.args?.[0] === "..")
  ) {
    const IS_FOLDER = !props.args?.[0].includes(".");
    
    if (!IS_FOLDER && props.args?.[0] !== "..") {
      const block = warnResponse(props);
      cmdPlayground.innerHTML += block;

      return;
    }

    if (props.args?.[0] !== "..") {
      const findDirectorySubs = findDir.subDirs?.filter(
        ({ dir }) => dir === props.args?.[0]
      );

      if (findDirectorySubs) {
        chanageFolders(findDirectorySubs);
        changeDirectory(props.args?.[0]);
      }
    } else {
      changeDirectory(props.args?.[0]);
      const outDir = findDirectory(globalThis.dir, directories);
      chanageFolders([outDir]);
    }

    const block = successResponse(props);
    cmdPlayground.innerHTML += block;
  } else {
    const block = rejectResponse(props);
    cmdPlayground.innerHTML += block;
  }
};
