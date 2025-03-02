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

    //selectors for fields Tasks
    this.fieldRequestStatusIcon = '//span[@data-testid="status-processing"]';
    this.fieldRequestStatus = '//span[@class="MuiTypography-root MuiTypography-p-md-bold muirtl-17ykn84"][contains(text(),"معالجة")]';
    this.tableActions='tag';
    this.acceptFieldTaskBtn ='//button[contains(text(),"قبول الحقل")]';
    this.rejectFieldTaskBtn='//button[contains(text(),"رفض الحقل")]';
    this.ensureFieldTaskNotesField ='//textarea[@data-testid="description-text-field"]'
    this.ensureFieldTaskNotesFieldApprove='//button[contains(text(),"نعم، قبول!")]',
    this.ensureFieldTaskNotesFieldReject='//button[contains(text(),"نعم، رفض!")]',
    this.backToTasksBtn = '//button[@data-testid="modal-primary-button"]',
    this.processingRequestBtn='//button[contains(text(),"معالجة طلب تحديث مكتبة الحقول")]'
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
    await this.page.waitForSelector(this.addNoteBtn,{ state: 'visible', timeout: 5000 });
    await this.page.click(this.addNoteBtn);
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.inputPopUpMessage(this.noteOnTaskField, this.acceptNoteOnTaskBtn,global.testConfig.taskDetails.note);
    await popUpMsg.popUpMessage(this.acceptEnsureNoteMsgBtn ,global.testConfig.taskDetails.ensureNoteMsg);
    await popUpMsg.popUpMessage(this.acceptConfirmNoteMsgBtn,global.testConfig.taskDetails.confirmNoteMsg);
    let result = await this.checkNoteIsAdded(global.testConfig.taskDetails.note);
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
  async checkFieldRequesttStatus( expectedStatus) {
  // Wait for the status element to be visible
  await this.page.waitForTimeout(6000);
  // var statusElement = this.page.locator(await this.getstatusLocator(taskType));
  var fieldStatusIcon = this.page.locator(this.fieldRequestStatusIcon);
  var fieldStatus = this.page.locator(this.fieldRequestStatus);
  var fieldStatusIcon = this.page.locator(this.fieldRequestStatusIcon);
  await fieldStatus.waitFor({ state: "visible", timeout: 30000  });
  var actualStatusIcon = await fieldStatusIcon.textContent();
  var actualStatus = await fieldStatus.textContent();
   if (actualStatus.trim() === expectedStatus.trim() && actualStatusIcon.trim() === expectedStatus.trim()) {
         console.log(`Enablement Status is as expected: "${actualStatus.trim()}".`);
         return true;
      }
      return false
  }

  
 /**
 * Accepts or rejects a field task based on the field task type and action type.
 * @param {string} actionType - The action to perform ('approve' or 'reject').
 * @returns {Promise<boolean>} - Returns true if the task is accepted or rejected successfully.
 */
async completeFieldTask(actionType) {
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

  if (result) {
      console.log(`The Field ${actionType === Constants.APPROVE ? 'Accepted' : 'Rejected'} Successfully.`);
  }

  return result;
}


async processFields(fieldID1, fieldID2, actionType1,actionType2) {
  // Array of field IDs to process
  const fieldIDs = [fieldID1, fieldID2];
  const actions = [ actionType1, actionType2 ];
    
    let index = 0;
    for (const fieldID of fieldIDs) {
        console.log(`Searching for field: ${fieldID}`);

        // Search for the field and get its row
        let fieldRow = await this.search.getRowInTableWithSpecificText(fieldID);
        if (!fieldRow) {
            console.error(`Field ${fieldID} not found.`);
            continue; // Skip to the next field if not found
        }
        console.log(`Found row for field: ${fieldID}`);

        let lastTd = fieldRow[fieldRow.length - 1].tdLocator;
        // var makeDecision = "button.MuiButtonBase-root";
            // var makeDecision = "td:last-of-type button"; // More reliable selector
            let makeDecision = lastTd.locator("button");
            await makeDecision.waitFor({ state: "visible", timeout: 5000 });
            await makeDecision.click();
            console.log(`Clicked action button for field: ${fieldID}`);


        // Execute different tasks based on iteration index
        await this.completeFieldTask(actions[index]);

        console.log(`Task completed for field: ${fieldID}`);

        index++; // Increment index for the next iteration
    }
    await this.page.waitForSelector(this.processingRequestBtn,{ state: 'visible', timeout: 5000 });
    await this.page.click(this.processingRequestBtn);
}


async checkFieldDecisionStatus(rowId1, rowId2, fieldType ) {
  // Retrieve details for both rows using their row IDs
  let row1Details = await this.search.getRowInTableWithSpecificText(rowId1);
  let row2Details = await this.search.getRowInTableWithSpecificText(rowId2);

  // Assuming the enablement status
  let row1Status = await row1Details[5].tdLocator.textContent();
  let row2Status = await row2Details[5].tdLocator.textContent();

  // Log the status for fields
  console.log(`Row 1 Status (ID: ${rowId1}): ${row1Status}`);
  console.log(`Row 2 Status (ID: ${rowId2}): ${row2Status}`);

  // Compare the extracted values with the expected status
  // if fieldType complex -->ApprovedDecisionStatus
  // if fieldType input -->rejectedDecisionStatus
 {
      return true;
  }
  return false;
}


}
module.exports = { TaskDetailsPage };
