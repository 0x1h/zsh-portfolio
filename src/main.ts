import { runSetup } from "./setup";
runSetup();

import { availableCommands } from "./constants/commands";
import { failedResponse } from "./components/failed-response";
import { scrollDown } from "./utils/scroll-down";
import { commands } from "./commands";
import { CommandKeys } from "./type";
import { store } from "./lib/store";

const input = document.getElementById("cmd-input") as HTMLTextAreaElement;
const cmdPlayground = document.getElementById(
  "cmd-playground"
) as HTMLTextAreaElement;

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    
    const { dir } = store();
    const { value } = input;
    const [cmd, ...args] = value.split(" ");

    input.value = "";

    const IS_COMMAND_LEGIT = availableCommands.includes(cmd as CommandKeys);

    if (IS_COMMAND_LEGIT) {
      commands({ cmd, dir, runTime: "0.002s", args })[cmd as CommandKeys]();
      scrollDown();
      return;
    }

    const block = failedResponse({
      cmd,
      dir,
      runTime: "0.002s",
      args,
    });
    cmdPlayground.innerHTML += block;
    scrollDown();
  }
});
