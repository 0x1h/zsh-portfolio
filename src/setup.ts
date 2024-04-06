import dayjs from "dayjs";
const todayDate = document.getElementById("today-date") as HTMLDivElement;
const currentTime = document.getElementById("current-time") as HTMLDivElement;

const cmdPlayground = document.getElementById(
  "cmd-playground"
) as HTMLDivElement;
const cmdWindow = document.getElementById("cmd-window") as HTMLDivElement;

export const runSetup = () => {
  todayDate.innerHTML = dayjs().locale("en").format("ddd D MMM");
  currentTime.innerHTML = dayjs().locale("en").format("HH:mm");

  const hWindow = cmdWindow.clientHeight;

  cmdPlayground.style.height = `${hWindow - 95}px`;
};
