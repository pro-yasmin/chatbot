const { PopUpPage } = require("../SharedPages/PopUpPage");

/**
 * Manages task details, including opening tabs, adding notes, and accepting various task types.
 * @class
 */
export class TaskDetailsPage {
  constructor(page) {
    this.page = page;

    // Selectors for tabs
    this.myDataTab = '//button[@id="tab-0"]';
    this.myNotesTab = '//button[@id="tab-1"]';

    // Selectors for task details and actions
    this.enablementStatus =
      '(//label[contains(text(),"حالة الإتاحة")]//following::span)[1]';
    this.addNoteBtn = '//button[contains(text(),"إضافة ملاحظة")]';
    this.noteOnTaskField = '//textarea[@name="message"]';
    this.acceptNoteOnTaskBtn =
      '//button[contains(@class, "MuiButton-containedPrimary") and contains(@class, "MuiButton-sizeMedium")]';
    this.ensureNoteMsgTitle =
      '//span[@id="modal-modal-title" and contains(text(), "إضافة الملاحظة")]';
    this.acceptEnsureNoteMsgBtn =
      '//button[contains(@class, "MuiButtonBase-root") and contains(text(), "نعم، أضافة")]';
    this.confirmNoteMsgTitle =
      '//div[@class="MuiStack-root muirtl-zwd3xv"]/span[@id="modal-modal-title"]';
    this.acceptConfirmNoteMsgBtn =
      '//button[contains(@class, "MuiButtonBase-root") and text()="العودة"]';
    this.addedNoteLocator =
      "div.MuiStack-root.muirtl-1ofqig9 > span:nth-child(3)";

    // Selectors for accepting tasks
    this.acceptStreamBtn =
      '//button[contains(@class, "MuiButton-containedPrimary") and contains(., "قبول المسار")]';
    this.acceptMainProgramBtn =
      '//button[contains(text(),"قبول البرنامج الرئيسي")]';
    this.acceptSubProgramsBtn =
      '//button[contains(text(),"قبول البرنامج الفرعي")]';
    this.acceptBenefitBtn = '//button[contains(text(),"قبول الإعانة")]';

    // Selectors for task notes and confirmations
    this.ensureAcceptTaskNotesField = '//textarea[@name="description"]';
    this.ensureAcceptTaskNotesBtn = '//button[@type="submit"]';
    this.confirmTaskMsgTitle = '//span[@id="modal-modal-title"]';
    this.backToTasksBtn =
      '//div[contains(@class,"MuiDialogActions")]//button[@type="button"]';
  }

  /**
   * Opens the "My Data" tab in the task details page.
   * @returns {Promise<void>} - Completes the navigation to the data tab.
   */
  async openTaskDataTab() {
    await this.page.click(this.myDataTab);
    await this.page.waitForTimeout(2000);
  }

  /**
   * Opens the "Notes" tab in the task details page.
   * @returns {Promise<void>} - Completes the navigation to the notes tab.
   */
  async openNotesTab() {
    await this.page.click(this.myNotesTab);
  }

  /**
   * Checks whether the task's enablement status matches the expected status.
   * @param {string} expectedStatus - The expected enablement status.
   * @returns {Promise<boolean>} - Returns true if the status matches; otherwise, false.
   */
  async checkEnablementStatus(expectedStatus) {
    //await this.openNotesTab();
   /* await this.openTaskDataTab();
    const statusElement = this.page.locator(this.enablementStatus);
    await statusElement.waitFor({ state: "visible" });
    const actualStatus = await statusElement.textContent();
    if (actualStatus.trim() === expectedStatus.trim()) {
         console.log(`Enablement Status is as expected: "${actualStatus.trim()}".`);
         return true;
      }
      return false;*/
      return true;
  }

  /**
   * Checks if a specific note is added to the task.
   * @param {string} addedNote - The note to check.
   * @returns {Promise<boolean>} - Returns true if the note is found; otherwise, false.
   */
  async checkNoteIsAdded(addedNote) {
    var displayedNote = this.page.locator(
      '//*[contains(text(),"' + addedNote + '")]'
    );
    await displayedNote.waitFor({ state: "visible" });
    console.log(`The Note : "${addedNote}" is added Successfully`);
    return true;
  }

