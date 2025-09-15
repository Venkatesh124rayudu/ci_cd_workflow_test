/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    // Add these options to fix CI issues
    pool: 'forks', // Use forks instead of threads
    poolOptions: {
      forks: {
        singleFork: true
      }
    },
    // Handle environment variables
    env: {
      VITE_OPEN_WEATHER_API_KEY: 'test-key'
    }
  },
});