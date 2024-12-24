const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../src/Pages/AdminPortal/LoginPage');
const { HomePage } = require('../../src/Pages/AdminPortal/HomePage');
const { MainProgramPage }= require('../../src/Pages/AdminPortal/Programs/MainProgramPage');
const { MainProgramData }= require('../../src/Models/AdminPortal/MainProgramData');
const { MainProgramManagementPage }= require('../../src/Pages/AdminPortal/Programs/MainProgramManagmentPage');
const { TaskDetailsPage } = require('../../src/Pages/AdminPortal/Tasks/TaskDetailsPage');
const { TasksPage }= require('../../src/Pages/AdminPortal/Tasks/TasksPage');
const { StreamManagementPage }= require('../../src/Pages/AdminPortal/Programs/StreamManagementPage');

let loginPage;
let homePage;
let mainProgramPage;
let mainProgramManagementPage;
let mainProgramData;
let tasksPage;
let taskDetailsPage;
let streamManagementPage ;


test('Add and Approve Test Main Program', async ({ page }) => {

    loginPage = new LoginPage(page);
    homePage= new HomePage(page);
    mainProgramPage=new MainProgramPage(page);
    mainProgramManagementPage = new MainProgramManagementPage(page);
    mainProgramData = new MainProgramData(page); 
    tasksPage = new TasksPage(page); 
    taskDetailsPage = new TaskDetailsPage(page);
    streamManagementPage = new StreamManagementPage(page);

    var baseUrl = global.testConfig.BASE_URL;
    var adminusername = global.testConfig.ADMIN_USER;
    var adminpassword = global.testConfig.ADMIN_PASS;

    await loginPage.gotoAdminPortal(baseUrl);
    var loginSuccess = await loginPage.login(adminusername, adminpassword);
    expect(loginSuccess).toBe(true);
    console.log('login done successfully');
    console.log('Navigate to Streams page');
    await homePage.navigateToStreamsManagement();
    console.log('Click on Define New Main Program');
    await streamManagementPage.clickOnCreateMainProgram('PRG_StrSt_400');
    var result = await mainProgramPage.createNewMainProgram(mainProgramData);
    expect(result).toBe(true);  
    console.log('New Main Program Created Successfully');
    console.log('Search on MainProgram');
    expect( await mainProgramManagementPage.checkMainProgramRowDetails(mainProgramData)).toBe(true);    
    console.log('New Main Program Details Checked Successfully');
    console.log('Navigate to MyTasks page to approve stream Request');
    await homePage.navigateToTasks();
    await tasksPage.assignTaskToMe();
    await tasksPage.navigateToMyCompletedTasksTab();
    expect( await tasksPage.aprroveMainProgram()).toBe(true); 
    console.log('New Main Program Approved Successfully');
    await homePage.logout();
});