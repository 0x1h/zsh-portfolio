const cmdPlayground = document.getElementById(
  "cmd-playground"
) as HTMLTextAreaElement;

export const scrollDown = () => {
  cmdPlayground.scrollTop =
    cmdPlayground.scrollHeight - cmdPlayground.clientHeight;
};
