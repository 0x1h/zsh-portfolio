import tailwindcss from "tailwindcss";

/** @type {import('vite').UserConfig} */
export default {
  server: { port: 3000 },
  plugins: [tailwindcss()],
};
