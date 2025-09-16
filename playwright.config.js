import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['html'],
    ['list']
  ],
  
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 15000,
    viewport: { width: 1280, height: 720 },
  },

  timeout: 30000,

  expect: {
    timeout: 15000,
    
    // More lenient visual comparison settings for CI
    toHaveScreenshot: {
      threshold: 0.3,  // Allow 30% difference
      mode: 'pixel',
      animations: 'disabled',  // Disable animations
      
      // Additional options for consistency
      clip: { x: 0, y: 0, width: 800, height: 600 }, // Clip to consistent area
    }
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        
        // Force consistent rendering
        colorScheme: 'light',
        locale: 'en-US',
        timezoneId: 'UTC',
        
        // Disable hardware acceleration and other inconsistent features
        launchOptions: {
          args: [
            '--disable-web-security',
            '--disable-features=TranslateUI',
            '--disable-ipc-flooding-protection',
            '--disable-renderer-backgrounding',
            '--disable-backgrounding-occluded-windows',
            '--disable-field-trial-config',
            '--force-color-profile=srgb',
            '--disable-font-subpixel-positioning',
          ]
        }
      },
    },
  ],

  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});