const { StreamManagementPage }= require('..//Programs/StreamManagementPage');
const { HomePage } = require('../HomePage');
const {StreamData }= require('../../../Models/AdminPortal/StreamData');
const { SearchPage } = require('../SharedPages/SearchPage');


export class TasksPage {

    constructor(page) {
      this.page = page;
      this.myTasksTab = '//button[@id="tab-0"]';
      this.myCompletedTasksTab = '//button[@id="tab-0"]';
      this.groupTasksTab = '//button[@id="tab-0"]';
      this.searchInput='//input[@placeholder="ادخل رقم الطلب"]';
      this.tasksTable = '//table//tbody';
      this.createSubProgramOption='//ul[@role="menu"]//li[1]';
      this.dotsLocator;

      
    }

    async  navigateToTasks() {
        const homePage = new HomePage(this.page);
        await homePage.navigateToTasks();
    }

    async  navigateToMyTasksTab() {
        await this.navigateToTasks();
        await this.page.click(this.myTasksTab);
      }

      async  navigateToMyCompletedTasksTab() {
        await this.navigateToTasks();
        await this.page.click(this.myCompletedTasksTab);
      }

      async  navigateToGroupTasksTab() {
        await this.navigateToTasks();
        await this.page.click(this.groupTasksTab);
      }

      async searchOnStreamTask(streamData) {
        var search = new SearchPage(this.page);
       // var streamManagementPage = new StreamManagementPage(this.page);

        var taskID = streamData.getCreatedStreamId();
        console.log('stream id is '+ taskID);
        const taskRow = await search.getFirstRow(this.tasksTable)     
        //await streamManagementPage.checkStreamRowDetails(taskID);
        return taskRow;

      }


      async  assignTaskToMe() {
        await this.navigateToGroupTasksTab();
        
        let lastTdTask;
        let taskStreamRow = [];
        taskStreamRow = await search.getFirstRow(this.tasksTable);;
       if(taskStreamRow && taskStreamRow.length > 0)
          {  lastTdTask = taskStreamRow[taskStreamRow.length - 1].tdLocator; 
             this.dotsLocator = lastTdTask.locator('div >> button');
             await this.dotsLocator.waitFor({ state: 'visible' });
             await this.dotsLocator.click();
             await this.page.waitForSelector(this.createSubProgramOption, { state: 'visible', timeout: 60000 });
             await this.page.click(this.createSubProgramOption);
             //await this.page.waitForTimeout(5000);
             console.log('Clicked the creat program button');
             }  


      }


  
  }
  module.exports = { TasksPage };
  
  