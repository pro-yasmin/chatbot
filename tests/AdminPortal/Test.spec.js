const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../src/Pages/AdminPortal/LoginPage');
const { HomePage } = require('../../src/Pages/AdminPortal/HomePage');
const { FieldLibraryUpdateRequestsPage } = require('../../src/Pages/AdminPortal/FieldLibraryUpdateRequests/FieldLibraryUpdateRequestsPage');
const { FieldRequestsPage } = require('../../src/Pages/AdminPortal/FieldLibraryUpdateRequests/FieldRequestsPage');
const { FieldPage } = require('../../src/Pages/AdminPortal/FieldLibraryUpdateRequests/FieldPage');
const { FieldData } = require("../../src/Models/AdminPortal/FieldData");


let loginPage;
let homePage;
let fieldLibraryUpdateRequestsPage , fieldRequestsPage;
let fieldPage ,fieldData;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    fieldLibraryUpdateRequestsPage = new FieldLibraryUpdateRequestsPage(page);
    fieldRequestsPage = new FieldRequestsPage(page);
    fieldPage = new FieldPage(page);
    fieldData = new FieldData(page);

    var baseUrl = global.testConfig.BASE_URL;
    var adminusername = global.testConfig.FIELD_MANAGEMENT_SPECIALIST;
    var adminpassword = global.testConfig.FIELD_MANAGEMENT_SPECIALIST_PASS;


    // Step0: Login 
    await test.step('Login to Admin Portal', async () => {
        await loginPage.gotoAdminPortal(baseUrl);
        var loginSuccess = await loginPage.login(adminusername, adminpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });
});

test('complex field', async ({ page }) => {
    
        await homePage.navigateToSocialRegistryServices();
        await homePage.navigateToFieldLibraryRequestsPage();
        console.log('Navigate to Field Library Update Requests page');
        await fieldLibraryUpdateRequestsPage.navigateToFieldRequestsPage();
        console.log('Navigate to Request Update Field Library Page');
        await fieldRequestsPage.navigateToFieldPage();
        console.log('Navigate to Complex Field Page');
        await fieldPage.fillFieldDataDefinition(fieldData);


});


/**
 * Test teardown: Logs out of the admin portal after each test.
 */
test.afterEach(async () => {
    //logout
    await test.step("Logout from Admin Portal", async () => {
        await homePage.logout();
        console.log("User Logout Successfully");
    });

});