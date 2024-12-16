export class HomePage {
//Page Construtor
  constructor(page) {

    this.page = page;
    this.userMenu = '//div[contains(@class, "MuiAvatar-root")]//ancestor::button';
    this.logoutButton = 'span:has-text("تسجيل الخروج")';
    this.avatar = '//div[contains(@class, "MuiAvatar-root")]';
    this.programManagementButton = '//a[@href="/programs-management"]';
    this.streamsManagementButton = '//a[@href="/programs-management/streams-management"]';
    this.createNewStreamButton = '//button[contains(text(),"تعريف مسار")]',
    this.streamTitle = '//span[contains(@class, "MuiTypography-root") and contains(@class, "MuiTypography-sub-headline-sm") and text()="إدارة المسارات"]';


  }


  async checkAvatarIsExist() {
      await this.page.waitForSelector(this.avatar, { state: 'visible', timeout: 5000 });
      // Check if the avatar is visible
      return await this.page.locator(this.avatar).isVisible();    
     
   }

  async logout() {
      await this.page.click(this.userMenu);     
      await this.page.locator(this.logoutButton).waitFor({ state: 'visible', timeout: 2000 });
      await this.page.click(this.logoutButton); 
     
  }

  async navigateToProgramManagement() {

    await this.page.waitForSelector(this.programManagementButton, { state: 'visible', timeout: 60000 });
    await this.page.click(this.programManagementButton);

  }

  async navigateToStreamsManagement() {
    await this.navigateToProgramManagement();
    await this.page.waitForSelector(this.streamsManagementButton, { state: 'visible', timeout: 60000 });
    await this.page.click(this.streamsManagementButton);
   
    }

  /*async navigateToCreateStreamPage() {
    try {
      
      await this.page.click(this.selectors.createNewStreamButton , { state: 'visible' , timeout: 60000 });

      await this.page.waitForSelector(this.selectors.streamTitle, { state: 'visible' , timeout: 60000 });

      return true; 
  } catch (error) {
      console.error('Error in open Create Stream Page:', error);
      return false;
  }
}*/

}

module.exports = { HomePage };

