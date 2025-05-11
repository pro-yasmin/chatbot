import Constants from '../../../Utils/Constants.js';

const { SearchPage } = require("../../SharedPages/SearchPage.js");
const { PopUpPage } = require("../../SharedPages/PopUpPage.js");
const { TaskDetailsPage } = require("./TaskDetailsPage.js");
const { HomeOperationPage } = require("../HomeOperationPage.js");


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
    this.homeOperationPage = new HomeOperationPage(this.page);
    this.popUpMsg = new PopUpPage(this.page);

    //popup
    //this.popUpYesButton = '(//div[contains(@class, "MuiDialogActions-root")]//button[@tabindex="0"])[1]';
    this.popUpYesButton = '(//button[contains(text(),"العودة إلى قائمة المهام")])[2]';

    this.myTasksTab = '//button[@id="tab-0"]';
    this.myCompletedTasksTab = '//button[@id="tab-1"]';
    this.groupTasksTab = '//button[@id="tab-2"]';
    this.searchInput = '//form[@data-testid="search-input"]//input';
    this.tasksTable = '//tbody[@data-testid="table-body"]';
    this.tableActions = 'table-actions';
    this.tableThreeDots = '(//button[@data-testid="three-dots-menu"])[1]';
    this.assignToMyselfBtn = '//li[@role="menuitem"]';
    this.assignPopUpMsgTitle = '//span[@id="modal-modal-title"]';
    this.acceptAssignBtn = '//button[contains(text(),"نعم، إسناد")]';
    this.cancelAssignBtn = '//button[contains(text(),"إلغاء")]';
    this.backToTasksBtn = '//button[contains(text(),"العودة إلى المهام")]';
    this.actionsBtn = '(//button[@data-testid="table-action-Eye"])[1]';
    this.completeSimulationModelBtn = '//button[@data-testid="accept-task"]';
    this.completeSimulationModelTaskBtn = '//button[@data-testid="confirm-action"]';
    this.completeSimulationTextBox = '//textarea[@name="description"]';
    this.confirmCompleteSimulationBtn = '//button[@data-testid="submit-button"]';
    this.confirmCompleteSimulationBtnSuccessMsg = '//div[@role="presentation"]//span';
    this.filterButton = '//button[@data-testid="toolbar-filter-button"]';
    this.requestType = '//td[@data-testid="table-row-element-3-0"]';

    this.dataRetrievalErrorMsg = '//span[contains(text(),"حدث خطأ في استرداد البيانات، حاول مرة أخرى")]';




  }

  async getExpectedTaskType(taskType) {
    let expectedType;
    switch (taskType) {
      case Constants.EXECUTE_SIMULATION_MODEL: expectedType = global.testConfig.tasks.executionLogApproval
        break;
      case Constants.EDIT_SIMULATION_MODEL: expectedType = global.testConfig.tasks.prepareSimulationModel
        break;
      default:
        console.log("Unknown task type");
        return false;
    }
    return expectedType;
  }

  async checkTaskRequestType(taskType, taskRow) {
    let expectedMsg = await this.getExpectedTaskType(taskType);
    let actionLocator = taskRow[3].tdLocator;
    let actualType = await actionLocator.textContent();
    console.log(`Expected Task Request Type is ${expectedMsg}`);
    console.log(`Actual Task Request Type is ${actualType}`);

    if (actualType.trim() === expectedMsg.trim()) {
      console.log(`Task Request Type is ${actualType}`);
      return true;
    }
    return false

  }

  /**
   * Navigates to the "My Tasks" tab.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToMyTasksTab() {
    await this.page.click(this.myTasksTab);
    console.log("Navigate to My tasks tab");
  }

  /**
   * Navigates to the "My Completed Tasks" tab.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToMyCompletedTasksTab() {
    await this.page.waitForTimeout(12000);
    await this.page.waitForSelector(this.myCompletedTasksTab, { state: "visible", timeout: 20000 });
    await this.page.click(this.myCompletedTasksTab);
    console.log("Navigate to My completed tasks tab");
  }

  /**
   * Navigates to the "Group Tasks" tab.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToGroupTasksTab() {
    await this.page.waitForTimeout(10000);
    await this.page.waitForSelector(this.groupTasksTab, { state: "visible", timeout: 20000 });
    await this.page.click(this.groupTasksTab);
    await this.page.waitForTimeout(5000);
    console.log("Navigate to group tasks tab");
  }

  /**
   * Assigns a task to the current user.
   * @param {string} taskNumber - The unique identifier of the task to assign.
   * @returns {Promise<void>} - Completes the assignment process.
   */
  async assignTaskToMe(taskType, taskNumber) {
    await this.navigateToGroupTasksTab();
    let taskRow = [];
    taskRow = await this.search.getRowInTableWithSpecificText(taskNumber);
    if (await this.checkTaskRequestType(taskType, taskRow)) {
      console.log(`Task Request Type verified successfully`);
      await this.search.clickRowActionTemp(taskRow, this.tableThreeDots, null);
      await this.page.click(this.assignToMyselfBtn);
      console.log("clicked on assign to myself Btn");
      await this.popUpMsg.popUpMessage(this.acceptAssignBtn, global.testConfig.SimulationModels.assignTaskMsg);
      await this.page.waitForTimeout(2000);
      const popUpMsgResult = await this.popUpMsg.popUpMessage(this.backToTasksBtn, global.testConfig.SimulationModels.assignSuccessMsg);
      console.log("The Task Assigned to my self successfully");
      return popUpMsgResult;
    }
    return false;
  }

  /**
   * Assigns a task to the current user.
   * @param {string} taskNumber - The unique identifier of the task to assign.
   * @returns {Promise<void>} - Completes the assignment process.
   */
  async approveTask(taskNumber, taskType) {
    await this.assignTaskToMe(taskType, taskNumber)
    //to be deleted after fixing the issue of navigation to tasks tab
    await this.navigateToMyTasksTab();
    let taskRow = [];
    taskRow = await this.search.getRowInTableWithSpecificText(taskNumber);
    await this.search.clickRowActionTemp(taskRow, this.actionsBtn, null);

    if (taskType === Constants.EDIT_SIMULATION_MODEL) {
      await this.page.waitForTimeout(2000);
      await this.page.click(this.completeSimulationModelTaskBtn);
      await this.page.fill(this.completeSimulationTextBox, global.testConfig.SimulationModels.descriptionCompleteTaskText);
      await this.page.click(this.confirmCompleteSimulationBtn);

      await this.page.waitForSelector(this.filterButton, { state: "visible", timeout: 20000 });
      await this.page.waitForSelector(this.confirmCompleteSimulationBtnSuccessMsg, { state: "visible", timeout: 20000 });
      const successMessage = await this.page.textContent(this.confirmCompleteSimulationBtnSuccessMsg);
      console.log("success Message:" + successMessage);
      if (successMessage.includes(global.testConfig.SimulationModels.confirmCompleteSimulationBtnSuccessMsgText)) {
        await this.ensureTaskStatus(taskNumber, taskType);
        return true;
      }
      else
        return false;
    }
    else if (taskType === Constants.EXECUTE_SIMULATION_MODEL) {
      await this.page.waitForTimeout(2000);
      await this.page.click(this.completeSimulationModelBtn);
      await this.page.fill(this.completeSimulationTextBox, global.testConfig.SimulationModels.descriptionCompleteTaskText);
      await this.page.click(this.confirmCompleteSimulationBtn);

      await this.page.waitForTimeout(1000);
      //await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SimulationModels.approveExecutionSimulationBtnSuccessMsgText);
      await this.page.waitForTimeout(1000);
      await this.page.click(this.popUpYesButton);
      return await this.ensureTaskStatus(taskNumber, taskType);
    }

  }

  /**
  * Ensures that a task is either accepted or rejected and its status is updated accordingly.
  * @param {string} taskNumber - The unique identifier of the task.
  * @returns {Promise<boolean>} - Returns true if the task is processed successfully.
  */
  // async ensureTaskStatus(taskNumber) {
  //   let expectedStatus;
  //   await this.navigateToMyCompletedTasksTab();
  //   // Find the task row in the table
  //   let taskRow = await this.search.getRowInTableWithSpecificText(taskNumber);
  //   await this.search.clickRowActionTemp(taskRow, this.actionsBtn, null);
  //   expectedStatus = global.testConfig.taskDetails.ReadyForExecution;
  //   // Check if the status is updated accordingly
  //   if (await this.taskDetailsPage.checkEnablementStatus(expectedStatus)) {
  //     console.log("Task is accepted, Enablement Status is Active now");
  //     return true;
  //   }
  //   return false;
  // }

  async ensureTaskStatus(taskNumber, taskType) {
    let expectedStatus;
    await this.navigateToMyCompletedTasksTab();

    // Find the task row in the table
    let taskRow = await this.search.getRowInTableWithSpecificText(taskNumber);
    await this.search.clickRowActionTemp(taskRow, this.actionsBtn, null);

    // Define expected status based on action
    if (taskType === Constants.EXECUTE_SIMULATION_MODEL) {
      expectedStatus = global.testConfig.taskDetails.Completed;
    } else if (taskType === Constants.EDIT_SIMULATION_MODEL) {
      expectedStatus = global.testConfig.taskDetails.ReadyForExecution;
    } else {
      console.log("Invalid action provided");
      return false;
    }
    // Check if the status is updated accordingly
    var result = await this.taskDetailsPage.checkEnablementStatus(expectedStatus);
    // Log the result based on the action
    if (result) {
      if (taskType === Constants.EXECUTE_SIMULATION_MODEL) {
        console.log("Task is Completed");
      } else if (taskType === Constants.EDIT_SIMULATION_MODEL) {
        console.log("Task is Ready for Execution");
      }
    }

    return result;
  }


}
module.exports = { TasksPage };
