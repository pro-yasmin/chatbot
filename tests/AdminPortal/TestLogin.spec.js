const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../../src/Pages/AdminPortal/LoginPage");
const { HomePage } = require("../../src/Pages/AdminPortal/HomePage");

let loginPage;
let homePage , page,context;

test("Login with valid credential", async ({browser  }) => {
  context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);

  var baseUrl = global.testConfig.BASE_URL;
  var adminusername = global.testConfig.ADMIN_USER;
  var adminpassword = global.testConfig.ADMIN_PASS;

  await loginPage.gotoAdminPortal(baseUrl);
  var loginSuccess = await loginPage.login(adminusername, adminpassword);
  expect(loginSuccess).toBe(true);
  await homePage.logout();
  await context.close();

});
