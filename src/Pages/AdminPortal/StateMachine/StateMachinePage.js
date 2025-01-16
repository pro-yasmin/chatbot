const { PopUpPage } = require('../SharedPages/PopUpPage');
const { expect } = require('@playwright/test');


export class StateMachinePage {
  constructor(page) {
    this.page = page;
    this.createdStateMachineArName = null;
    this.createdStateMachineEnName = null;
    this.createdStateMachineArDescription = null;
    this.createdStateMachineEnDescription = null;
    this.createdFirstStateArName = null;
    this.createdSecondStateArName = null;
    this.createdActionArName = null;
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
    this.stateEnglishName = '[placeholder="اسم الحالة باللغة الإنجليزية"]';
    this.setDefaultToggle = '[data-testid="switch"]';
    this.saveButton = '//button[text()="حفظ"]';

    this.addActionButton = '//span[text()="إضافة حدث"]';
    this.fromStateDdl = '//div[@id="mui-component-select-sourceStateId"]';
    this.fromStateFirstOption = '(//li[@class="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters muirtl-to2omt"])[1]';
    this.actionArabicName = '[placeholder="اسم الحدث باللغة العربية"]';
    this.actionEnglishName = '[placeholder="اسم الحدث باللغة الإنجليزية"]';
    this.toStateDdl = '//div[@id="mui-component-select-targetStateId"]';
    this.toStateFirstOption = '(//li[@class="MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root MuiMenuItem-gutters muirtl-to2omt"])[1]';
    this.addButton = '//button[text()="إضافة"]';

    this.createStateCycleButton = '//span[text()="إنشاء دورة الحالة"]';

    //View state machine 
    this.headlinePage = '//span[contains(text(),"بيانات دورة الحالة")]';
    this.stateManagmentArabicNameField = '(//span[contains(@class, "MuiTypography-root") and text()= "اسم دورة الحالة باللغة العربية"]//following::span)[1]';
    this.stateManagmentEnglishNameField = '(//span[contains(@class, "MuiTypography-root") and text()= "اسم دورة الحالة باللغة الانجليزية"]//following::span)[1]';
    this.stateManagmentArabicDescriptionField = '(//span[contains(@class, "MuiTypography-root") and text()= "وصف دورة الحالة باللغة العربية"]//following::span)[1]';
    this.stateManagmentEnglishDescriptionField = '(//span[contains(@class, "MuiTypography-root") and text()= "وصف دورة الحالة باللغة الإنجليزية"]//following::span)[1]';
    // this.firstStateField = '//div[contains(@class, "MuiBox-root") and contains(text(), "الحالة الأولى")]';
    // this.secondStateField = '//div[contains(@class, "MuiBox-root") and contains(text(), "الحالة الثانية")]';
    // this.actionField = '//div[contains(@class, "MuiBox-root") and contains(text(), "إجراء")]';

    //Edit State Machine
    
    //this.firstState = '//div[contains(@class, "MuiBox-root") and contains(text(), "الحالة الأولى")]';
    // this.firstStateEditButton = '(//div[contains(@class, "MuiBox-root") and contains(text(), "الحالة الأولى")]//following::div//div)[1]';
    // this.secondState = '//div[contains(@class, "MuiBox-root") and contains(text(), "الحالة الثانية")]';
    // this.secondStateEditButton = '(//div[contains(@class, "MuiBox-root") and contains(text(), "الحالة الثانية")]//following::div//div)[1]';
    // this.action = '//div[contains(@class, "MuiBox-root") and contains(text(), "إجراء")]';
    // this.actionEditButton = '(//div[contains(@class, "MuiBox-root") and contains(text(), "إجراء")]//following::div//div)[1]';
    this.editStateCycleButton = '//span[text()="تعديل دورة الحالة"]';
  }

