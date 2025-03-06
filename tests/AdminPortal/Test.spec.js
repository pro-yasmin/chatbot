const { test, expect } = require('@playwright/test');
import Constants from '../../src/Utils/Constants';

const { LoginPage } = require('../../src/Pages/LoginPage');
const { HomePage } = require('../../src/Pages/AdminPortal/HomePage');
const { FieldLibraryUpdateRequestsPage } = require('../../src/Pages/AdminPortal/FieldLibraryUpdateRequests/FieldLibraryUpdateRequestsPage');
const { FieldRequestsPage } = require('../../src/Pages/AdminPortal/FieldLibraryUpdateRequests/FieldRequestsPage');
const { FieldRequestDetialsPage } = require('../../src/Pages/AdminPortal/FieldLibraryUpdateRequests/FieldRequestDetialsPage');
const { FieldDetialsPage } = require('../../src/Pages/AdminPortal/FieldLibraryUpdateRequests/FieldDetialsPage');
const { FieldPage } = require('../../src/Pages/AdminPortal/FieldLibraryUpdateRequests/FieldPage');
const { FieldData } = require("../../src/Models/AdminPortal/FieldData");
const { TaskDetailsPage} = require("../../src/Pages/AdminPortal/Tasks/TaskDetailsPage");
const { TasksPage } = require("../../src/Pages/AdminPortal/Tasks/TasksPage");


let loginPage;
let homePage;
let fieldLibraryUpdateRequestsPage , fieldRequestsPage ,fieldRequestDetialsPage;
let fieldPage ,complexFieldData ,InputFieldData,fieldDetialsPage;
let tasksPage,taskDetailsPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    fieldLibraryUpdateRequestsPage = new FieldLibraryUpdateRequestsPage(page);
    fieldRequestsPage = new FieldRequestsPage(page);
    fieldPage = new FieldPage(page);
    complexFieldData = new FieldData(page);
    InputFieldData = new FieldData(page);
    fieldRequestDetialsPage = new FieldRequestDetialsPage(page);
    fieldDetialsPage = new FieldDetialsPage(page);
    tasksPage = new TasksPage(page);
    taskDetailsPage = new TaskDetailsPage(page);

    complexFieldData.setFieldType(Constants.COMPLEX_FIELD) ;
    InputFieldData.setFieldType(Constants.INPUT_FIELD) ;

    var baseUrl = global.testConfig.BASE_URL;
    // var adminusername = global.testConfig.FIELD_MANAGEMENT_SPECIALIST;
    // var adminpassword = global.testConfig.FIELD_MANAGEMENT_SPECIALIST_PASS;
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

test('complex field', async ({ page }) => {
    
        await homePage.navigateToFieldLibraryRequests();
        console.log('Navigate to Field Library Update Requests page');
        await fieldLibraryUpdateRequestsPage.navigateToFieldRequestsPage();
        console.log('Navigate to Request Update Field Library Page');
        await fieldRequestsPage.createField(complexFieldData );
        await fieldRequestsPage.createField(InputFieldData );
        var complexFieldID= await fieldRequestsPage.checkFieldRowDetails(complexFieldData)
        var InputFieldID= await fieldRequestsPage.checkFieldRowDetails(InputFieldData)
        var FieldRequestNumber = await fieldRequestsPage.sendRequestToApproval();
        console.log('Navigate to Complex Field Page');
        var ExpectedFieldStatus = global.testConfig.createField.requestStatusProcessing;
        var result = await fieldLibraryUpdateRequestsPage.checkFieldRowRequestStatus(ExpectedFieldStatus);
        expect(result).toBe(true);
        await fieldLibraryUpdateRequestsPage.openViewFieldDetailsPage();
        var ExpectedRequestStatus = global.testConfig.createField.requestStatusProcessing;
        await fieldRequestDetialsPage.checkInsideRequestStatus(ExpectedRequestStatus);
        var ExpectedEnablmentStatus = global.testConfig.createField.enableStatusHidden;
        await fieldRequestDetialsPage.checkFieldEnablmentStatus(complexFieldID, InputFieldID, ExpectedEnablmentStatus)
        await fieldRequestDetialsPage.openFieldDetailsPage(complexFieldID);  
        await fieldDetialsPage.checkInsideFieldStatus(ExpectedEnablmentStatus);
        var fieldRequestViewPage = global.testConfig.createField.fieldRequestView;
        await fieldDetialsPage.backtoRequestDetialsPage();
        await fieldRequestDetialsPage.openFieldDetailsPage(InputFieldID);  
        await fieldDetialsPage.checkInsideFieldStatus(ExpectedEnablmentStatus);
        await fieldDetialsPage.clickOnMakeDecisionNow();

        await test.step("Tasks approve and reject", async () => {
            await homePage.navigateToTasks();
            await tasksPage.assignTaskToMe(FieldRequestNumber);
        });

        // await tasksPage.ManageField(FieldRequestNumber);

        // go to tree fields 
        
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