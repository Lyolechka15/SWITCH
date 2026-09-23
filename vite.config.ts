import vinext from "vinext";
import { defineConfig } from "vite";
export default defineConfig(async () => {
  return {
    base: "/SWITCH/",
    plugins: [vinext()],
  };
});
