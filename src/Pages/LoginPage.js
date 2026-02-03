const { HomePage } = require("./HomePage");

/**
 * Manages login-related actions, including navigating to the admin portal,
 * performing user login, and ensuring the Arabic language is selected.
 * @class
 */
export class LoginPage {
  constructor(page) {
    this.page = page;

    // Selectors for login elements
    this.loginButton='//span[contains(@class,"text-btn-primary")]';
    this.userNameField = '[id="email"]';
    this.passwordField = '[id="password"]';
    this.submitButton='//button[@type="submit"]';
  }


  /**
   * Navigates to the admin portal .
   * @param {string} baseUrl - The URL of the admin portal.
   * @returns {Promise<void>} - Completes the navigation and language setup.
   */
  async gotoChatBot(baseUrl) {
    await this.page.goto(baseUrl);
    //await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await this.page.waitForTimeout(3000);
    //await this.ensureArabicLanguage();
  }

  

  /**
   * Performs user login with the provided credentials.
   * @param {string} userName - The username for login.
   * @param {string} password - The password for login.
   * @returns {Promise<boolean>} - Returns true if the user successfully logs in.
   */
  async login(userName, password) {
    await this.page.click(this.loginButton);
    await this.page.fill(this.userNameField, userName);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.submitButton);
    var homePage = new HomePage(this.page);
    var avatarVisible = await homePage.checkAvatarIsExist();

    return avatarVisible;
  }
  
}
module.exports = { LoginPage };
