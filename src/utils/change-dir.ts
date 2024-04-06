const dirName = document.getElementById("dir-name") as HTMLDivElement;

export const changeDirectory = (
  dir: string | "..",
  currDir: string,
  changeDir: (dir: string) => string
) => {
  if (dir === "..") {
    const splitDir = currDir.split("/");
    splitDir.pop();

    dirName.innerHTML = `~/${splitDir.join("/")}`;
    changeDir(splitDir.join("/"));
  } else {
    const newDir = currDir === "" ? dir : `${currDir + "/" + dir}`;
    dirName.innerHTML = `~/${newDir}`;
    changeDir(newDir);
  }
};