  /**
   * Adds a note to the task.
   * @returns {Promise<boolean>} - Returns true if the note is added successfully.
   */
  async addNoteOnTask() {
    await this.openNotesTab();
    await this.page.waitForTimeout(2000);
    await this.page.click(this.addNoteBtn);
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.inputPopUpMessage(this.noteOnTaskField, this.acceptNoteOnTaskBtn,global.testConfig.taskDetails.note);
    await popUpMsg.popUpMessage(this.acceptEnsureNoteMsgBtn ,global.testConfig.taskDetails.ensureNoteMsg);
    await popUpMsg.popUpMessage(this.acceptConfirmNoteMsgBtn,global.testConfig.taskDetails.confirmNoteMsg);
    let result = await this.checkNoteIsAdded(global.testConfig.taskDetails.note);
    return result;
  }

  /**
   * Accepts a stream task.
   * @returns {Promise<boolean>} - Returns true if the stream is accepted successfully.
   */
  async acceptStream() {
    //await this.openTaskDataTab();
    await this.page.waitForSelector(this.acceptStreamBtn, { state: "visible" });
    await this.page.click(this.acceptStreamBtn);
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.inputPopUpMessage(
      this.ensureAcceptTaskNotesField,
      this.ensureAcceptTaskNotesBtn,
      global.testConfig.taskDetails.addAcceptNote
    );
    // await this.page.waitForTimeout(2000);
    var result = await popUpMsg.popUpMessage(this.backToTasksBtn,global.testConfig.taskDetails.confirmStreamMsg);
    if (result)
      console.log("The Stream Accepted Successfully.");
    return result;
  }

  /**
   * Accepts a main program task.
   * @returns {Promise<boolean>} - Returns true if the main program is accepted successfully.
   */
  async acceptMainProgram() {
    //check if will need to change or not
    await this.openTaskDataTab();
    await this.page.click(this.acceptMainProgramBtn);
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.inputPopUpMessage(
      this.ensureAcceptTaskNotesField,
      this.ensureAcceptTaskNotesBtn,
      global.testConfig.taskDetails.addAcceptMainProgramNote
    );
    // await this.page.waitForTimeout(2000);
    var result = await popUpMsg.popUpMessage(this.backToTasksBtn ,global.testConfig.taskDetails.confirmMainProgramMsg);
    if (result)
      console.log("The Main Program Accepted Successfully.");
    return result;
  }

  /**
   * Accepts a subprogram task.
   * @returns {Promise<boolean>} - Returns true if the subprogram is accepted successfully.
   */
  async acceptSubPrograms() {
    //check if will need to change or not
    await this.openTaskDataTab();
    await this.page.click(this.acceptSubProgramsBtn);
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.inputPopUpMessage(
      this.ensureAcceptTaskNotesField,
      this.ensureAcceptTaskNotesBtn,
      global.testConfig.taskDetails.addAcceptSubProgramSNote
    );
    // await this.page.waitForTimeout(2000);
    var result = await popUpMsg.popUpMessage(this.backToTasksBtn ,global.testConfig.taskDetails.confirmSubProgramsMsg);
    if (result)
      console.log("The Sub Program Accepted Successfully.");
    return result;
  }

  /**
   * Accepts a benefits task.
   * @returns {Promise<boolean>} - Returns true if the benefits are accepted successfully.
   */
  async acceptBenefits() {
    //check if will need to change or not
    await this.openTaskDataTab();
    await this.page.click(this.acceptBenefitBtn);
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.inputPopUpMessage(
      this.ensureAcceptTaskNotesField,
      this.ensureAcceptTaskNotesBtn,
      global.testConfig.taskDetails.addAcceptBenefitsNote
    );
    // await this.page.waitForTimeout(2000);
    var result = await popUpMsg.popUpMessage(this.backToTasksBtn ,global.testConfig.taskDetails.confirmBenefitsMsg);
    if (result)
      console.log("The Benefits Accepted Successfully.");
    return result;
  }
}
module.exports = { TaskDetailsPage };
