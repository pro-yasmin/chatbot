const { LiferayStreamsPage } = require("./Streams/LiferayStreamsPage");


export class LiferayLoginPage {

 constructor(page) {
     this.page = page;
 
     // Selectors for login elements
     this.userNameField = '[name="_com_liferay_login_web_portlet_LoginPortlet_login"]';
     this.passwordField = '[name="_com_liferay_login_web_portlet_LoginPortlet_password"]',
     this.signInButton= '//button[@type="submit" and contains(., "Sign In")]'
 
   }

 
    /**
    * Performs user login with the provided credentials.
    * @param {string} userName - The username for login.
    * @param {string} password - The password for login.
    * @returns {Promise<boolean>} - Returns true if the user successfully logs in.
    */
    async liferayLogin(userName, password) {
     await this.page.fill(this.userNameField, userName);
     await this.page.fill(this.passwordField, password);
     await this.page.click(this.signInButton);
 
    //  var liferayHomePage = new LiferayHomePage(this.page);
    //  var loginSuccess = await liferayHomePage.verifyLogin();
    //  return loginSuccess;  
   }

  /**
   * Navigates to the Liferay portal .
   * @param {string} baseUrl - The URL of the Liferay portal.
   * @returns {Promise<void>} - Completes the navigation and language setup.
   */
  async gotoLiferayStreams(baseUrl , userName, password) {
    await this.page.goto(baseUrl);
    await this.page.waitForTimeout(30000);
                    
    await this.liferayLogin(userName, password);
    await this.page.waitForTimeout(30000);

    var liferayStreamsPage = new LiferayStreamsPage(this.page);
    var navigationStreams = await liferayStreamsPage.verifyStreams();
    return navigationStreams;  
  } 


  /**
   * Navigates to the Liferay Main Programs page.
   * @param {string} baseUrl - The URL of the Liferay portal for Main Programs.
   * @returns {Promise<boolean>} - True if navigation to main programs page was successful.
   */
  async gotoLiferayMainPrograms(baseUrl ,userName, password) {
    await this.page.goto(baseUrl);
    await this.page.waitForTimeout(30000);

    await this.liferayLogin(userName, password);

    // var liferayMainProgramsPage = new LiferayMainProgramsPage(this.page);
    // var navigationSuccess = await liferayStreamsPage.verifyMainPrograms();
    // return navigationSuccess;
  }
 
}
module.exports = { LiferayLoginPage };
