import Constants from '../../../Utils/Constants.js';
const { PopUpPage } = require("../SharedPages/PopUpPage");
const { SearchPage } = require("../SharedPages/SearchPage");

/**
 * Manages task details, including opening tabs, adding notes, and accepting various task types.
 * @class
 */
export class TaskDetailsPage {
  constructor(page) {
    this.page = page;
    this.search = new SearchPage(this.page);
    // Selectors for tabs
    this.myDataTab = '//button[@id="tab-0"]';
    this.myNotesTab = '//button[@id="tab-1"]';

    // Selectors for task details and actions  
    this.streamEnablementStatus ='//span[@data-testid="value_streams-management-stream-enablement-status"]';
    this.mainProgramEnablementStatus ='//span[@data-testid="value_main-program-enablement-status"]';
    this.subProgramEnablementStatus ='//span[@data-testid="value_enablement-status"]';
    this.benefitEnablementStatus ='//span[@data-testid="value_benefit_enablement_status"]';

    this.addNoteBtn = '//button[contains(text(),"إضافة ملاحظة")]';
    this.noteOnTaskField = '//textarea[@name="message"]';
    this.acceptNoteOnTaskBtn ='//button[contains(@class, "MuiButton-containedPrimary") and contains(@class, "MuiButton-sizeMedium")]';
    this.ensureNoteMsgTitle ='//span[@id="modal-modal-title" and contains(text(), "إضافة الملاحظة")]';
    this.acceptEnsureNoteMsgBtn ='//button[@data-testid="confirmation-modal-primary-button"]';//confirmation-modal-primary-button
    this.confirmNoteMsgTitle ='//div[@class="MuiStack-root muirtl-zwd3xv"]/span[@id="modal-modal-title"]';
    this.acceptConfirmNoteMsgBtn = '//button[contains(@class, "MuiButtonBase-root") and text()="العودة"]';
    this.addedNoteLocator ="div.MuiStack-root.muirtl-1ofqig9 > span:nth-child(3)";

    // Selectors for accepting tasks
    this.acceptTaskBtn = '//button[@data-testid="accept-request"]';

    // Selectors for accepting tasks
    this.rejectTaskBtn = '//button[@data-testid="reject-request"]';

    // Selectors for task notes and confirmations
    this.ensureTaskNotesField = '//textarea[@data-testid="description-text-field"]';
    this.ensureTaskNotesBtn = '//button[@data-testid="process-action-modal-primary-button"]';
    this.confirmTaskMsgTitle = '//span[@id="modal-modal-title"]';
    this.backToTasksBtn = '//button[@data-testid="modal-primary-button"]';

    //selectors for fields and sub domains Tasks
    this.fieldRequestStatusIcon = '//span[@data-testid="status-processing"]';
    this.fieldRequestStatus = "//label[text()='حالة الطلب']//following::span[1]";
    this.tableActions='tag';
    this.acceptFieldTaskBtn ="//div[contains(@class,'MuiDialogActions-root')]//button[1]";
    this.rejectFieldTaskBtn="//div[contains(@class,'MuiDialogActions-root')]//button[2]";
    this.ensureFieldTaskNotesField ='//textarea[@data-testid="description-text-field"]'
    this.ensureFieldTaskNotesFieldApprove="//button[@type='submit']",
    this.ensureFieldTaskNotesFieldReject="//button[@type='submit']",
    this.backToTasksBtn = '//button[@data-testid="modal-primary-button"]',
    //this.processingRequestBtn='//button[contains(text(),"معالجة طلب تحديث مكتبة الحقول")]'
    this.processingRequestBtn='//button[contains(@class,"iButton-containedPrimary")]' //yasmine
  }

