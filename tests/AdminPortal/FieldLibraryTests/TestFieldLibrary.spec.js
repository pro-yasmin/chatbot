const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../src/Pages/AdminPortal/LoginPage');
const { HomePage } = require('../../../src/Pages/AdminPortal/HomePage');
const { FieldLibraryManagementPage } = require('../../../src/Pages/AdminPortal/FieldLibrary/FieldLibraryManagementPage');

let loginPage;
let homePage;
let fieldLibraryManagement;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    fieldLibraryManagement = new FieldLibraryManagementPage(page);
    var baseUrl = global.testConfig.BASE_URL;
    var adminusername = global.testConfig.ADMIN_USER;
    var adminpassword = global.testConfig.ADMIN_PASS;


    // Step0: Login 
    await test.step('Login to Admin Portal', async () => {
        await loginPage.gotoAdminPortal(baseUrl);
        var loginSuccess = await loginPage.login(adminusername, adminpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });
});

test('Check that user can Activate & Deactivate Field without link to ISR schema & calculation field', async ({ page }) => {
    // Step1: Navigate to Field Library Managment page
    await test.step('Navigate to Field Library Managment page', async () => {
        await homePage.navigateToFieldLibrary();
        console.log('Navigate to Field Library Managment page');
    });

    // Step2: Activate Field Library
    await test.step('Activate Field Library', async () => {
        expect(await fieldLibraryManagement.activateFieldLibrary()).toBe(true);
        console.log('Field Library Activated Successfully');
    });

    // Step3: Deactivate Field Library
    await test.step('Deactivate Field Library', async () => {
        expect(await fieldLibraryManagement.deactivateFieldLibrary()).toBe(true);
        console.log('Field Library Deactivated Successfully');
    });
});

test('check the impact on both "ISR schema & calculated field" Deactivate Field', async ({ page }) => {
    // Step1: Navigate to Field Library Managment page
    await test.step('Navigate to Field Library Managment page', async () => {
        await homePage.navigateToFieldLibrary();
        console.log('Navigate to Field Library Managment page');
    });

    // Step2: Deactivate Field Library
    await test.step('Deactivate Blocked Field Library', async () => {
        expect(await fieldLibraryManagement.deactivateFieldLibraryForBlockedFieldLibrary()).toBe(true);
        console.log('Field Library Deactivation Prevented Successfully');
    });
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