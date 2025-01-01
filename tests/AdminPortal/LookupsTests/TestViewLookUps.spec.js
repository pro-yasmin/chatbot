const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../src/Pages/AdminPortal/LoginPage');
const { HomePage } = require('../../../src/Pages/AdminPortal/HomePage');
const { LookupsManagmentPage } = require('../../../src/Pages/AdminPortal/Lookups/LookupsManagmentPage');
const { LookupPage } = require('../../../src/Pages/AdminPortal/Lookups/LookupPage');
const { LookupData } = require('../../../src/Models/AdminPortal/LookupData');



let loginPage;
let homePage;
let lookupsManagmentPage;
let lookupPage;
let lookupData;
test.beforeEach(async () => {
    console.log('Delay before the test starts...');
    await new Promise(resolve => setTimeout(resolve, 5000)); // 2-second delay
});

test('View Lookup', async ({ page }) => {

    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    lookupsManagmentPage = new LookupsManagmentPage(page);
    lookupPage = new LookupPage(page);
    lookupData = new LookupData(page);


    var baseUrl = global.testConfig.BASE_URL;
    var adminusername = global.testConfig.GENERAL_SETTING_USER;
    var adminpassword = global.testConfig.GENERAL_SETTING_PASS;

    await test.step('Login to Admin Portal', async () => {
        await loginPage.gotoAdminPortal(baseUrl);
        var loginSuccess = await loginPage.login(adminusername, adminpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });
    await test.step('Navigate to LookUps Managment page', async () => {
        await homePage.navigateToLookupsManagment();
        console.log('Navigate to LookUps Managment page');
    });
    await test.step('Create New Lookup', async () => {
        await lookupsManagmentPage.clickAddButton();
        await lookupPage.createNewLookup(lookupData);
        console.log('New lookup Created Successfully');
    });
    await test.step('Check New Lookup Added', async () => {
        await lookupsManagmentPage.checkNewLookupAdded(lookupData);
        console.log('New lookup Details Checked Successfully');
    });
    await test.step('View LookUp After adding', async () => {
        await lookupsManagmentPage.clickViewLookUpButton(lookupData);
        console.log('View LookUp Data Button Clicked');
        await lookupPage.validateViewLookupPageIsOpened();
        console.log('View LookUp Page Opened Successfully');
    });
    await test.step('Logout from Admin Portal', async () => {
        await homePage.logout();
        console.log('User Logout Successfully');
    });
});