  /**
   * Fills the State Machine information on the State Machine Page
   * @param {Object} stateMachineData - The data object containing State Machine information.
   * @returns {Promise<void>} A promise that resolves when the StateMachine definition information has been filled.
   */
  async fillStateManagementInformation(stateMachineData) {
    console.log("Start filling State Management information");
    await this.page.waitForTimeout(1000);
    this.createdStateMachineArName = stateMachineData.getStateManagmentArabicName();
    this.createdStateMachineEnName = stateMachineData.getStateManagmentEnglishName();
    this.createdStateMachineArDescription = stateMachineData.getStateManagmentArabicDescription();
    this.createdStateMachineEnDescription = stateMachineData.getStateManagmentEnglishDescription();
    await this.page.fill(this.stateManagmentArabicName, this.createdStateMachineArName);
    await this.page.fill(this.stateManagmentEnglishName, this.createdStateMachineEnName);
    await this.page.fill(this.stateManagmentArabicDescription, this.createdStateMachineArDescription);
    await this.page.fill(this.stateManagmentEnglishDescription, this.createdStateMachineEnDescription);
    await this.page.waitForTimeout(1000);
    stateMachineData.setStateManagmentArabicName(this.createdStateMachineArName);
    stateMachineData.setStateManagmentEnglishName(this.createdStateMachineEnName);
    stateMachineData.setStateManagmentArabicDescription(this.createdStateMachineArDescription);
    stateMachineData.setStateManagmentEnglishDescription(this.createdStateMachineEnDescription);
    console.log("End filling State Management information");
  }

  /**
   * Fills the first and second states information form with the provided data
   * @param {Object} stateMachineData - The data to fill in the form.
   * @returns {Promise<boolean>} - Returns a promise that resolves to a boolean indicating the success of the operation.
   */
  async addFirstState(stateMachineData) {
    console.log("Start filling first State Cycle Design information");
    await this.page.click(this.addStateButton);
    this.createdFirstStateArName = stateMachineData.getFirstStateArabicName();
    await this.page.fill(this.stateArabicName, this.createdFirstStateArName);
    await this.page.fill(this.stateEnglishName, stateMachineData.getFirstStateEnglishName());
    await this.page.waitForTimeout(300);
    await this.page.locator(this.setDefaultToggle).nth(1).click();
    await this.page.click(this.saveButton);
    stateMachineData.setFirstStateArabicName(this.createdFirstStateArName);
    console.log("End filling first State Cycle Design information");
  }

  /**
   * Adds the second state to the state machine by filling in the necessary information.
   * @param {Object} stateMachineData - The data required to create the second state.
   * @returns {Promise<void>} - A promise that resolves when the second state has been added.
   */
  async addSecondState(stateMachineData) {
    console.log("Start filling second State Cycle Design information");
    await this.page.click(this.addStateButton);
    this.createdSecondStateArName = stateMachineData.getSecondStateArabicName();
    await this.page.fill(this.stateArabicName, this.createdSecondStateArName);
    await this.page.fill(this.stateEnglishName, stateMachineData.getSecondStateEnglishName());
    await this.page.click(this.saveButton);
    stateMachineData.setSecondStateArabicName(this.createdSecondStateArName);
    console.log("End filling second State Cycle Design information");
  }

  /**
   * Adds a new action to the state machine by filling in the necessary information.
   * @param {Object} stateMachineData - The data required to create the action.
   * @returns {Promise<void>} - A promise that resolves when the action has been added.
   */
  async addAction(stateMachineData) {
    console.log("Start filling Action information");
    await this.page.click(this.addActionButton);
    await this.page.click(this.fromStateDdl);
    await this.page.click(this.fromStateFirstOption);
    this.createdActionArName = stateMachineData.getActionArabicName();
    await this.page.fill(this.actionArabicName, this.createdActionArName);
    await this.page.fill(this.actionEnglishName, stateMachineData.getActionEnglishName());
    await this.page.click(this.toStateDdl);
    await this.page.click(this.toStateFirstOption);
    await this.page.click(this.addButton);
    stateMachineData.setActionArabicName(this.createdActionArName);
    console.log("End filling Action information");
  }

