import { Directory } from "@/constants/dirs";

export function findDirectory(
  dirName: string,
  directoryArray: Directory[]
): Directory {
  for (const directory of directoryArray) {
    if (directory.dir === dirName) {
      return directory; // Return top-level match
    }
    if (directory.subDirs) {
      const foundDir = findDirectory(dirName, directory.subDirs as Directory[]);
      if (foundDir) {
        return foundDir;
      }
    }
    // Check subdirectories even for top-level match
    if (directory.subDirs) {
      const foundSubDir = findDirectory(
        dirName,
        directory.subDirs as Directory[]
      );
      if (foundSubDir) {
        return foundSubDir;
      }
    }
  }
  return { dir: "*" as "*", subDirs: [] }; // Directory not found
}
