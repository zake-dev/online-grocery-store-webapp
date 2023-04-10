/* eslint-disable */
import react from '@vitejs/plugin-react-swc';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
