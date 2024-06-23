import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(), // Use @vitejs/plugin-react for React support
  ],
  build: {
    // Ensure that Rollup options are configured correctly
    rollupOptions: {
      // Externalize dependencies that should not be bundled
      external: ['redux', 'react-redux'], // Add other libraries you do not want to bundle here
    },
  },
});
