const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../src/Pages/AdminPortal/LoginPage');
const { HomePage } = require('../../src/Pages/AdminPortal/HomePage');
const { StreamPage }= require('../../src/Pages/AdminPortal/ProgramsManagement/StreamManagement/StreamPage');
const { StreamData }= require('../../src/Models/AdminPortal/StreamData');
const { StreamManagementPage }= require('../../src/Pages/AdminPortal/ProgramsManagement/StreamManagement/StreamManagementPage');
const { MainProgramPage }= require('../../src/Pages/AdminPortal/ProgramsManagement/MainProgramManagement/MainProgramPage');
const { MainProgramData }= require('../../src/Models/AdminPortal/MainProgramData');
const { MainProgramManagementPage }= require('../../src/Pages/AdminPortal/ProgramsManagement/MainProgramManagement/MainProgramManagementPage');
const { SubProgramsManagementPage }= require('../../src/Pages/AdminPortal/ProgramsManagement/SubProgramsManagement/SubProgramsManagmentPage');
const { SubProgramsData }= require('../../src/Models/AdminPortal/SubProgramsData');
const { SubProgramsPage }= require('../../src/Pages/AdminPortal/ProgramsManagement/SubProgramsManagement/SubProgramsPage');
const { TaskDetailsPage } = require('../../src/Pages/AdminPortal/Tasks/TaskDetailsPage');
const { TasksPage }= require('../../src/Pages/AdminPortal/Tasks/TasksPage');


let loginPage,homePage , streamManagementPage ,streamData ,streamPage ,tasksPage, taskDetailsPage;
let mainProgramPage, mainProgramManagementPage,mainProgramData;
let subProgramsManagementPage ,subProgramsData,subProgramsPage;
// let subProgramsManagementPage ,subProgramsData;
// test.beforeAll(async () => {
let StreamNumber
  
// });

test.beforeEach(async ({page}) => {
  loginPage = new LoginPage(page);
  homePage= new HomePage(page);
  streamPage=new StreamPage(page);
  streamManagementPage = new StreamManagementPage(page);
  streamData = new StreamData(page); 
  tasksPage = new TasksPage(page); 
  taskDetailsPage = new TaskDetailsPage(page);
  mainProgramPage=new MainProgramPage(page);
  mainProgramManagementPage = new MainProgramManagementPage(page);
  mainProgramData = new MainProgramData(page);
  subProgramsManagementPage=new SubProgramsManagementPage(page);
  subProgramsPage = new SubProgramsPage(page);
  subProgramsData = new SubProgramsData(page); 

  var baseUrl = global.testConfig.BASE_URL;
  var adminusername = global.testConfig.ADMIN_USER;
  var adminpassword = global.testConfig.ADMIN_PASS;

await test.step('Login to Admin Portal', async () => {
  await loginPage.gotoAdminPortal(baseUrl);
  var loginSuccess = await loginPage.login(adminusername, adminpassword);
  expect(loginSuccess).toBe(true);
  console.log('login done successfully'); });

});

test('Add and Approve Test Stream', async ({page}) => {
  
  await test.step('Navigate to StreamManagement page', async () => {
    await homePage.navigateToStreamsManagement();  
    console.log('Navigate to Streams page');
  });
    
  await test.step('Create New Stream Task', async () => {
    console.log('Navigate to Create Streams page');
    var result = await streamManagementPage.createStream(streamData);
    expect(result).toBe(true);    
    console.log('New Stream Created Successfully'); });

  await test.step('Search on Stream', async () => {
    console.log('Search on Stream');
    expect( await streamManagementPage.checkStreamRowDetails(streamData)).toBe(true);    
    console.log('New Stream Details Checked Successfully'); });

  await test.step('Approve Stream Task', async () => {  
    console.log('Navigate to MyTasks page to approve stream Request');
    await homePage.navigateToTasks();
    await tasksPage.assignTaskToMe();
    await tasksPage.navigateToMyCompletedTasksTab();
    expect( await tasksPage.aprroveStream()).toBe(true); 
    console.log('New Stream Approved Successfully');});

});

test('Add and Approve Test Main Program', async ({page}) => {

    console.log('Navigate to Streams page');
    await homePage.navigateToStreamsManagement();
    console.log('Click on Define New Main Program');
    await streamManagementPage.clickOnCreateMainProgram('PRG_StrSt_044');//PRG_StrSt_20 in uat env PRG_StrSt_044 , 400 testing
    var result = await mainProgramPage.createNewMainProgram(mainProgramData);
    expect(result).toBe(true);  
    console.log('New Main Program Created Successfully');
    console.log('Search on MainProgram');
    expect( await mainProgramManagementPage.checkMainProgramRowDetails(mainProgramData)).toBe(true);    
    console.log('New Main Program Details Checked Successfully');
    console.log('Navigate to MyTasks page to approve Main Program Request');
    await homePage.navigateToTasks();
    await tasksPage.assignTaskToMe();
    await tasksPage.navigateToMyCompletedTasksTab();
    expect( await tasksPage.aprroveMainProgram()).toBe(true); 
    console.log('New Main Program Approved Successfully');
});

test('Add and Approve Test Sub Programs', async ({page}) => {

    console.log('Navigate to Main Program page');
    await homePage.navigateToMainProgramManagement();
    console.log('Click on Define New SubProgram');
    await mainProgramManagementPage.clickOnCreateSubProgram('PRG_MPRG_005');
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
});

test('Add and Approve Test Benefits', async ({page}) => {

    console.log('Navigate to Main Program page');
    await homePage.navigateToMainProgramManagement();
    console.log('Click on Define New SubProgram');
    await mainProgramManagementPage.clickOnCreateSubProgram('PRG_MPRG_005');
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
    console.log('New benefits Approved Successfully');
});


test.afterEach(async () => {

  await test.step('Login to Admin Portal', async () => {
  await homePage.logout();
  console.log('User Logout Successfully');});

});

  
// test.afterAll(async () => {
// });

 