/**
 * Represents the homepage of the application and provides methods for navigating
 * to various sections and performing common actions like logout and user verification.
 * @class
 */
export class HomeOperationPage {
  //Page Construtor
  constructor(page) {
    this.page = page;
    this.userMenu = '//button[@data-testid="user-menu"]';
    this.logoutButton = '//div[@data-testid="logout-btn"]';
    this.avatar = '//button[@data-testid="user-menu"]';
    this.simulationModelsButton = '//a[@data-testid="menu-simulation-models"]';
    this.tasksButton = '//a[@data-testid="menu-tasks"]';
  }

  /**
   * Checks if the user's avatar is visible, indicating a successful login.
   * @returns {Promise<boolean>} - Returns true if the avatar is visible.
   */
  async checkAvatarIsExist() {
    await this.page.waitForSelector(this.avatar, {
      state: "visible",
      timeout: 300000,
    });
    return await this.page.locator(this.avatar).isVisible();
  }


  async logout() {
    await this.page.locator(this.userMenu).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.click(this.userMenu);
    await this.page.locator(this.logoutButton).waitFor({ state: 'visible', timeout: 5000 });
    await this.page.click(this.logoutButton);


  }

  async navigateToSimulationModels() {
    await this.page.waitForSelector(this.simulationModelsButton, { state: "visible", timeout: 20000 });
    await this.page.click(this.simulationModelsButton);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }

  async navigateToTasksTab() {
    await this.page.waitForSelector(this.tasksButton, { state: "visible", timeout: 20000 });
    await this.page.click(this.tasksButton);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  }

}

module.exports = { HomeOperationPage };
