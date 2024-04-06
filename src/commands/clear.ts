const cmdPlayground = document.getElementById(
  "cmd-playground"
) as HTMLTextAreaElement;

export const clear = () => {
  cmdPlayground.innerHTML = "";
};
