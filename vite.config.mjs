import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        dashboard: fileURLToPath(new URL('./index.html', import.meta.url)),
        workouts: fileURLToPath(new URL('./workouts.html', import.meta.url)),
      },
    },
  },
});
