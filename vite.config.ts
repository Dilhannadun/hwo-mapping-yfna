import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"), // Alias setup
    },
  },
  worker: {
    format: "es", // Use ES modules for workers
  },
  build: {
    target: "esnext",
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "web-workers/snrWorker": resolve(
          __dirname,
          "./src/web-workers/snrWorker.ts"
        ),
        "web-workers/planetFilterWorker": resolve(
          __dirname,
          "./src/web-workers/planetFilterWorker.ts"
        ),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
