export const DEFAULT_DIR = "desktop";

export interface Directory {
  dir: string;
  subDirs?: Directory[];
}

export const directories: Directory[] = [
  {
    dir: "",
    subDirs: [
      {
        dir: "desktop",
        subDirs: [
          {
            dir: "projects",
            subDirs: [{ dir: "data.json" }],
          },
          {
            dir: "socials",
            subDirs: [{ dir: "my-socials.json" }],
          },
          {
            dir: "about-me.json",
          },
          {
            dir: "my-music-taste.json",
          },
        ],
      },
    ],
  },
];
