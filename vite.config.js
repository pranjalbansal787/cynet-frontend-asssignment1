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
      external: ['react-redux', 'react-router-dom', 'react-gauge-chart', 'react-chartjs-2'], // Add other libraries you do not want to bundle here
    },
  },
});
