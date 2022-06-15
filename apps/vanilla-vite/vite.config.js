// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@practice/utils': path.resolve(__dirname, '../../packages/utils/src'),
    },
  },
});
