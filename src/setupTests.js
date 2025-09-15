import '@testing-library/jest-dom';

// Mock environment variables
process.env.VITE_OPEN_WEATHER_API_KEY = 'test-key';

// Mock fetch globally if not already done in tests
global.fetch = global.fetch || (() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

// Handle unhandled promise rejections in tests
process.on('unhandledRejection', (reason, promise) => {
  console.warn('Unhandled promise rejection:', reason);
});