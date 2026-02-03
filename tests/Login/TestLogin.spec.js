import { test, expect } from '../fixtures.js';
const { LoginPage } = require("../../src/Pages/LoginPage");
const { HomePage } = require("../../src/Pages/HomePage.js");

let loginPage;
let homePage;

/**
 * Test case to verify login functionality with valid credentials.
 */
test("UI behavior: widget loads, send message, input clears", async ({ page }) => {
  // Instantiate the LoginPage and HomePage objects
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);

  // Retrieve credentials and base URL from global configuration
  var baseUrl = global.testConfig.BASE_URL;
  var username = global.testConfig.USER_EMAIL;
  var password = global.testConfig.PASS;

  // Navigate to the admin portal and perform login
  await loginPage.gotoChatBot(baseUrl);
  var loginSuccess = await loginPage.login(username, password);

  // Verify that login was successful
  expect(loginSuccess).toBe(true);

 const c = global.testConfig.english.find(x => x.id === "EN_UI_001");
    await homePage.sendMessage(c.prompt);

    await homePage.inputShouldBeCleared();
    const resp = await homePage.lastBotMessageText();
    expect(resp.length).toBeGreaterThan(0);
});
