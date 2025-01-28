import Constants from '../../../Utils/Constants.js';
// const { Constants } = require("../../../src/Utils/Constants");
// const  Constants  = require("../../../src/Utils/Constants");

const { SearchPage } = require("../SharedPages/SearchPage");
const { PopUpPage } = require("../SharedPages/PopUpPage");
const { TaskDetailsPage } = require("./TaskDetailsPage");

/**
 * Manages task-related actions, including navigation between task tabs,
 * assigning tasks, and approving various task types like streams, programs,SubPrograms and benefits.
 * @class
 */
export class TasksPage {
  constructor(page) {
    this.page = page;
    this.taskDetailsPage = new TaskDetailsPage(this.page);
    this.search = new SearchPage(this.page);
    this.myTasksTab = '//button[@id="tab-0"]';
    this.myCompletedTasksTab = '//button[@id="tab-1"]';
    this.groupTasksTab = '//button[@id="tab-2"]';
    this.searchInput = '//input[@placeholder="ادخل رقم الطلب"]';
    this.tasksTable = "//table//tbody";
    this.assignToMyselfBtn = '//ul[@role="menu"]//li[1]';
    this.assignPopUpMsgTitle = '//span[@id="modal-modal-title"]';
    this.acceptAssignBtn = '//button[contains(text(),"نعم، إسناد!")]';
    this.cancelAssignBtn = '//button[contains(text(),"إلغاء")]';
  }

  /**
   * Navigates to the "My Tasks" tab.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToMyTasksTab() {
    await  this.page.waitForTimeout(5000);
    // await this.page.waitForSelector(this.myTasksTab, { state: "visible",timeout: 20000});
    await this.page.click(this.myTasksTab);
    console.log("Navigate to My tasks tab");
    // await this.page.reload({ waitUntil: 'networkidle', timeout: 60000 });
    // await this.page.waitForSelector(this.myTasksTab, { state: "visible",timeout: 20000});
    // await this.page.click(this.myTasksTab);
  }

  /**
   * Navigates to the "My Completed Tasks" tab.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToMyCompletedTasksTab() {
    await  this.page.waitForTimeout(8000);
    await this.page.waitForSelector(this.myCompletedTasksTab, { state: "visible",timeout: 20000});
    await this.page.click(this.myCompletedTasksTab);
    console.log("Navigate to My completed tasks tab");
  }

  /**
   * Navigates to the "Group Tasks" tab.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToGroupTasksTab() {
    await  this.page.waitForTimeout(10000);
    await this.page.waitForSelector(this.groupTasksTab, { state: "visible",timeout: 20000});
    await this.page.click(this.groupTasksTab);
    console.log("Navigate to group tasks tab");
  }

  /**
   * Assigns a task to the current user.
   * @param {string} taskNumber - The unique identifier of the task to assign.
   * @returns {Promise<void>} - Completes the assignment process.
   */
  async assignTaskToMe(taskNumber) {
    await this.navigateToGroupTasksTab();
    await this.page.waitForTimeout(5000);
    let taskRow = [];
    taskRow = await this.search.getRowInTableWithSpecificText(taskNumber);
    var actionlocator = "div >> div:nth-of-type(2)>> button:nth-of-type(1)";
    await this.search.clickRowAction(taskRow, actionlocator);
    await this.page.click(this.assignToMyselfBtn);
    console.log("clicked on assign to myself Btn");
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.popUpMessage( this.acceptAssignBtn, global.testConfig.tasks.assignTaskMsg);
    console.log("The Task Assigned to my self successfully");
  }

  /**
 * Ensures that a task is either accepted or rejected and its status is updated accordingly.
 * @param {string} taskType - The type of the task (stream, mainProgram, subProgram, benefit).
 * @param {string} taskNumber - The unique identifier of the task.
 * @param {string} actionType - The action to perform ('approve' or 'reject').
 * @returns {Promise<boolean>} - Returns true if the task is processed successfully.
 */
async ensureTaskStatus(taskType, actionType , taskNumber) {
  let expectedStatus;
  await this.navigateToGroupTasksTab();
  await this.navigateToMyCompletedTasksTab();

  // Find the task row in the table
  let taskRow = await this.search.getRowInTableWithSpecificText(taskNumber);
  var actionLocator = "div >> button";
  await this.page.waitForTimeout(10000);
  await this.search.clickRowAction(taskRow, actionLocator);

  // Define expected status based on action
  if (actionType === Constants.APPROVE) {
    expectedStatus = global.testConfig.taskDetails.enableStatusActive;
  } else if (actionType === Constants.REJECT) {
    expectedStatus = global.testConfig.taskDetails.enableStatusHidden;
  } else {
    console.log("Invalid action provided");
    return false;
  }
  // Check if the status is updated accordingly
  var result = await this.taskDetailsPage.checkEnablementStatus(taskType,expectedStatus);
  // Log the result based on the action
  if (result) {
    if (actionType === Constants.APPROVE) {
      console.log("Task is accepted, Enablement Status is Active now");
    } else if (actionType === Constants.REJECT) {
      console.log(
        `Task is rejected, Enablement Status is still ${expectedStatus}`
      );
    }
  }

  return result;
}
 
 
/**
 * Handles task approval or rejection.
 * @param {string} taskType - The type of the task (stream, mainProgram, subProgram, benefit).
 * @param {string} taskNumber - The unique identifier of the task.
 * @param {string} actionType - The action to perform ('approve' or 'reject').
 * @returns {Promise<boolean>} - Returns true if the task is processed successfully.
 */
async manageTask(taskType, actionType ,taskNumber,confirmMsg) {
  let status;
  let taskStatus;
  let ensureStatus;
  let addNote;

  await this.navigateToMyCompletedTasksTab();
  await this.navigateToMyTasksTab();
  
  let taskRow = await this.search.getRowInTableWithSpecificText(taskNumber);
  var actionLocator = "div >> button";
  await this.search.clickRowAction(taskRow, actionLocator);
  console.log(`Navigate To ${taskType} Details Page Successfully`);

  var initialTaskStatus = global.testConfig.taskDetails.enableStatusHidden;
  status = await this.taskDetailsPage.checkEnablementStatus(taskType, initialTaskStatus);
 
  if(actionType=Constants.REJECT)
   addNote = await this.taskDetailsPage.addNoteOnTask();
  else  addNote = true;

  // Call the completeTask method with the corresponding task type and action
  taskStatus = await this.taskDetailsPage.completeTask(actionType, taskType,confirmMsg);
  ensureStatus = await this.ensureTaskStatus(taskType, actionType ,taskNumber);

  // If all steps are successful, return true
  if (addNote && status && taskStatus && ensureStatus) return true;

  return false;
}



}
module.exports = { TasksPage };
