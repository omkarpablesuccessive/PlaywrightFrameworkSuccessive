// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const {config} =require('./config/envConfig')
const{apibaseUrl}=config[config.env].api

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();
// module.exports = {
//   use: {
//     browserName: 'chromium',
//     // Add any other options you want to set for Playwright here
//   },
// };
/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000 
  }, 
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [  //['html'], 
    ['allure-playwright'],
    ['line']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
     baseURL: apibaseUrl,
     //'https://graphql.anilist.co',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */  //Can add channel='chrome', headless='false'
  projects: [
    {
      name: 'chromium',
      
      /*
      (chrome browser conf)
      channel='chrome', 
npx play
      (Browser mode)
      headless='false',

      (Browser Height & Width)
      viewport:{width:1500, height: 730},
      
      (Artifacts)
      screenshot: 'only-on-failure',
      video: 'retain-on-failure'
     */

      use: { ...devices['Desktop Chrome'],
      screenshot: 'only-on-failure',
      // video: 'retain-on-failure' },
    },
  },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],
      screenshot: 'only-on-failure' 
    },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'],
      screenshot: 'only-on-failure' },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { channel: 'chrome' },
    // },
  // @ts-ignore
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
});

