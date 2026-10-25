import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        'index': fileURLToPath(new URL('./index.html', import.meta.url)),
        'gym-sessions': fileURLToPath(new URL('./gym-sessions.html', import.meta.url)),
        'workouts': fileURLToPath(new URL('./workouts.html', import.meta.url)),
        'exercises': fileURLToPath(new URL('./exercises.html', import.meta.url)),
        'water': fileURLToPath(new URL('./water.html', import.meta.url)),
        'weight': fileURLToPath(new URL('./weight.html', import.meta.url)),
        'statistics': fileURLToPath(new URL('./statistics.html', import.meta.url)),
        'history': fileURLToPath(new URL('./history.html', import.meta.url)),
        'goals': fileURLToPath(new URL('./goals.html', import.meta.url)),
        'profile': fileURLToPath(new URL('./profile.html', import.meta.url)),
        'settings': fileURLToPath(new URL('./settings.html', import.meta.url)),
      },
    },
  },
});
