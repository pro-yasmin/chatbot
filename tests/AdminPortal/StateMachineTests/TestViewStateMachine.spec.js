const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../src/Pages/AdminPortal/LoginPage');
const { HomePage } = require('../../../src/Pages/AdminPortal/HomePage');
const { StateMachineManagmentPage } = require('../../../src/Pages/AdminPortal/StateMachine/StateMachineManagmentPage');
const { StateMachinePage } = require('../../../src/Pages/AdminPortal/StateMachine/StateMachinePage');
const { StateMachineData } = require('../../../src/Models/AdminPortal/StateMachineData');



let loginPage;
let homePage;
let stateMachineManagmentPage;
let stateMachinePage;
let stateMachineData;


test('View State Machine', async ({ page }) => {

    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    stateMachineManagmentPage = new StateMachineManagmentPage(page);
    stateMachinePage = new StateMachinePage(page);
    stateMachineData = new StateMachineData(page);
    var stateMachineCreated;
    var stateMachineFound;
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
    await test.step('Navigate to State Machine Managment page', async () => {
        await homePage.navigateToStateMachineManagment();
        console.log('Navigate to State Machine Managment page');
    });

    // Step2: Create New State Machine
    await test.step('Create New State Machine', async () => {
        await stateMachineManagmentPage.clickAddButton();
        stateMachineCreated = await stateMachinePage.createNewStateMachine(stateMachineData);
        expect(stateMachineCreated).toBe(true);
        console.log('New State Machine Created Successfully');
    });

    // Step3: Check on State Machine in State Machines table
    await test.step('Search on State Machine created', async () => {
        stateMachineFound = await stateMachineManagmentPage.checkNewStateMachineAdded(stateMachineData);
        expect(stateMachineFound).toBe(true);
        console.log('New State Machine Details Checked Successfully');
    });

    //Step4: View State Machine page After adding
    await test.step('View State Machine After adding', async () => {
        await stateMachineManagmentPage.clickViewstateMachineButton(stateMachineData);
        console.log('View State Machine Data Button Clicked');
        await stateMachinePage.validateStateMachinePageIsOpened();
        console.log('View State Machine Page Opened Successfully');
    });

    //Step5: Logout From Admin portal
    await test.step('Logout from Admin Portal', async () => {
        await homePage.logout();
        console.log('Logout done Successfully');
    });

});