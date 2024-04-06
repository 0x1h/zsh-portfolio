import { runSetup } from "./setup";
runSetup();

import { availableCommands } from "./constants/commands";
import { DEFAULT_DIR } from "./constants/dirs";
import { failedResponse } from "./components/failed-response";
import { scrollDown } from "./utils/scroll-down";
import { commands } from "./commands";
import { CommandKeys } from "./type";
import { changeDirectory } from "./utils/change-dir";

const input = document.getElementById("cmd-input") as HTMLTextAreaElement;
const cmdPlayground = document.getElementById(
  "cmd-playground"
) as HTMLTextAreaElement;

let currDir = DEFAULT_DIR;

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const { value } = input;
    const [cmd, ...args] = value.split(" ");

    event.preventDefault();
    input.value = "";

    const IS_COMMAND_LEGIT = availableCommands.includes(cmd as CommandKeys);

    if (IS_COMMAND_LEGIT) {
      commands({ cmd, dir: currDir, runTime: "0.002s", args }, (e) =>
        changeDirectory(e, currDir, (newDir) => (currDir = newDir))
      )[cmd as CommandKeys]();

      scrollDown();
      return;
    }

    const block = failedResponse({
      cmd,
      dir: currDir,
      runTime: "0.002s",
      args,
    });
    cmdPlayground.innerHTML += block;
    scrollDown();
  }
});
