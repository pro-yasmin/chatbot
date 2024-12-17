const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../src/Pages/AdminPortal/LoginPage');
const { HomePage } = require('../../src/Pages/AdminPortal/HomePage');
const { StreamPage }= require('../../src/Pages/AdminPortal/Programs/StreamPage');
const { StreamManagementPage }= require('../../src/Pages/AdminPortal/Programs/StreamManagementPage');

let loginPage;
let homePage;
let streamPage;
let streamManagementPage;

test('Add Test Stream', async ({ page }) => {

  
    loginPage = new LoginPage(page);
    homePage= new HomePage(page);
    streamPage=new StreamPage(page);
    streamManagementPage = new StreamManagementPage(page);

    var baseUrl = global.testConfig.BASE_URL;
    var adminusername = global.testConfig.ADMIN_USER;
    var adminpassword = global.testConfig.ADMIN_PASS;

    await loginPage.gotoAdminPortal(baseUrl);
    await loginPage.login(adminusername, adminpassword);
    await homePage.navigateToStreamsManagement();
    await streamManagementPage.clickOnNewStream();
    var result = await streamPage.createNewStream();
    expect(result).toBe(true);


});