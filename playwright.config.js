// @ts-nocheck
const { defineConfig, devices } = require("@playwright/test");
require("./global.js"); // Load the global configuration
/**
 * @see https://playwright.dev/docs/test-configuration
 */


const ENV = "uat";

module.exports = defineConfig({
  timeout: 600000,

  globalSetup: require.resolve("./global-setup"),
  //globalTeardown: './globalTeardown.js',

  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  //workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html", { outputFolder: "playwright-report" }],
    ["allure-playwright", { outputFolder: "allure-results" }], // Allure reporter
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    browserName: "chromium",
    /*launchOptions: {
      args: ["--start-maximized"],
    },
    viewport: null,*/
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    video: "on",
    screenshot: "only-on-failure", // Capture screenshot always
    actionTimeout: 200000, // Timeout for Playwright actions (15 seconds)
    navigationTimeout: 600000, // Timeout for page navigation (60 seconds)
  },
});
module.exports.ENV = ENV;