import type { ResponseType } from "@/type";
import { findDirectory } from "@/utils/find-dir";
const cmdPlayground = document.getElementById(
  "cmd-playground"
) as HTMLTextAreaElement;

const successResponse = (props: ResponseType & { dirs: string[] }) => `
  <div class="border-b border-zinc-700 px-3 space-y-1 py-4 w-full">
  <div class="text-zinc-300">~/${props.dir}<span class="text-[10px] ml-1">(${
  props.runTime
})</span></div>
  <div class="font-semibold">${props.cmd}</div>
    <div class="flex flex-wrap gap-3">
      ${props.dirs.map((dir) => `<div class="font-bold">${dir}</div>`).join("")}
    </div>
  </div>
`;

export const ls = (props: ResponseType) => {
  const getDir = props.dir.split("/");

  const findDir = findDirectory(getDir[getDir.length - 1], globalThis.folders);

  const dirs = findDir.subDirs?.map((dir) => dir.dir);

  const block = successResponse({
    ...props,
    dirs: dirs as string[],
  });

  cmdPlayground.innerHTML += block;
};
