import "./setup";
import "./utils/window-events";

import { availableCommands } from "./constants/commands";
import { failedResponse } from "./components/failed-response";
import { scrollDown } from "./utils/scroll-down";
import { commands } from "./commands";
import { CommandKeys } from "./type";
import { store } from "./lib/store";
import { LOCALSTORAGE_QUEUE } from "./constants/keys";

const input = document.getElementById("cmd-input") as HTMLTextAreaElement;
const cmdPlayground = document.getElementById(
  "cmd-playground"
) as HTMLTextAreaElement;

let queueIndex = -1;

input.addEventListener("keydown", (event) => {
  const IS_CURSOR_0 = input.selectionStart == 0 && input.selectionEnd == 0;

  if (event.key === "Enter") {
    event.preventDefault();
    const { dir } = store();
    const { value } = input;
    const [cmd, ...args] = value.split(" ");

    const cacheInputValue = input.value;

    const IS_COMMAND_LEGIT = availableCommands.includes(cmd as CommandKeys);
    input.value = "";

    const queue = globalThis.queue;
    if (cacheInputValue.trim()) {
      queue.unshift(cacheInputValue.trim());
    }
    globalThis.queue = queue;

    localStorage.setItem(LOCALSTORAGE_QUEUE, JSON.stringify(queue));

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
  if (IS_CURSOR_0 && event.key === "ArrowUp") {
    event.preventDefault();

    if (queueIndex === globalThis.queue.length - 1) {
      return;
    }

    queueIndex++;
    console.log({ queueIndex });

    input.value = globalThis.queue[queueIndex];
    input.setSelectionRange(0, 0);
  }

  if (IS_CURSOR_0 && event.key === "ArrowDown") {
    event.preventDefault();
    queueIndex--;

    if (queueIndex <= -1) {
      input.value = "";
      queueIndex = -1;
      return;
    }

    input.value = globalThis.queue[queueIndex];
    input.setSelectionRange(0, 0);
  }
});

window.addEventListener("load", () => {
  const queueStorage = localStorage.getItem(LOCALSTORAGE_QUEUE);
  globalThis.queue = queueStorage ? JSON.parse(queueStorage) : [];
});
