const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../src/Pages/LoginPage");
const { HomePage } = require("../../src/Pages/AdminPortal/HomePage");

let loginPage;
let homePage, page, context;

/**
 * Test case to verify login functionality with valid credentials.
 */
test("Login to Admin Portal with valid credential", async ({ browser }) => {
  // Create a new browser context and page instance
  context = await browser.newContext();
  page = await context.newPage();

  // Instantiate the LoginPage and HomePage objects
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);

  // Retrieve credentials and base URL from global configuration
  var baseUrl = global.testConfig.BASE_URL;
  var adminusername = global.testConfig.BUSSINESS_ADMIN_USER;
  var adminpassword = global.testConfig.BUSSINESS_ADMIN_PASS;

  // Navigate to the admin portal and perform login
  await loginPage.gotoAdminPortal(baseUrl);
  var loginSuccess = await loginPage.login(adminusername, adminpassword);

  // Verify that login was successful
  expect(loginSuccess).toBe(true);

  // Perform logout and close the browser context
  await homePage.logout();
  await context.close();
});

/**
 * Test case to verify login functionality with valid credentials.
 */
test("Login to Operational Portal with valid credential", async ({ browser }) => {
  // Create a new browser context and page instance
  context = await browser.newContext();
  page = await context.newPage();

  // Instantiate the LoginPage and HomePage objects
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);

  // Retrieve credentials and base URL from global configuration
  var baseUrl = global.testConfig.OPERATION_BASE_URL;
  var adminusername = global.testConfig.BUSSINESS_ADMIN_USER;
  var adminpassword = global.testConfig.BUSSINESS_ADMIN_PASS;

  // Navigate to the admin portal and perform login
  await loginPage.gotoOperationPortal(baseUrl);
  var loginSuccess = await loginPage.login(adminusername, adminpassword);

  // Verify that login was successful
  expect(loginSuccess).toBe(true);

  // Perform logout and close the browser context
  await homePage.logout();
  await context.close();
});

/**
 * Test case to verify login functionality with invalid credentials.
 */
test("Login to Operational Portal with invalid credential", async ({ browser }) => {
  // Create a new browser context and page instance
  context = await browser.newContext();
  page = await context.newPage();

  // Instantiate the LoginPage and HomePage objects
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);

  // Retrieve credentials and base URL from global configuration
  var baseUrl = global.testConfig.OPERATION_BASE_URL;
  var adminusername = global.testConfig.INVALID_USER;
  var adminpassword = global.testConfig.INVALID_PASS;

  // Navigate to the admin portal and perform login
  await loginPage.gotoOperationPortal(baseUrl);
  var loginFailed = await loginPage.loginWithInvalidCredentials(adminusername, adminpassword);

  // Verify that login was failed
  expect(loginFailed).toBe(true);

  // Perform logout and close the browser context
  await context.close();
});
