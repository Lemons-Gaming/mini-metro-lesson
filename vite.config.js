import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/mini-metro-lesson/',
  plugins: [react()],
});
