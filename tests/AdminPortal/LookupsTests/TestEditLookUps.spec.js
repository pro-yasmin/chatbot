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


test('Edit Lookup', async ({ page }) => {

    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    lookupsManagmentPage = new LookupsManagmentPage(page);
    lookupPage = new LookupPage(page);
    lookupData = new LookupData(page);


    var baseUrl = global.testConfig.BASE_URL;
    var adminusername = global.testConfig.ADMIN_USER;
    var adminpassword = global.testConfig.ADMIN_PASS;

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
    await test.step('Edit Lookup', async () => {
        await lookupsManagmentPage.clickEditLookupButton(lookupData);
        console.log('Edit LookUp Button Clicked');
        await lookupPage.addNewLookupItem();
        console.log('New Lookup Item Added');
    });
    await test.step('View New Lookup Item after adding', async () => {
        await lookupPage.viewNewLookupItemDetails();
        console.log('New Lookup Item Details Viewed');
    });
    await test.step('Logout from Admin Portal', async () => {
        await homePage.logout();
        console.log('User Logout Successfully');
    });
});