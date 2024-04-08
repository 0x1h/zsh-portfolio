const windowHeader = document.getElementById("window-header") as HTMLDivElement;
const cmdWindow = document.getElementById("cmd-window") as HTMLDivElement;

let isClicked = false;

export const mouseDown = ({
  movementX,
  movementY,
}: {
  movementX: number;
  movementY: number;
}) => {
  if (isClicked) {
    let getContainerStyle = window.getComputedStyle(cmdWindow!);
    let leftValue = parseInt(getContainerStyle.left);
    let topValue = parseInt(getContainerStyle.top);
    cmdWindow!.style.left = `${leftValue + movementX}px`;
    cmdWindow!.style.top = `${topValue + movementY}px`;
  }
};

windowHeader.addEventListener("mousedown", () => (isClicked = true));

window.addEventListener("mousemove", mouseDown);

window.addEventListener("mouseup", () => {
  cmdWindow.removeEventListener("mousemove", mouseDown);
  isClicked = false;
});
