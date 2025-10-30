import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // --- ADD THE OPTIMIZATION BLOCK BELOW ---
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        // This tells esbuild to process .js files as JSX
        ".js": "jsx",
      },
    },
  },
});
