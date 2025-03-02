const { test, expect } = require('@playwright/test');
import Constants from '../../src/Utils/Constants';

const { LoginPage } = require('../../src/Pages/LoginPage');
const { HomePage } = require('../../src/Pages/AdminPortal/HomePage');
const { FieldLibraryUpdateRequestsPage } = require('../../src/Pages/AdminPortal/FieldLibraryUpdateRequests/FieldLibraryUpdateRequestsPage');
const { FieldData } = require("../../src/Models/AdminPortal/FieldData");
const { TasksPage } = require("../../src/Pages/AdminPortal/Tasks/TasksPage");

let loginPage, homePage, fieldLibraryUpdateRequestsPage, tasksPage;
let complexFieldData, inputFieldData;
let adminUsername, adminPassword;
let requestChecks , fieldRequestNumber;

test.beforeEach(async ({ page }) => {

    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    fieldLibraryUpdateRequestsPage = new FieldLibraryUpdateRequestsPage(page);
    tasksPage = new TasksPage(page);

    complexFieldData = new FieldData(page);
    inputFieldData = new FieldData(page);
    complexFieldData.setFieldType(Constants.COMPLEX_FIELD);
    inputFieldData.setFieldType(Constants.INPUT_FIELD);

    const baseUrl = global.testConfig.BASE_URL;
    adminUsername = global.testConfig.ADMIN_USER;
    adminPassword = global.testConfig.ADMIN_PASS;

    await test.step('Login to Admin Portal', async () => {
        await loginPage.gotoAdminPortal(baseUrl);
        const loginSuccess = await loginPage.login(adminUsername, adminPassword);
        expect(loginSuccess).toBe(true);
        console.log('Login successful');
    });

});

test('Complex and Input Fields Request Flow', async () => {

    await test.step("Navigate to Field Library Requests and Create Fields", async () => {
        await homePage.navigateToFieldLibraryRequests();
        requestChecks = await fieldLibraryUpdateRequestsPage.createComplexFieldRequest(complexFieldData, inputFieldData);
        expect(requestChecks[2]).not.toBeNull(); 
    });

    await test.step("Validate Field Request Status, Details and Make a Decision ", async () => {
        var processingStatus = global.testConfig.createField.requestStatusProcessing;
        var expectedRequestStatus = global.testConfig.createField.requestStatusProcessing;
        var expectedEnablementStatus = global.testConfig.createField.enableStatusHidden;
        await fieldLibraryUpdateRequestsPage.checkFieldRowRequestStatus(processingStatus);
        var sendRequest = await fieldLibraryUpdateRequestsPage.validateFieldDetailsAndMakeDecision(requestChecks[0], requestChecks[1] ,expectedRequestStatus ,expectedEnablementStatus);
        expect(sendRequest).toBe(true);
    });

    await test.step("Tasks approve and reject", async () => {
        await homePage.navigateToTasks();
        await tasksPage.assignTaskToMe(requestChecks[2]); 
       
      
        
        // var fieldRequestNumber ='ISR_Freq_000001320';
        // var fieldsID =['ISR_FLib_00000553','ISR_FLib_00000554'];
        // const myMap = new Map(); myMap.set(requestChecks[1],Constants.APPROVE); myMap.set(requestChecks[0], Constants.REJECT);

        // var taskManage = await tasksPage.manageRequestField(requestChecks[2],myMap );
        // expect(taskManage).toBe(true);
        // console.log("Field Request Done Successfully");
    });

});


    test.afterEach(async () => {
        // Step 6: Logout
        await test.step('Logout from Admin Portal', async () => {
            await homePage.logout();
            console.log('User logged out successfully');
        });
});
