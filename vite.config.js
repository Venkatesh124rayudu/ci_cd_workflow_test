/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    // CRITICAL: Exclude Playwright test files from Vitest
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
      '**/e2e/**',           // ← Exclude Playwright e2e tests
      '**/tests/visual/**',  // ← Exclude visual tests  
      '**/playwright/**',    // ← Exclude any playwright folder
      '**/*.e2e.spec.{js,ts}', // ← Exclude e2e spec files
      '**/*.visual.spec.{js,ts}' // ← Exclude visual spec files
    ],
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