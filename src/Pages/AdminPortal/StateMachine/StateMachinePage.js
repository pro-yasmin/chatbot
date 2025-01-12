const { PopUpPage } = require('../SharedPages/PopUpPage');
const { expect } = require('@playwright/test');
//let createdStateMachineArName, createdStateMachineEnName;

export class StateMachinePage {
  constructor(page) {
    this.page = page;
    this.createdStateMachineArName = null;
    this.createdStateMachineEnName = null;
    this.popUpMsg = new PopUpPage(this.page);
    //locators
    //popup
    this.successPopupTitle = '//span[@id="modal-modal-title"]';
    this.popUpDismissButton = '//button[contains(text(),"تم")]';
    //State Managment Information Section
    this.stateManagmentArabicName = '//input[@name="arabicName"]';
    this.stateManagmentEnglishName = '//input[@name="englishName"]';
    this.stateManagmentArabicDescription = '//input[@name="arabicDescription"]';
    this.stateManagmentEnglishDescription = '//input[@name="englishDescription"]';

    //State Cycle Design Section
    this.addStateButton = '//span[text()="إضافة حالة"]';
    this.stateArabicName = '[placeholder="اسم الحالة باللغة العربية"]';
    this.stateEnglishName = '[placeholder="اسم الحالة باللغة الانجليزية"]';
    this.setDefaultToggle = '[data-testid="switch"]';
    this.saveButton = '//button[text()="حفظ"]';

    this.addActionButton = '//span[text()="إضافة حدث"]';
    this.fromStateDdl = '//div[@id="mui-component-select-sourceStateId"]';
    this.fromStateFirstOption = '(//li[@class="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters muirtl-to2omt"])[1]';
    this.actionArabicName = '[placeholder="اسم الحدث باللغة العربية"]';
    this.actionEnglishName = '[placeholder="اسم الحدث باللغة الانجليزية"]';
    this.toStateDdl = '//div[@id="mui-component-select-targetStateId"]';
    this.toStateFirstOption = '(//li[@class="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters muirtl-to2omt"])[1]';
    this.addButton = '//button[text()="إضافة"]';

    this.createStateCycleButton = '//span[text()="إنشاء دورة الحالة"]';

    //View state machine 
    this.headlinePage = '//span[contains(text(),"بيانات دورة الحالة")]';

    //Edit State Machine
    this.firstState = '(//div[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-10 muirtl-1peyu5p"]//div)[2]';
    this.firstStateEditButton = '(//div[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-10 muirtl-1peyu5p"]//div)[4]';
    this.secondState = '(//div[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-10 muirtl-1peyu5p"]//div)[11]';
    this.secondStateEditButton = '(//div[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-10 muirtl-1peyu5p"]//div)[13]';
    this.action = '(//div[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-10 muirtl-1peyu5p"]//div)[7]';
    this.actionEditButton = '(//div[@class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-10 muirtl-1peyu5p"]//div)[9]';
    this.editStateCycleButton = '//span[text()="تعديل دورة الحالة"]';
  }

  /**
   * Fills the State Machine information on the State Machine Page
   * 
   * @param {Object} stateMachineData - The data object containing State Machine information.
   * @param {Function} stateMachineData.getStateMachineArabicName - Function to get the Arabic name of the StateMachine.
   * @param {Function} stateMachineData.getStateMachineEnglishName - Function to get the English name of the StateMachine.
   * @param {Function} stateMachineData.getStateMachineDescriptionArabicName - Function to get the Arabic description of the StateMachine.
   * @param {Function} stateMachineData.getStateMachineDescriptionEnglishName - Function to get the English description of the StateMachine.
   * @param {Function} stateMachineData.setStateMachineArabicName - Function to set the Arabic name of the StateMachine.
   * @param {Function} stateMachineData.setStateMachineEnglishName - Function to set the English name of the StateMachine.
   * 
   * @returns {Promise<void>} A promise that resolves when the StateMachine definition information has been filled.
   */
  async fillStateManagementInformation(stateMachineData) {
    console.log("Start filling State Management information");
    await this.page.waitForTimeout(1000);
    this.createdStateMachineArName = stateMachineData.getStateManagmentArabicName();
    this.createdStateMachineEnName = stateMachineData.getStateManagmentEnglishName();
    await this.page.fill(this.stateManagmentArabicName, this.createdStateMachineArName);
    await this.page.fill(this.stateManagmentEnglishName, this.createdStateMachineEnName);
    await this.page.fill(this.stateManagmentArabicDescription, stateMachineData.getStateManagmentArabicDescription());
    await this.page.fill(this.stateManagmentEnglishDescription, stateMachineData.getStateManagmentEnglishDescription());
    await this.page.waitForTimeout(1000);
    stateMachineData.setStateManagmentArabicName(this.createdStateMachineArName);
    stateMachineData.setStateManagmentEnglishName(this.createdStateMachineEnName);
    console.log("End filling State Management information");
  }

