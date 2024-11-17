import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: [react()],
  build: {
    rollupOptions: {
      input: '/src/main.jsx',  // Specify the entry point file here
    },
  },
});
