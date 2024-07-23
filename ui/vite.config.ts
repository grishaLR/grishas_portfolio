import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

import { compilerOptions } from './tsconfig.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@mui/material', '@mui/x-date-pickers', 'date-fns'],
  },
  resolve: {
    alias: Object.fromEntries(
      Object.entries(compilerOptions.paths).map(([alias, [path]]) => [alias, resolve(path)])
    ),
  },
});
