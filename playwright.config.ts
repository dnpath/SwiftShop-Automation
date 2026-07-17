import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true, // Speeds up executions across distributed environments
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0, // Automatically retry flaky executions on CI
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],
  
  use: {
    baseURL: 'https://dnpath.github.io/SwiftShop/',
    trace: 'on-first-retry', // Collect visual debug traces on failures
    screenshot: 'only-on-failure', // Snap evidence images for bug reporting
    video: 'retain-on-failure' // Save movie files for audit references
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }
  ],
});