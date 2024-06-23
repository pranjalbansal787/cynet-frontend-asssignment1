import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(), // Use @vitejs/plugin-react for React support
  ],
  build: {
    // Ensure that Rollup options are configured correctly
    rollupOptions: {
      // Make sure not to externalize 'react' and 'react-dom' as they are needed for your app
      external: ['lodash', 'chart.js', 'framer-motion', 'react-chartjs-2', 'react-gauge-chart', 'react-redux', 'redux'], // Add other libraries you do not want to bundle here
    },
  },
});
