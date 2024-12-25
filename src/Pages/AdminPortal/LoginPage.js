const { HomePage } = require('./HomePage');

export class LoginPage {
    constructor(page) {
        this.page = page;
          this.userNameField = '[id="username"]';
          this.passwordField = '[id="password"]',
          this.remeberCheckbox = '//img[@class="check--icon"]';
          this.loginButton = '//input[@id="kc-login"]';
          this.changeLangageMenu = '//button[@id="locale--button" and contains(@class, "locale--btn")]';
          this.nationalField ='//span[contains(text(),"رقم الهوية الوطنية")]';

        }   

      async  gotoAdminPortal (baseUrl){
             await this.page.goto(baseUrl, { waitUntil: 'networkidle' });
             await this.ensureArabicLanguage();
            }

      async login(userName, password) {
        await this.page.fill(this.userNameField,userName);
        await this.page.fill(this.passwordField,password);
        await this.page.click(this.loginButton);      
        var homePage = new HomePage(this.page);
        var avatarVisible = await homePage.checkAvatarIsExist();
        return avatarVisible;
       
    }

      async ensureArabicLanguage() {
        try {
          await this.page.locator(this.changeLangageMenu).click();
          var isArabicSelected = await this.page.locator(this.nationalField).isVisible();
          if (isArabicSelected) {
             // console.log("Language is already set to Arabic.");
              return;
          }
          await this.page.locator('li.locale--list__item', { hasText: 'عربي' }).click();
          await this.page.waitForLoadState('networkidle');
          const verifyLangElement = this.page.locator(this.nationalField);
          if (await verifyLangElement.isVisible()) {
             // console.log("Language successfully changed to Arabic.");
          } else {
              throw new Error("Failed to verify the language change to Arabic.");
          }
      } catch (error) {
          console.error("Failed to select Arabic language or verify the change:", error);
          throw new Error("Language selection or verification failed.");
      }
    }


      
}
module.exports = { LoginPage };