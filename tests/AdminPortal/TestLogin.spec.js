const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../src/Pages/AdminPortal/LoginPage");
const { HomePage } = require("../../src/Pages/AdminPortal/HomePage");
const {
  StreamManagementPage,
} = require("../../src/Pages/AdminPortal/Programs/StreamManagementPage");

let loginPage;
let homePage;
let streamManagementPage;

test("Login with valid credential", async ({ page }) => {
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  streamManagementPage = new StreamManagementPage(page);

  var baseUrl = global.testConfig.BASE_URL;
  var adminusername = global.testConfig.ADMIN_USER;
  var adminpassword = global.testConfig.ADMIN_PASS;

  await loginPage.gotoAdminPortal(baseUrl);
  var loginSuccess = await loginPage.login(adminusername, adminpassword);
  expect(loginSuccess).toBe(true);
  console.log('Navigate to Streams page');
  /*await homePage.navigateToStreamsManagement();
  await streamManagementPage.createProgram('PRG_StrSt_407');*/
  await homePage.logout();
});
