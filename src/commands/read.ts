import JSONFormatter from "json-formatter-js";
import { store } from "@/lib/store";
import { ResponseType } from "@/type";
import { jsons } from "@/jsons";

const cmdPlayground = document.getElementById(
  "cmd-playground"
) as HTMLTextAreaElement;

const successResponse = (props: ResponseType) => `
  <div class="border-b border-zinc-700 px-3 space-y-1 py-4 w-full">
  <div class="text-zinc-300">~/${props.dir}<span class="text-[10px] ml-1">(${
  props.runTime
})</span></div>
  <div class="font-semibold">${props.cmd} ${props.args?.join(" ")}</div>
  <div class="flex flex-wrap gap-3" id="json-block"></div>
  </div>
  `;

const rejectResponse = (
  { cmd, dir, runTime, args }: ResponseType,
  error: string
) => `
    <div class="border-l-4 border-red-300 px-3 space-y-1 py-4 bg-red-700/20 w-full">
    <div class="text-zinc-300">~/${dir}<span class="text-[10px] ml-1">(${runTime})</span></div>
    <div class="font-semibold">${cmd} ${args?.join(" ")}</div>
    <div>${error}</div>
    </div>
    `;

const warnResponse = ({ cmd, dir, runTime, args }: ResponseType) => `
    <div class="border-l-4 border-yellow-300 px-3 space-y-1 py-4 bg-yellow-700/20 w-full">
    <div class="text-zinc-300">~/${dir}<span class="text-[10px] ml-1">(${runTime})</span></div>
    <div class="font-semibold">${cmd} ${args?.join(" ")}</div>
    <div>read: '${args?.[0]}' is folder, use 'cd' command instead</div>
    </div>
    `;

export const read = (props: ResponseType) => {
  const { folders,  } = store();
  const fileName = props.args?.[0];

  const findFile = folders[0].subDirs?.find((file) => file.dir === fileName);

  if (!findFile) {
    const block = rejectResponse(
      props,
      `read: no such file: ${props.args?.[0]}`
    );
    cmdPlayground.innerHTML += block;

    return;
  }

  if (!findFile.dir.includes(".")) {
    const block = warnResponse(props);
    cmdPlayground.innerHTML += block;
    return;
  }

  const json = jsons.find((json) => json.name === fileName);

  if (json) {
    const block = successResponse(props);
    cmdPlayground.innerHTML += block;

    const formatter = new JSONFormatter(json?.json, 1, { theme: "dark" });
    const jsonBlock = document.getElementById("json-block") as HTMLDivElement;
    jsonBlock.appendChild(formatter.render());
  }
};
