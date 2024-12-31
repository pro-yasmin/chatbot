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


test('Create New Lookup', async ({ page }) => {
    
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    lookupsManagmentPage = new LookupsManagmentPage(page);
    lookupPage = new LookupPage(page);
    lookupData = new LookupData(page);
    var lookupCreated;
    var lookupFound;
    var baseUrl = global.testConfig.BASE_URL;
    var adminusername = global.testConfig.GENERAL_SETTING_USER;
    var adminpassword = global.testConfig.GENERAL_SETTING_PASS;
    // Step0: Login 
    await test.step('Login to Admin Portal', async () => {
        await loginPage.gotoAdminPortal(baseUrl);
        var loginSuccess = await loginPage.login(adminusername, adminpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });
    // Step1: Navigate to Lookup list page
    await test.step('Navigate to Lookup page', async () => {
        await homePage.navigateToLookupsManagment();
        console.log('Navigate to LookUps Managment page');
    });

    // Step2: Create New Lookup
    await test.step('Create New Stream Task', async () => {
        await lookupsManagmentPage.clickAddButton();
        lookupCreated = await lookupPage.createNewLookup(lookupData);
        expect(lookupCreated).toBe(true);
        console.log('New lookup Created Successfully');
    });

    // Step3: Check on Lookup in Lookups table
    await test.step('Search on Lookup created', async () => {
        lookupFound = await lookupsManagmentPage.checkNewLookupAdded(lookupData);
        expect(lookupFound).toBe(true);
        console.log('New lookup Details Checked Successfully');
    });
    //Step4: Logout From Admin portal
    await test.step('Logout from Admin Portal', async () => {
        await homePage.logout();
        console.log('Logout done Successfully');
    });

});