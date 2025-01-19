/**
 * Represents the homepage of the application and provides methods for navigating
 * to various sections and performing common actions like logout and user verification.
 * @class
 */
export class HomePage {
  //Page Construtor
  constructor(page) {
    this.page = page;

    // Selectors for common elements
    this.userMenu = '//button[@data-testid="user-menu"]';
    this.logoutButton = '//div[@data-testid="logout-btn"]';
    this.avatar = '//button[@data-testid="user-menu"]';

    // Selectors for navigation links and buttons
    this.programManagementButton =
      '//a[@data-testid="menu-programs-management"]';
    this.streamsManagementButton =
      '//a[@data-testid="submenu-streams-management"]';
    this.mainProgramManagementButton =
      '//a[@data-testid="submenu-main-program-management"]';
    this.subProgramsManagementButton =
      '//a[@data-testid="submenu-sub-program-management"]';
    this.createNewStreamButton = '//button[contains(text(),"تعريف مسار")]';
    this.tasksButton = '//a[@href="/my-tasks"]';
    this.generalSettingsButton = '//span[contains(text(),"الإعدادات العامة")]';
    this.lookupsManagmentButton =
      '//span[contains(text(),"إدارة القوائم المرجعية")]';
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

  /**
   * Logs the user out of the application by interacting with the user menu.
   * @returns {Promise<void>} - Completes the logout action.
   */
  async logout() {
    await this.page
      .locator(this.userMenu)
      .waitFor({ state: "visible", timeout: 2000 });
    await this.page.click(this.userMenu);
    await this.page
      .locator(this.logoutButton)
      .waitFor({ state: "visible", timeout: 2000 });
    await this.page.click(this.logoutButton);
  }

  /**
   * Navigates to the "Program Management" section of the application.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToProgramManagement() {
    await this.page.waitForSelector(this.programManagementButton, {
      state: "visible",
      timeout: 20000,
    });
    await this.page.click(this.programManagementButton);
  }

  /**
   * Navigates to the "Streams Management" section within Program Management.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToStreamsManagement() {
    await this.navigateToProgramManagement();
    await this.page.waitForSelector(this.streamsManagementButton, {
      state: "visible",
      timeout: 20000,
    });
    await this.page.click(this.streamsManagementButton);
  }

  /**
   * Navigates to the "Main Program Management" section within Program Management.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToMainProgramManagement() {
    await this.navigateToProgramManagement();
    await this.page.waitForSelector(this.mainProgramManagementButton, {
      state: "visible",
      timeout: 20000,
    });
    await this.page.click(this.mainProgramManagementButton);
  }

  /**
   * Navigates to the "Sub Programs Management" section within Program Management.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToSubProgramsManagement() {
    await this.navigateToProgramManagement();
    await this.page.waitForSelector(this.subProgramsManagementButton, {
      state: "visible",
      timeout: 20000,
    });
    await this.page.click(this.subProgramsManagementButton);
  }

  /**
   * Navigates to the "My Tasks" section of the application.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToTasks() {
    await this.page.waitForSelector(this.tasksButton, {
      state: "visible",
      timeout: 20000,
    });
    await this.page.click(this.tasksButton);
    await this.page.waitForNavigation({ waitUntil: "domcontentloaded" });
  }

  /**
   * Navigates to the "General Settings" section of the application.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToGeneralSettings() {
    await this.page.waitForSelector(this.generalSettingsButton, {
      state: "visible",
      timeout: 20000,
    });
    await this.page.click(this.generalSettingsButton);
  }

  /**
   * Navigates to the "Lookups Management" section within General Settings.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToLookupsManagment() {
    await this.navigateToGeneralSettings();
    await this.page.waitForSelector(this.lookupsManagmentButton, {
      state: "visible",
      timeout: 20000,
    });
    await this.page.click(this.lookupsManagmentButton);
    await this.page.waitForNavigation({ waitUntil: "domcontentloaded" });
  }
}

module.exports = { HomePage };
