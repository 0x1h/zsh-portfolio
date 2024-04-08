import type { ResponseType } from "@/type";

export const failedResponse = ({ cmd, dir, runTime, args }: ResponseType) => `
  <div class="border-l-4 border-red-300 px-3 space-y-1 py-4 bg-red-700/20 w-full">
    <div class="text-zinc-300">~/${dir}<span class="text-[10px] ml-1">(${runTime})</span></div>
    <div class="font-semibold">${cmd} ${args?.join(" ")}</div>
    <div>zsh: command '${cmd}' not found</div>
  </div>
`;
