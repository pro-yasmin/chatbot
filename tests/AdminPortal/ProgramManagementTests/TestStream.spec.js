const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../src/Pages/AdminPortal/LoginPage');
const { HomePage } = require('../../../src/Pages/AdminPortal/HomePage');
const { StreamPage } = require('../../../src/Pages/AdminPortal/ProgramsManagement/StreamManagement/StreamPage');
const { StreamManagementPage } = require('../../../src/Pages/AdminPortal/ProgramsManagement/StreamManagement/StreamManagementPage');
const { StreamData } = require('../../../src/Models/AdminPortal/StreamData');
const { TaskDetailsPage } = require('../../../src/Pages/AdminPortal/Tasks/TaskDetailsPage');
const { TasksPage }= require('../../../src/Pages/AdminPortal/Tasks/TasksPage');

let loginPage;
let homePage;
let streamPage;
let streamManagementPage;
let streamData;
let tasksPage;
let taskDetailsPage;

test('Add and Approve Test Stream', async ({ page }) => {

    loginPage = new LoginPage(page);
    homePage= new HomePage(page);
    streamPage=new StreamPage(page);
    streamManagementPage = new StreamManagementPage(page);
    streamData = new StreamData(page); 
    tasksPage = new TasksPage(page); 
    taskDetailsPage = new TaskDetailsPage(page);

    var baseUrl = global.testConfig.BASE_URL;
    var adminusername = global.testConfig.ADMIN_USER;
    var adminpassword = global.testConfig.ADMIN_PASS;

    await loginPage.gotoAdminPortal(baseUrl);
    var loginSuccess = await loginPage.login(adminusername, adminpassword);
    expect(loginSuccess).toBe(true);
    console.log('login done successfully');
    console.log('Navigate to Streams page');
    await homePage.navigateToStreamsManagement();
    console.log('Navigate to Create Streams page');
    var result = await streamManagementPage.createStream(streamData);
    expect(result).toBe(true);    
    console.log('New Stream Created Successfully');
    console.log('Search on Stream');
    expect( await streamManagementPage.checkStreamRowDetails(streamData)).toBe(true);    
    console.log('New Stream Details Checked Successfully');
    console.log('Navigate to MyTasks page to approve stream Request');
    await homePage.navigateToTasks();
    await tasksPage.assignTaskToMe();
    await tasksPage.navigateToMyCompletedTasksTab();
    expect( await tasksPage.aprroveStream()).toBe(true); 
    console.log('New Stream Approved Successfully');
    await homePage.logout();
});