  /**
   * Clicks the "Create State Cycle" button and waits for the success popup message.
   * @returns {Promise<boolean>} - Returns true if the state cycle creation was successful, otherwise false.
   */
  async clickCreateStateCycleButton() {
    await this.page.click(this.createStateCycleButton);
    var result = await this.popUpMsg.popUpMessage(this.popUpDismissButton, global.testConfig.stateMachine.stateMachineCreatedSuccessMsg);
    return result;
  }

  /**
   * Creates a new state machine by filling in the necessary information.
   * @param {Object} stateMachineData - The data required to create the state machine.
   * @returns {Promise<boolean>} - Returns true if the state machine creation was successful, otherwise false.
   */
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

  /**
   * Validates that the State Machine page is opened and verifies the content of various fields.
   * @returns {Promise<boolean>} - Returns true if the validation is successful.
   */
  async validateStateMachinePageIsOpened() {
    await this.page.waitForSelector(this.headlinePage, { visible: true });
    var stateManagmentArabicNameFieldText = await this.page.innerText(this.stateManagmentArabicNameField);
    var stateManagmentEnglishNameFieldText = await this.page.innerText(this.stateManagmentEnglishNameField);
    var stateManagmentArabicDescriptionFieldText = await this.page.innerText(this.stateManagmentArabicDescriptionField);
    var stateManagmentEnglishDescriptionFieldText = await this.page.innerText(this.stateManagmentEnglishDescriptionField);
    this.firstStateField = '//div[contains(@class, "MuiBox-root") and contains(text(), "'+this.createdFirstStateArName+'")]';
    this.secondStateField = '//div[contains(@class, "MuiBox-root") and contains(text(), "'+this.createdSecondStateArName+'")]';
    this.actionField = '//div[contains(@class, "MuiBox-root") and contains(text(), "'+this.createdActionArName+'")]';
    var firstStateFieldText = await this.page.innerText(this.firstStateField);
    console.log("first State= " + firstStateFieldText);
    var secondStateFieldText = await this.page.innerText(this.secondStateField);
    console.log("second State= " + secondStateFieldText);
    var actionFieldText = await this.page.innerText(this.actionField);
    console.log("action= " + actionFieldText);
    expect(stateManagmentArabicNameFieldText).toBe(this.createdStateMachineArName);
    expect(stateManagmentEnglishNameFieldText).toBe(this.createdStateMachineEnName);
    expect(stateManagmentArabicDescriptionFieldText).toBe(this.createdStateMachineArDescription);
    expect(stateManagmentEnglishDescriptionFieldText).toBe(this.createdStateMachineEnDescription);
    expect(firstStateFieldText).toContain(this.createdFirstStateArName);
    expect(secondStateFieldText).toBe(this.createdSecondStateArName);
    expect(actionFieldText).toBe(this.createdActionArName);
    return true;
  }

  /**
   * Edits the state machine by updating the names of the first state, second state, and action.
   * @returns {Promise<boolean>} - Returns true if the state machine was successfully edited, otherwise false.
   */
  async editStateMachine() {
    this.firstState = '//div[contains(@class, "MuiBox-root") and contains(text(), "'+this.createdFirstStateArName+'")]';
    this.firstStateEditButton = '(//div[contains(@class, "MuiBox-root") and contains(text(), "'+this.createdFirstStateArName+'")]//following::div//div)[1]';
    this.secondState = '//div[contains(@class, "MuiBox-root") and contains(text(), "'+this.createdSecondStateArName+'")]';
    this.secondStateEditButton = '(//div[contains(@class, "MuiBox-root") and contains(text(), "'+this.createdSecondStateArName+'")]//following::div//div)[1]';
    this.action = '//div[contains(@class, "MuiBox-root") and contains(text(), "'+this.createdActionArName+'")]';
    this.actionEditButton = '(//div[contains(@class, "MuiBox-root") and contains(text(), "'+this.createdActionArName+'")]//following::div//div)[1]';
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
    var stateMachineEdited = await this.popUpMsg.popUpMessage(this.popUpDismissButton, global.testConfig.stateMachine.stateMachineEditedSuccessMsg);
    return stateMachineEdited;
  }
}
module.exports = { StateMachinePage };
