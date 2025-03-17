import Constants from '../../../Utils/Constants.js';

const { SearchPage } = require("../../AdminPortal/SharedPages/SearchPage.js");
const { PopUpPage } = require("../../AdminPortal/SharedPages/PopUpPage.js");
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
    this.searchInput = '//input[@placeholder="ادخل رقم الطلب"]';
    this.tasksTable = "//table//tbody";
    this.tableActions = 'table-actions';
    this.tableThreeDots = '(//button[contains(@class, "MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium")])[2]';
    this.assignToMyselfBtn = '//span[contains(text(),"إسناد المهمة لنفسي")]';
    this.assignPopUpMsgTitle = '//span[@id="modal-modal-title"]';
    this.acceptAssignBtn = '//button[contains(text(),"نعم، إسناد")]';
    this.cancelAssignBtn = '//button[contains(text(),"إلغاء")]';
    this.backToTasksBtn = '//button[contains(text(),"العودة إلى المهام")]';
    this.actionsBtn = '(//button[contains(@class, "MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium")])[1]';
    this.completeSimulationModelBtn = '(//span[contains(@class, "MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium")])[1]/..';
    this.completeSimulationTextBox = '//textarea[@name="description"]';
    this.confirmCompleteSimulationBtn = '(//span[contains(@class, "MuiButton-icon MuiButton-startIcon MuiButton-iconSizeMedium")])/ ../ ../button[@type="submit"]';
    this.confirmCompleteSimulationBtnSuccessMsg = '//div[@role="presentation"]//span';
    this.filterButton = '//button[@data-testid="toolbar-filter-button"]';

    this.dataRetrievalErrorMsg = '//span[contains(text(),"حدث خطأ في استرداد البيانات، حاول مرة أخرى")]';




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
    console.log("Navigate to group tasks tab");
  }

  /**
   * Assigns a task to the current user.
   * @param {string} taskNumber - The unique identifier of the task to assign.
   * @returns {Promise<void>} - Completes the assignment process.
   */
  async assignTaskToMe(taskNumber) {
    await this.navigateToGroupTasksTab();
    let taskRow = [];
    taskRow = await this.search.getRowInTableWithSpecificText(taskNumber);
    await this.search.clickRowActionTemp(taskRow, this.tableThreeDots, null);
    await this.page.click(this.assignToMyselfBtn);
    console.log("clicked on assign to myself Btn");
    await this.popUpMsg.popUpMessage(this.acceptAssignBtn, global.testConfig.SimulationModels.assignTaskMsg);
    await this.page.waitForTimeout(2000);
    const popUpMsgResult = await this.popUpMsg.popUpMessage(this.backToTasksBtn, global.testConfig.SimulationModels.assignSuccessMsg);
    console.log("The Task Assigned to my self successfully");
    return popUpMsgResult;
  }

  /**
   * Assigns a task to the current user.
   * @param {string} taskNumber - The unique identifier of the task to assign.
   * @returns {Promise<void>} - Completes the assignment process.
   */
  async approveTask(taskNumber, actionType) {
    await this.assignTaskToMe(taskNumber)
    //to be deleted after fixing the issue of navigation to tasks tab
    await this.navigateToMyTasksTab();
    let taskRow = [];
    taskRow = await this.search.getRowInTableWithSpecificText(taskNumber);
    await this.search.clickRowActionTemp(taskRow, this.actionsBtn, null);
    await this.page.waitForTimeout(2000);
    await this.page.click(this.completeSimulationModelBtn);
    await this.page.fill(this.completeSimulationTextBox, global.testConfig.SimulationModels.descriptionCompleteTaskText);
    await this.page.click(this.confirmCompleteSimulationBtn);

    if (actionType === Constants.READY_FOR_EXECUION) {
      await this.page.waitForSelector(this.filterButton, { state: "visible", timeout: 20000 });
      await this.page.waitForSelector(this.confirmCompleteSimulationBtnSuccessMsg, { state: "visible", timeout: 20000 });
      const successMessage = await this.page.textContent(this.confirmCompleteSimulationBtnSuccessMsg);
      console.log("success Message:" + successMessage);
      if (successMessage.includes(global.testConfig.SimulationModels.confirmCompleteSimulationBtnSuccessMsgText)) {
        await this.ensureTaskStatus(taskNumber, actionType);
        return true;
      }
      else
        return false;
    }
    else if (actionType === Constants.APPROVE) {
      await this.page.waitForTimeout(1000);
      //await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SimulationModels.approveExecutionSimulationBtnSuccessMsgText);
      await this.page.waitForTimeout(1000);
      await this.page.click(this.popUpYesButton);
      return await this.ensureTaskStatus(taskNumber, actionType);
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

  async ensureTaskStatus(taskNumber, actionType) {
    let expectedStatus;
    await this.navigateToMyCompletedTasksTab();

    // Find the task row in the table
    let taskRow = await this.search.getRowInTableWithSpecificText(taskNumber);
    await this.search.clickRowActionTemp(taskRow, this.actionsBtn, null);

    // Define expected status based on action
    if (actionType === Constants.APPROVE) {
      expectedStatus = global.testConfig.taskDetails.Approved;
    } else if (actionType === Constants.READY_FOR_EXECUION) {
      expectedStatus = global.testConfig.taskDetails.ReadyForExecution;
    } else {
      console.log("Invalid action provided");
      return false;
    }
    // Check if the status is updated accordingly
    var result = await this.taskDetailsPage.checkEnablementStatus(expectedStatus);
    // Log the result based on the action
    if (result) {
      if (actionType === Constants.APPROVE) {
        console.log("Task is Approved");
      } else if (actionType === Constants.READY_FOR_EXECUION) {
        console.log("Task is Ready for Execution");
      }
    }

    return result;
  }


}
module.exports = { TasksPage };
