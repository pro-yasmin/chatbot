const { SearchPage } = require("../SharedPages/SearchPage");
const { PopUpPage } = require("../SharedPages/PopUpPage");
const { TaskDetailsPage } = require("./TaskDetailsPage");

let taskDetailsPage;
let search;

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
    this.dotsLocator;
    this.assignPopUpMsgTitle = '//span[@id="modal-modal-title"]';
    this.acceptAssignBtn = '//button[contains(text(),"نعم، إسناد")]';
    this.cancelAssignBtn = '//button[contains(text(),"إلغاء")]';
  }

  async navigateToMyTasksTab() {
    await this.page.click(this.myTasksTab);
  }

  async navigateToMyCompletedTasksTab() {
    await this.page.click(this.myCompletedTasksTab);
  }

  async navigateToGroupTasksTab() {
    await this.page.click(this.groupTasksTab);
  }

  // async searchOnStreamTask(streamData) {
  //   var taskID = streamData.getCreatedStreamId();
  //   console.log("stream id is " + taskID);
  //   const taskRow = await this.search.getFirstRow(this.tasksTable);
  //   return taskRow;
  // }

  async assignTaskToMe() {
    await this.navigateToGroupTasksTab();
    let taskStreamRow = [];
    taskStreamRow = await this.search.getFirstRow(this.tasksTable);
    var actionlocator = "div >> div:nth-of-type(2)>> button:nth-of-type(1)";
    await this.search.clickRowAction(taskStreamRow, actionlocator);
    await this.page.click(this.assignToMyselfBtn);
    console.log("clicked on assign to myself Btn");
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.popUpMessage(
      this.assignPopUpMsgTitle,
      this.acceptAssignBtn,
      global.testConfig.tasks.assignTaskMsg
    );
    // await this.page.waitForTimeout(2000);
    console.log("Stream Assigned to my self successfully");
  }

  async EnsureStreamAccepted() {
    await this.navigateToMyCompletedTasksTab();
    let taskStreamRow = [];
    taskStreamRow = await this.search.getFirstRow(this.tasksTable);
    var actionlocator = "div >> button";
    await this.search.clickRowAction(taskStreamRow, actionlocator);
    var expectedStatus = global.testConfig.taskDetails.enableStatusActive;
    var result = await this.taskDetailsPage.checkEnablementStatus(
      expectedStatus
    );
    if (result) console.log("Stream EnabledStatus is Active now");
    return result;
  }

  async aprroveStream() {
    let status; 
    let stramNoteAdded; 
    let acceptstatus;
    let ensurestatus; 
    await this.navigateToMyTasksTab();
    let taskStreamRow = [];
    taskStreamRow = await this.search.getFirstRow(this.tasksTable);
    var actionlocator = "div >> button";
    await this.search.clickRowAction(taskStreamRow, actionlocator);
    console.log("Navigate To Stream Detials Page Successfully");
    var intialStreamStatus = global.testConfig.taskDetails.enableStatusHidden;
    status = await this.taskDetailsPage.checkEnablementStatus(
      intialStreamStatus
    );
   // stramNoteAdded = await this.taskDetailsPage.addNoteForStream();
    acceptstatus = await this.taskDetailsPage.acceptStream();
    ensurestatus = await this.EnsureStreamAccepted();

    if (status  && acceptstatus && ensurestatus) return true;

    return false;
  }
}
module.exports = { TasksPage };
