import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
    },
  },
  // این بخش برای استقرار در GitHub Pages حیاتی است
  base: '/landchi-marketplace-implementation/', 
  build: {
    outDir: 'dist',
  }
});
