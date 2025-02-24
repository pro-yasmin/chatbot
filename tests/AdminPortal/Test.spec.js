const { test, expect } = require('@playwright/test');
import Constants from '../../src/Utils/Constants';

const { LoginPage } = require('../../src/Pages/LoginPage');
const { HomePage } = require('../../src/Pages/AdminPortal/HomePage');
const { FieldLibraryUpdateRequestsPage } = require('../../src/Pages/AdminPortal/FieldLibraryUpdateRequests/FieldLibraryUpdateRequestsPage');
const { FieldRequestsPage } = require('../../src/Pages/AdminPortal/FieldLibraryUpdateRequests/FieldRequestsPage');
const { FieldPage } = require('../../src/Pages/AdminPortal/FieldLibraryUpdateRequests/FieldPage');
const { FieldData } = require("../../src/Models/AdminPortal/FieldData");


let loginPage;
let homePage;
let fieldLibraryUpdateRequestsPage , fieldRequestsPage;
let fieldPage ,complexFieldData ,InputFieldData;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    fieldLibraryUpdateRequestsPage = new FieldLibraryUpdateRequestsPage(page);
    fieldRequestsPage = new FieldRequestsPage(page);
    fieldPage = new FieldPage(page);
    complexFieldData = new FieldData(page);
    InputFieldData = new FieldData(page);

    complexFieldData.setFieldType(Constants.COMPLEX_FIELD) ;
    InputFieldData.setFieldType(Constants.INPUT_FIELD) ;

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
    
        await homePage.navigateToFieldLibraryRequests();
        console.log('Navigate to Field Library Update Requests page');
        await fieldLibraryUpdateRequestsPage.navigateToFieldRequestsPage();
        console.log('Navigate to Request Update Field Library Page');
        await fieldRequestsPage.createField(complexFieldData );
        await fieldRequestsPage.createField(InputFieldData );
        await fieldRequestsPage.checkFieldRowDetails(complexFieldData)
        await fieldRequestsPage.checkFieldRowDetails(InputFieldData)
        var sendFieldsToApprove = await fieldRequestsPage.sendRequestToApproval();
        console.log('Navigate to Complex Field Page');
        expect(sendFieldsToApprove).toBe(true);
        // 

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