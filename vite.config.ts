import react from "@vitejs/plugin-react";
import { defineConfig as defineTestConfig } from "vitest/config";

export default defineTestConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.ts",
  },
});
