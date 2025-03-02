import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';

export default defineConfig(({mode}) => ({
  plugins: [
    // React plugin for handling React files
    react(),

    // Chrome extension plugin with manifest.json
    crx({ manifest }),
  ],

  // Server options (optional, for development)
  server: {
    port: 3000, // Development server port
    strictPort: true, // Prevent fallback to another port
  },

  // Build options
  ...(mode === 'production' && {
    build: {
      rollupOptions: {
        input: {
          popup: './index.html',
          //background: './src/background.js', // Uncomment if needed
          content: './src/Content.jsx',
        },
        output: {
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
      outDir: 'dist', // Ensure the output is stored in the "dist" directory
      sourcemap: true, // Enable sourcemaps for debugging
    },
  }),
}));