  /**
   * Opens the "My Data" tab in the task details page.
   * @returns {Promise<void>} - Completes the navigation to the data tab.
   */
  async openTaskDataTab() {
    await this.page.click(this.myDataTab);
    await this.page.waitForTimeout(5000);
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
  async checkEnablementStatus(taskType, expectedStatus) {
  // Wait for the status element to be visible
  await this.page.waitForTimeout(6000);
  var statusElement = this.page.locator(await this.getstatusLocator(taskType));
  await statusElement.waitFor({ state: "visible", timeout: 30000  });
  var actualStatus = await statusElement.textContent();
   if (actualStatus.trim() === expectedStatus.trim()) {
         console.log(`Enablement Status is as expected: "${actualStatus.trim()}".`);
         return true;
      }
      return false
      // return true;
  }

  // Determine the locator for the status based on taskType
  async getstatusLocator (taskType)
  { var statusLocator;
    switch (taskType) {
      case Constants.STREAM :statusLocator = this.streamEnablementStatus; 
        break;
      case Constants.MAIN_PROGRAM :statusLocator = this.mainProgramEnablementStatus;
        break;
      case Constants.SUB_PROGRAM: statusLocator = this.subProgramEnablementStatus;
        break;
      case Constants.BENEFIT: statusLocator = this.benefitEnablementStatus;
        break;
      default:
        console.log("Invalid task type provided");
        return false;
    }
    return statusLocator;

  }

  /**
   * Checks if a specific note is added to the task.
   * @param {string} addedNote - The note to check.
   * @returns {Promise<boolean>} - Returns true if the note is found; otherwise, false.
   */
  async checkNoteIsAdded(addedNote) {
    var displayedNote = this.page.locator('//*[contains(text(),"' + addedNote + '")]');
    await displayedNote.waitFor({ state: "visible" });
    console.log(`The Note : "${addedNote}" is added Successfully`);
    return true;
  }

  /**
   * Adds a note to the task.
   * @returns {Promise<boolean>} - Returns true if the note is added successfully.
   */
  async addNoteOnTask() {
    await this.page.waitForTimeout(7000);
    await this.openNotesTab();
    await this.page.waitForSelector(this.addNoteBtn,{ state: 'visible', timeout: 50000 });
    await this.page.click(this.addNoteBtn);
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.inputPopUpMessage(this.noteOnTaskField, this.acceptNoteOnTaskBtn,global.testConfig.taskDetails.note);
    await popUpMsg.popUpMessage(this.acceptEnsureNoteMsgBtn ,global.testConfig.taskDetails.ensureNoteMsg);
    await popUpMsg.popUpMessage(this.acceptConfirmNoteMsgBtn,global.testConfig.taskDetails.confirmNoteMsg);
   

    let result = await this.checkNoteIsAdded(global.testConfig.taskDetails.note);
    //await this.page.click(this.addNoteOnTask);
    return result;
  }



 /**
 * Accepts or rejects a task based on the task type and action type.
 * @param {string} actionType - The action to perform ('approve' or 'reject').
 * @param {string} taskType - The type of the task ('stream', 'mainProgram', 'subProgram', 'benefits').
 * @returns {Promise<boolean>} - Returns true if the task is accepted or rejected successfully.
 */
async completeTask(actionType, taskType , confirmMsg) {
  let actionBtn ;

  actionBtn = actionType === Constants.APPROVE ? this.acceptTaskBtn : this.rejectTaskBtn;
  await this.page.click(actionBtn);
  //await this.page.waitForTimeout(2000);
  var popUpMsg = new PopUpPage(this.page);
  await popUpMsg.inputPopUpMessage(this.ensureTaskNotesField,this.ensureTaskNotesBtn,global.testConfig.taskDetails.addCompleteTaskNote);
  var result = await popUpMsg.popUpMessage(this.backToTasksBtn, confirmMsg);

  if (result) {
      console.log(`The ${taskType} ${actionType === Constants.APPROVE ? 'Accepted' : 'Rejected'} Successfully.`);
  }

  return result;
}



/**
   * Checks whether the field task's Request status matches the expected status.
   * @param {string} expectedStatus - The expected Request status.
   * @returns {Promise<boolean>} - Returns true if the status matches; otherwise, false.
   */
  async checkFieldRequestStatus( expectedStatus) {
  // Wait for the status element to be visible
  await this.page.waitForTimeout(2000);
  
  var fieldStatus = this.page.locator(this.fieldRequestStatus);  
  await fieldStatus.waitFor({ state: "visible", timeout: 30000  });
  var actualStatus = await fieldStatus.textContent();
   if (actualStatus.trim() === expectedStatus.trim()) {
         console.log(`Request Status is as expected: "${actualStatus.trim()}".`);
         return true;
      }
      return false
  }

  
 /**
 * Accepts or rejects a field task based on the field task type and action type.
 * @param {string} actionType - The action to perform ('approve' or 'reject').
 * @returns {Promise<boolean>} - Returns true if the task is accepted or rejected successfully.
 */
async completeFieldTask(actionType, requestType) {
  let actionBtn ,notesFieldLocator ,confirmFieldMsg;
  var popUpMsg = new PopUpPage(this.page);

  await popUpMsg.fieldPopUpMessage();

  actionBtn = actionType === Constants.APPROVE ? this.acceptFieldTaskBtn : this.rejectFieldTaskBtn;
  notesFieldLocator = actionType === Constants.APPROVE ? this.ensureFieldTaskNotesFieldApprove : this.ensureFieldTaskNotesFieldReject;
  confirmFieldMsg = actionType === Constants.APPROVE ? global.testConfig.createField.confirmApproveMsg : global.testConfig.createField.confirmRejectMsg;

  await this.page.click(actionBtn);


  //await this.page.waitForTimeout(2000);
  await popUpMsg.inputPopUpMessage(this.ensureFieldTaskNotesField,notesFieldLocator,global.testConfig.createField.addCompleteTaskNote);
  var result = await popUpMsg.popUpMessage(this.backToTasksBtn, confirmFieldMsg);
  if(requestType==Constants.DOMAINS_REQUEST){
  await this.page.click(this.backToTasksBtn); //yasmine
}
  if (result) {
      console.log(`The Field ${actionType === Constants.APPROVE ? 'Accepted' : 'Rejected'} Successfully.`);
  }

  return result;
}


async processFields(fieldID,actionType,requestType) {

  let fieldRow = await this.search.getRowInTableWithSpecificText(fieldID);
 var lastTd  = fieldRow[fieldRow.length - 1].tdLocator;
  // Click the button inside the last <td>
  const actionButton = lastTd.locator('button');
  await actionButton.waitFor({ state: 'visible', timeout: 5000 });
  await actionButton.click();

  console.log(`Clicked action button for field: ${fieldID}`);

  // Complete the task (either APPROVE or REJECT)
  var result =   await this.completeFieldTask(actionType, requestType);
  return result;
}


 
 async clickOnProcessRequrstBtn() {
  await this.page.waitForSelector(this.processingRequestBtn,{ state: 'visible', timeout: 5000 });
  await this.page.click(this.processingRequestBtn);
  return true;
}

async checkFieldsDecisionStatus(fieldsMap,requestType ) {
let fieldsMatched = true ;
   // Process each field from the map
   for (const [fieldID, actionType] of fieldsMap.entries()) {

    var expectedStatus = actionType === Constants.APPROVE
    ? global.testConfig.createField.desitionStatusAccepted
    : global.testConfig.createField.desitionStatusRejected;

      // Retrieve details for both rows using their row IDs
    let rowDetails = await this.search.getRowInTableWithSpecificText(fieldID);
    let rowStatus = await rowDetails[5].tdLocator.textContent();
      // Assuming the enablement status
      if(requestType==Constants.DOMAINS_REQUEST){
        rowStatus = await rowDetails[4].tdLocator.textContent()
      }
   
    console.log(`Row Field Status (ID:  ${fieldID} ) is ${rowStatus}`);

      if (rowStatus.trim() === expectedStatus.trim()) {
        console.log(`Desition Status for Field ID ${fieldID} is as expected: "${expectedStatus}"`);
      } else {
        console.error(`Desition Status mismatch for Field ID ${fieldID}. Expected: "${expectedStatus}", Found: "${rowStatus.trim()}"`);
        fieldsMatched = false;
      }
    }

    if (fieldsMatched) {
      console.log("All fields have the correct decision status.");
    } else {
      console.error("One or more fields have incorrect decision status.");
    }

    return fieldsMatched;
  }

}
module.exports = { TaskDetailsPage };
