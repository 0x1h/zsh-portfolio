import { ResponseType } from "@/type";
const cmdPlayground = document.getElementById(
  "cmd-playground"
) as HTMLTextAreaElement;

export const successResponse = ({
  cmd,
  dir,
  runTime,
  output,
}: ResponseType & { output: string }) => `
  <div class="border-b border-zinc-700 px-3 space-y-1 py-4 w-full">
    <div class="text-zinc-300">~/${dir}<span class="text-[10px] ml-1">(${runTime})</span></div>
    <div class="font-semibold">${cmd} ${output}</div>
    <div class="font-semibold text-zinc-200">${output}</div>
  </div>
`;

export const echo = (props: ResponseType) => {
  const output = props.args?.join(" ") as string;
  const block = successResponse({ ...props, output });
  cmdPlayground.innerHTML += block;
};
