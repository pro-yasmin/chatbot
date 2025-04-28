const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../src/Pages/LoginPage');
const { HomePage } = require('../../../src/Pages/AdminPortal/HomePage');
const { SocialRecordCopiesManagementPage } = require('../../../src/Pages/AdminPortal/SocialRecordCopies/SocialRecordCopiesManagementPage');
const { FieldLibraryUpdateRequestsPage } = require('../../../src/Pages/AdminPortal/FieldLibraryUpdateRequests/FieldLibraryUpdateRequestsPage');

let loginPage;
let homePage;
let socialRecordCopiesManagementPage;
let fieldLibraryUpdateRequestsPage;

let context;
let page;
test.beforeEach(async ({browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    socialRecordCopiesManagementPage = new SocialRecordCopiesManagementPage(page);
    fieldLibraryUpdateRequestsPage = new FieldLibraryUpdateRequestsPage(page);
    var baseUrl = global.testConfig.BASE_URL;
    var adminusername = global.testConfig.BUSINESS_DELIVERY_ADMIN;
    var adminpassword = global.testConfig.BUSINESS_DELIVERY_ADMIN_PASS;


    // Step0: Login 
    await test.step('Login to Admin Portal', async () => {
        await loginPage.gotoAdminPortal(baseUrl);
        var loginSuccess = await loginPage.login(adminusername, adminpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });
});

test('Verify Permissions Granted to Business Delivery Admin', async () => {
    // Step1: Verify User can not Manage Social Record Managment page
    await test.step('Verify User can manage to Social Record Managment page', async () => {
        expect(await homePage.navigateToSocialRegistryServices()).toBe(false);
        console.log('Manage Social Record Managment page allowed for Fields Management Specialist');
    });

    // Step2: Verify User can Manage my Tasks page
    await test.step('Verify User can Manage to My Tasks page', async () => {
        expect(await homePage.navigateToTasks()).toBe(false);
        console.log('Manage My Tasks page is allowed for Fields Management Specialist');
    });

    // Step3: Verify User can View my Tasks page
    await test.step('Verify User can View to My Tasks page', async () => {
        expect(await homePage.navigateToTasks()).toBe(false);
        console.log('View My Tasks page is allowed for Fields Management Specialist');
    });

    // Step4: Verify User can View Field Library Requests
    await test.step('Verify User can View Field Library Requests', async () => {
        expect(await homePage.navigateToFieldLibraryRequests()).toBe(false);
        console.log('View Field Library Requests is allowed for Fields Management Specialist');
    });

    // Step5: Verify User can Manage Field Library Requests
    await test.step('Verify User can Manage Field Library Requests', async () => {
        expect(await fieldLibraryUpdateRequestsPage.verifyfieldLibraryUpdateRequestButtonExists()).toBe(false);
        console.log('Manage Field Library Requests is allowed for Fields Management Specialist');
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
        await context.close();
    });

});