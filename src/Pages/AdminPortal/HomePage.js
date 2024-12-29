export class HomePage {
  //Page Construtor
  constructor(page) {
    this.page = page;
    this.userMenu ='//button[@data-testid="user-menu"]';
    this.logoutButton = '//div[@data-testid="logout-btn"]';
    this.avatar ='//button[@data-testid="user-menu"]';
    this.programManagementButton = '//a[@data-testid="menu-programs-management"]';
    this.streamsManagementButton = '//a[@data-testid="submenu-streams-management"]';
    this.mainProgramManagementButton = '//a[@data-testid="submenu-main-program-management"]';
    // this.subProgramsManagementButton = '//a[@data-testid="submenu-main-program-management""]';
    this.createNewStreamButton = '//button[contains(text(),"تعريف مسار")]';
    this.tasksButton = '//a[@href="/my-tasks"]';
  }

  async checkAvatarIsExist() {
    await this.page.waitForSelector(this.avatar, {
      state: "visible",
      timeout: 300000,
    });
    return await this.page.locator(this.avatar).isVisible();
  }

  
  async logout() {
      await this.page.locator(this.userMenu).waitFor({ state: 'visible', timeout: 2000 });
      await this.page.click(this.userMenu);     
      await this.page.locator(this.logoutButton).waitFor({ state: 'visible', timeout: 2000 });
      await this.page.click(this.logoutButton); 
     
  }

  async navigateToProgramManagement() {
    await this.page.waitForSelector(this.programManagementButton, {state: "visible",timeout: 20000 });
    await this.page.click(this.programManagementButton);
  }

  async navigateToStreamsManagement() {
    await this.navigateToProgramManagement();
    await this.page.waitForSelector(this.streamsManagementButton, { state: "visible", timeout: 20000 });
    await this.page.click(this.streamsManagementButton);
   
    }

    async navigateToMainProgramManagement() {
      await this.navigateToProgramManagement();
      await this.page.waitForSelector(this.mainProgramManagementButton, { state: "visible", timeout: 20000 });
      await this.page.click(this.mainProgramManagementButton);
     
      }

      async navigateToSubProgramsManagement() {
        await this.navigateToProgramManagement();
        await this.page.waitForSelector(this.subProgramsManagementButton, { state: "visible", timeout: 20000 });
        await this.page.click(this.subProgramsManagementButton);
       
        }
  

    async  navigateToTasks() {
      await this.page.waitForSelector(this.tasksButton, { state: "visible",timeout: 20000});
      await this.page.click(this.tasksButton);
    }

}

module.exports = { HomePage };
