const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../src/Pages/AdminPortal/LoginPage');
const { HomePage } = require('../../../src/Pages/AdminPortal/HomePage');
const { MainProgramManagementPage } = require('../../../src/Pages/AdminPortal/ProgramsManagement/MainProgramManagement/MainProgramManagementPage');
const { TaskDetailsPage } = require('../../../src/Pages/AdminPortal/Tasks/TaskDetailsPage');
const { TasksPage } = require('../../../src/Pages/AdminPortal/Tasks/TasksPage');
const { SubProgramsManagementPage } = require('ls ../../../src/Pages/AdminPortal/ProgramsManagement/SubProgramsManagement/SubProgramsManagmentPage');
const { SubProgramsPage } = require('../../../src/Pages/AdminPortal/ProgramsManagement/SubProgramsManagement/SubProgramsPage');
const { SubProgramsData } = require('../../../src/Models/AdminPortal/SubProgramsData');

let loginPage;
let homePage;
let subProgramsPage;
let mainProgramManagementPage;
let tasksPage;
let taskDetailsPage;
let subProgramsManagementPage ;
let subProgramsData;


test('Add and Approve Test Sub Programs', async ({ page }) => {

    loginPage = new LoginPage(page);
    homePage= new HomePage(page);
    mainProgramManagementPage=new MainProgramManagementPage(page);
    subProgramsManagementPage=new SubProgramsManagementPage(page);
    subProgramsPage = new SubProgramsPage(page);
    subProgramsData = new SubProgramsData(page); 
    tasksPage = new TasksPage(page); 
    taskDetailsPage = new TaskDetailsPage(page);

    var baseUrl = global.testConfig.BASE_URL;
    var adminusername = global.testConfig.ADMIN_USER;
    var adminpassword = global.testConfig.ADMIN_PASS;

    await loginPage.gotoAdminPortal(baseUrl);
    var loginSuccess = await loginPage.login(adminusername, adminpassword);
    expect(loginSuccess).toBe(true);
    console.log('login done successfully');
    console.log('Navigate to Main Program page');
    await homePage.navigateToMainProgramManagement();
    console.log('Click on Define New SubProgram');
    await mainProgramManagementPage.clickOnCreateSubProgram('PRG_MPRG_022');
    var result = await subProgramsPage.createNewSubPrograms(subProgramsData);
    expect(result).toBe(true);  
    console.log('New SubProgram Created Successfully');
    console.log('Search on SubProgram');
    expect( await subProgramsManagementPage.checkSubProgramsRowDetails(subProgramsData)).toBe(true);    
    console.log('New SubProgram Details Checked Successfully');
    console.log('Navigate to MyTasks page to approve SubProgram Request');
    await homePage.navigateToTasks();
    await tasksPage.assignTaskToMe();
    await tasksPage.navigateToMyCompletedTasksTab();
    expect( await tasksPage.aprroveSubPrograms()).toBe(true); 
    console.log('New SubProgram Approved Successfully');
    await homePage.logout();
});