  /**
   * Fills the first and second states information form with the provided data
   *
   * @param {Object} stateMachineData - The data to fill in the form.
   * @param {Function} stateMachineData.getNameInArabic - Function to get the name in Arabic.
   * @param {Function} stateMachineData.getNameInEnglish - Function to get the name in English.
   * @param {Function} stateMachineData.getCode - Function to get the code.
   * @returns {Promise<boolean>} - Returns a promise that resolves to a boolean indicating the success of the operation.
   */
  async addFirstState(stateMachineData) {
    console.log("Start filling first State Cycle Design information");
    await this.page.click(this.addStateButton);
    await this.page.fill(this.stateArabicName, stateMachineData.getFirstStateArabicName());
    await this.page.fill(this.stateEnglishName, stateMachineData.getFirstStateEnglishName());
    await this.page.waitForTimeout(300);
    await this.page.locator(this.setDefaultToggle).nth(1).click();
    await this.page.click(this.saveButton);
    console.log("End filling first State Cycle Design information");
  }

  async addSecondState(stateMachineData) {
    console.log("Start filling second State Cycle Design information");
    await this.page.click(this.addStateButton);
    await this.page.fill(this.stateArabicName, stateMachineData.getSecondStateArabicName());
    await this.page.fill(this.stateEnglishName, stateMachineData.getSecondStateEnglishName());
    await this.page.click(this.saveButton);
    console.log("End filling second State Cycle Design information");
  }

  async addAction(stateMachineData) {
    console.log("Start filling Action information");
    await this.page.click(this.addActionButton);
    await this.page.click(this.fromStateDdl);
    await this.page.click(this.fromStateFirstOption);
    await this.page.fill(this.actionArabicName, stateMachineData.getActionArabicName());
    await this.page.fill(this.actionEnglishName, stateMachineData.getActionEnglishName());
    await this.page.click(this.toStateDdl);
    await this.page.click(this.toStateFirstOption);
    await this.page.click(this.addButton);
    console.log("End filling Action information");
  }

  async clickCreateStateCycleButton() {
    await this.page.click(this.createStateCycleButton);
    var result = await this.popUpMsg.popUpMessage(this.successPopupTitle, this.popUpDismissButton, global.testConfig.stateMachine.stateMachineCreatedSuccessMsg);
    return result;
  }

  async createNewStateMachine(stateMachineData) {
    console.log("Start filling State Cycle Design information");
    await this.fillStateManagementInformation(stateMachineData);
    await this.addFirstState(stateMachineData);
    await this.addSecondState(stateMachineData);
    await this.addAction(stateMachineData);
    console.log("End filling State Cycle Design information");
    var newStateMachineCreated = await this.clickCreateStateCycleButton();
    return newStateMachineCreated;
  }

  // validate view State Machine page is opened
  async validateStateMachinePageIsOpened() {
    await this.page.waitForSelector(this.headlinePage, { visible: true });
  }

  // Edit State Machine for edit test case
  /**
   * This method fills in the Arabic name, English name, and action for the StateMachine item
   * from the global test configuration. It then toggles the visibility and clicks
   * the button to add the item to the StateMachine.
   */
  async editStateMachine() {
    await this.page.click(this.firstState);
    await this.page.click(this.firstStateEditButton);
    await this.page.fill(this.stateArabicName, global.testConfig.stateMachine.editedFirstStateArabicName);
    await this.page.fill(this.stateEnglishName, global.testConfig.stateMachine.editedFirstStateEnglishName);
    await this.page.click(this.saveButton);
    await this.page.click(this.secondState);
    await this.page.click(this.secondStateEditButton);
    await this.page.fill(this.stateArabicName, global.testConfig.stateMachine.editedSecondStateArabicName);
    await this.page.fill(this.stateEnglishName, global.testConfig.stateMachine.editedSecondStateEnglishName);
    await this.page.click(this.saveButton);
    await this.page.click(this.action);
    await this.page.click(this.actionEditButton);
    await this.page.fill(this.actionArabicName, global.testConfig.stateMachine.editedActionArabicName);
    await this.page.fill(this.actionEnglishName, global.testConfig.stateMachine.editedActionEnglishName);
    await this.page.click(this.addButton);
    await this.page.click(this.editStateCycleButton);
    var stateMachineEdited = await this.popUpMsg.popUpMessage(this.successPopupTitle, this.popUpDismissButton, global.testConfig.stateMachine.stateMachineEditedSuccessMsg);
    return stateMachineEdited;
  }
}
module.exports = { StateMachinePage };
