const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../src/Pages/AdminPortal/LoginPage');
const { HomeOperationPage } = require('../../../src/Pages/OperationPortal/HomeOperationPage');
const { SimulationModelData } = require('../../../src/Models/OperationPortal/SimulationModelData');
const { SimulationModelManagementPage } = require('../../../src/Pages/OperationPortal/SimualtionModel/SimulationModelManagementPage');


let loginPage;
let homeOperationPage;
let simulationModelData;
let simulationModelManagementPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homeOperationPage = new HomeOperationPage(page);
    simulationModelData = new SimulationModelData();
    simulationModelManagementPage = new SimulationModelManagementPage(page);
    var baseUrl = global.testConfig.OPERATION_BASE_URL;
    var adminusername = global.testConfig.OPERATION_SUPER_ADMIN;
    var adminpassword = global.testConfig.OPERATION_SUPER_ADMIN_PASS;


    // Step0: Login 
    await test.step('Login to Operation Portal', async () => {
        await loginPage.gotoAdminPortal(baseUrl);
        var loginSuccess = await loginPage.login(adminusername, adminpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });
});

test('Define New Simulation Model', async ({ page }) => {
    // Step1: Navigate to Simulation Models Managment page
    await test.step('Navigate to Simulation Models Managment page', async () => {
        await homeOperationPage.navigateToSimulationModels();
        console.log('Navigate to Simulation Models Managment page');
    });

    // Step2: Fill Simulation Model Information
    await test.step('Fill Simulation Model Information', async () => {
        await simulationModelManagementPage.defineSimulationModel(simulationModelData);
        console.log('Simulation Model Information filled Successfully');
        await page.pause();
    });    

    // Step3: Deactivate Field Library
    // await test.step('Deactivate Field Library', async () => {
    //     expect(await fieldLibraryManagement.deactivateFieldLibrary()).toBe(true);
    //     console.log('Field Library Deactivated Successfully');
    // });
});

test('Deactivate Field calculated field', async ({ page }) => {
    // Step1: Navigate to Field Library Managment page
    await test.step('Navigate to Field Library Managment page', async () => {
        await homeOperationPage.navigateToFieldLibrary();
        console.log('Navigate to Field Library Managment page');
    });

    // Step2: Deactivate Field Library
    await test.step('Deactivate Blocked Field Library', async () => {
        expect(await fieldLibraryManagement.deactivateFieldLibraryForBlockedFieldLibrary()).toBe(true);
        console.log('Field Library Deactivation Prevented Successfully');
    });
});


/**
 * Test teardown: Logs out of the operation portal after each test.
 */
test.afterEach(async () => {
    //logout
    await test.step("Logout from Operation Portal", async () => {
        await homeOperationPage.logout();
        console.log("User Logout Successfully");
    });

});