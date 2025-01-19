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
    await this.page.waitForTimeout(15000);
    await this.page.waitForSelector(this.myTasksTab, { state: "visible", timeout: 20000 });
    await this.page.click(this.myTasksTab);
    console.log("Navigate to My tasks tab");
    // await this.page.reload({ waitUntil: 'networkidle', timeout: 60000 });
    // await this.page.waitForSelector(this.myTasksTab, { state: "visible",timeout: 20000});
    //await this.page.click(this.myTasksTab);
  }

  /**
   * Navigates to the "My Completed Tasks" tab.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToMyCompletedTasksTab() {
    await this.page.waitForTimeout(15000);
    await this.page.waitForSelector(this.myCompletedTasksTab, { state: "visible",timeout: 20000 });
    await this.page.click(this.myCompletedTasksTab);
    console.log("Navigate to My completed tasks tab");
  }

  /**
   * Navigates to the "Group Tasks" tab.
   * @returns {Promise<void>} - Completes the navigation.
   */
  async navigateToGroupTasksTab() {
    await this.page.waitForTimeout(15000);
    await this.page.waitForSelector(this.groupTasksTab, {state: "visible", timeout: 20000 });
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
    await this.page.waitForTimeout(3000);
    let taskRow = [];
    taskRow = await this.search.getRowInTableWithSpecificText(this.tasksTable, taskNumber);
    var actionlocator = "div >> div:nth-of-type(2)>> button:nth-of-type(1)";
    await this.search.clickRowAction(taskRow, actionlocator);
    await this.page.click(this.assignToMyselfBtn);
    console.log("clicked on assign to myself Btn");
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.popUpMessage(this.assignPopUpMsgTitle,this.acceptAssignBtn,global.testConfig.tasks.assignTaskMsg);
    await this.page.click(this.acceptAssignBtn);
    console.log("The Task Assigned to my self successfully");
  }

  /**
   * Ensures that a task is accepted and its status is active.
   * @param {string} taskNumber - The unique identifier of the task.
   * @returns {Promise<boolean>} - Returns true if the task is accepted successfully.
   */
  async EnsureTaskAccepted(taskNumber) {
    await this.navigateToGroupTasksTab();
    await this.navigateToMyCompletedTasksTab();
    let taskRow = [];
    taskRow = await this.search.getRowInTableWithSpecificText( this.tasksTable,  taskNumber );
    var actionlocator = "div >> button";
    await this.search.clickRowAction(taskRow, actionlocator);
    // var result=true;
    var expectedStatus = global.testConfig.taskDetails.enableStatusActive;
    var result = await this.taskDetailsPage.checkEnablementStatus(expectedStatus);
    if (result) console.log("Task EnabledStatus is Active now");
    return result;
  }

  /**
   * Approves a stream task.
   * @param {string} streamNumber - The unique identifier of the stream.
   * @returns {Promise<boolean>} - Returns true if the stream is approved successfully.
   */
  async aprroveStream(streamNumber) {
    let status;
    let acceptstatus;
    let ensurestatus;
    // await this.navigateToGroupTasksTab();
    await this.navigateToMyTasksTab();
    let taskStreamRow = [];
    taskStreamRow = await this.search.getRowInTableWithSpecificText( this.tasksTable,streamNumber);
    //taskStreamRow = await this.search.getFirstRow(this.tasksTable);
    var actionlocator = "div >> button";
    await this.search.clickRowAction(taskStreamRow, actionlocator);
    console.log("Navigate To Stream Detials Page Successfully");
    var intialStreamStatus = global.testConfig.taskDetails.enableStatusHidden;
    status =await this.taskDetailsPage.checkEnablementStatus(intialStreamStatus);
    // stramNoteAdded = await this.taskDetailsPage.addNoteForStream();
    acceptstatus = await this.taskDetailsPage.acceptStream();
    ensurestatus = await this.EnsureTaskAccepted(streamNumber);

    if (status && acceptstatus && ensurestatus) return true;

    return false;
  }

  /**
   * Approves a main program task.
   * @param {string} programNumber - The unique identifier of the program.
   * @returns {Promise<boolean>} - Returns true if the program is approved successfully.
   */
  async aprroveMainProgram(programNumber) {
    let status;
    let acceptstatus;
    let ensurestatus;
    await this.navigateToMyTasksTab();
    let taskMainProgramRow = [];
    //taskMainProgramRow = await this.search.getFirstRow(this.tasksTable);
    taskMainProgramRow = await this.search.getRowInTableWithSpecificText(
      this.tasksTable,
      programNumber
    );
    var actionlocator = "div >> button";
    await this.search.clickRowAction(taskMainProgramRow, actionlocator);
    console.log("Navigate To Main Program Detials Page Successfully");
    var intialMainProgramStatus =
      global.testConfig.taskDetails.enableStatusHidden;
    status = await this.taskDetailsPage.checkEnablementStatus(
      intialMainProgramStatus
    );
    // stramNoteAdded = await this.taskDetailsPage.addNoteForStream();
    acceptstatus = await this.taskDetailsPage.acceptMainProgram();
    ensurestatus = await this.EnsureTaskAccepted(programNumber);

    if (status && acceptstatus && ensurestatus) return true;

    return false;
  }

  /**
   * Approves a subprogram task.
   * @param {string} subProgramNumber - The unique identifier of the subprogram.
   * @returns {Promise<boolean>} - Returns true if the subprogram is approved successfully.
   */
  async aprroveSubPrograms(subProgramNumber) {
    let status;
    let acceptstatus;
    let ensurestatus;
    await this.navigateToMyTasksTab();
    let taskSubProgramsRow = [];
    taskSubProgramsRow = await this.search.getRowInTableWithSpecificText(
      this.tasksTable,
      subProgramNumber
    );
    //taskSubProgramsRow = await this.search.getFirstRow(this.tasksTable);
    var actionlocator = "div >> button";
    await this.search.clickRowAction(taskSubProgramsRow, actionlocator);
    console.log("Navigate To SubProgram Detials Page Successfully");
    var intialSubProgramStatus =global.testConfig.taskDetails.enableStatusHidden;
    status = await this.taskDetailsPage.checkEnablementStatus(intialSubProgramStatus);
    // stramNoteAdded = await this.taskDetailsPage.addNoteForStream();
    acceptstatus = await this.taskDetailsPage.acceptSubPrograms();
    ensurestatus = await this.EnsureTaskAccepted(subProgramNumber);

    if (status && acceptstatus && ensurestatus) return true;

    return false;
  }

  /**
   * Approves a benefit task.
   * @param {string} benefitNumber - The unique identifier of the benefit.
   * @returns {Promise<boolean>} - Returns true if the benefit is approved successfully.
   */
  async approveBenefits(benefitNumber) {
    let status;
    let acceptstatus;
    let ensurestatus;
    await this.navigateToMyTasksTab();
    let taskBenefitsRow = [];
    taskBenefitsRow = await this.search.getRowInTableWithSpecificText( this.tasksTable, benefitNumber);
    //taskSubProgramsRow = await this.search.getFirstRow(this.tasksTable);
    var actionlocator = "div >> button";
    await this.search.clickRowAction(taskBenefitsRow, actionlocator);
    console.log("Navigate To Benefits Detials Page Successfully");
    var intialBenefitsStatus = global.testConfig.taskDetails.enableStatusHidden;
    status =await this.taskDetailsPage.checkEnablementStatus(intialBenefitsStatus);
    // stramNoteAdded = await this.taskDetailsPage.addNoteForStream();
    acceptstatus = await this.taskDetailsPage.acceptBenefits();
    ensurestatus = await this.EnsureTaskAccepted(benefitNumber);

    if (status && acceptstatus && ensurestatus) return true;

    return false;
  }
}
module.exports = { TasksPage };
