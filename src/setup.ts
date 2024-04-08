import dayjs from "dayjs";
import { welcomeBlock } from "./components/welcome-block";
const todayDate = document.getElementById("today-date") as HTMLDivElement;
const currentTime = document.getElementById("current-time") as HTMLDivElement;
const windowHeader = document.getElementById("window-header") as HTMLDivElement;

const cmdPlayground = document.getElementById(
  "cmd-playground"
) as HTMLDivElement;
const cmdWindow = document.getElementById("cmd-window") as HTMLDivElement;

todayDate.innerHTML = dayjs().locale("en").format("ddd D MMM");
currentTime.innerHTML = dayjs().locale("en").format("HH:mm");

const widthWindow = window.innerWidth / 2.5;
const heightWindow = window.innerWidth / 3;

cmdWindow.style.height = `${heightWindow}px`;
cmdWindow.style.width = `${widthWindow}px`;

cmdPlayground.style.height = `${heightWindow - 95}px`;
cmdPlayground.innerHTML += welcomeBlock;

windowHeader.addEventListener("dblclick", () => {
  cmdWindow.style.bottom = "0";
  cmdWindow.style.height = `${window.innerHeight - 95}px`;
  cmdWindow.style.width = `${window.innerWidth}px`;

  cmdPlayground.style.height = `${window.innerHeight * 0.78}px`;
});
