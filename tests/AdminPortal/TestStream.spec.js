const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../src/Pages/AdminPortal/LoginPage');
const { HomePage } = require('../../src/Pages/AdminPortal/HomePage');
const { StreamPage }= require('../../src/Pages/AdminPortal/Programs/StreamPage');
const { StreamData }= require('../../src/Models/AdminPortal/StreamData');
const { StreamManagementPage }= require('../../src/Pages/AdminPortal/Programs/StreamManagementPage');

let loginPage;
let homePage;
let streamPage;
let streamManagementPage;
let streamData;

test('Add and Approve Test Stream', async ({ page }) => {

  
    loginPage = new LoginPage(page);
    homePage= new HomePage(page);
    streamPage=new StreamPage(page);
    streamManagementPage = new StreamManagementPage(page);
    streamData = new StreamData(page);  

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
    await streamManagementPage.clickOnNewStream();
    var result = await streamPage.createNewStream(streamData);
    expect(result).toBe(true);    
    console.log('New Stream Created Successfully');
    console.log('Search on Stream');
    await streamManagementPage.checkStreamRowDetails(streamData);
    console.log('New Stream Details Checked Successfully');
//Logout 
//Login by Autorizied appraval user 
   // console.log('Navigate to MyTasks page to approve stream Request');

    //await tasksPage.navigateToGroupTasksTab();
    // var result =  await tasksPage.searchOnStreamTask(streamData);

    // expect(result).toBe(true);  




});