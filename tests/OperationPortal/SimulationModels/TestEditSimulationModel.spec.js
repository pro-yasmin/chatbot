const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../src/Pages/LoginPage');
const { HomeOperationPage } = require('../../../src/Pages/OperationPortal/HomeOperationPage');
const { SimulationModelData } = require('../../../src/Models/OperationPortal/SimulationModelData');
const { SimulationModelManagementPage } = require('../../../src/Pages/OperationPortal/SimualtionModel/SimulationModelManagementPage');
const { TasksPage } = require('../../../src/Pages/OperationPortal/Tasks/TasksPage');


let loginPage;
let homeOperationPage;
let simulationModelData;
let simulationModelManagementPage;
let tasksPage;

var baseUrl = global.testConfig.OPERATION_BASE_URL;
var adminusername = global.testConfig.PROGRAMS_AND_POLICIES_SPECIALIST;
var adminpassword = global.testConfig.PROGRAMS_AND_POLICIES_SPECIALIST_PASS;

var adminusername2 = global.testConfig.BUSSINESS_RULES_SPECIALIST;
var adminpassword2 = global.testConfig.BUSSINESS_RULES_SPECIALIST_PASS;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homeOperationPage = new HomeOperationPage(page);
    simulationModelData = new SimulationModelData();
    simulationModelManagementPage = new SimulationModelManagementPage(page);
    tasksPage = new TasksPage(page);

    // Step0: Login 
    await test.step('Login to Operation Portal', async () => {
        await loginPage.gotoOperationPortal(baseUrl);
        var loginSuccess = await loginPage.login(adminusername, adminpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });
});

test('Edit New Simulation Model', async ({ page }) => {
    // Step1: Navigate to Simulation Models Managment page
    await test.step('Navigate to Simulation Models Management page', async () => {
        await homeOperationPage.navigateToSimulationModels();
        console.log('Navigate to Simulation Models Management page');
    });

    // Step2: Fill Simulation Model Information
    await test.step('Fill Simulation Model Information', async () => {
        expect(await simulationModelManagementPage.defineSimulationModel(simulationModelData)).toBe(true);
        console.log('Simulation Model Information filled Successfully');
    });

    // Step3: Search & Verify Simulation Model Information
    await test.step('Search on Simulation Model created', async () => {
        expect(await simulationModelManagementPage.checkNewSimulationModelAdded(simulationModelData, null, null)).toBe(true);
        console.log('New Simulation Model Details Checked Successfully');
    });

    //logout
    await test.step("Logout from Operation Portal", async () => {
        await homeOperationPage.logout();
        console.log("User Logout Successfully");
    });

    //login with another user
    await test.step('Login to Operation Portal', async () => {
        //await loginPage.gotoOperationPortal(baseUrl);
        var loginSuccess = await loginPage.login(adminusername2, adminpassword2);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });

    // Step5: Navigate to Tasks Managment page
    await test.step('Navigate to Tasks Management page', async () => {
        await homeOperationPage.navigateToTasksTab();
        console.log('Navigate to Tasks Management page');
    });

    // Step7: Approve Task
    await test.step('Approve Task', async () => {
        expect(await tasksPage.approveTask(simulationModelData)).toBe(true);
        console.log('Task approved successfully');
    });

    //logout
    await test.step("Logout from Operation Portal", async () => {
        await homeOperationPage.logout();
        console.log("User Logout Successfully");
    });

    //login with another user
    await test.step('Login to Operation Portal', async () => {
        var loginSuccess = await loginPage.login(adminusername, adminpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });

    // Step8: Navigate to Simulation Models Managment page
    await test.step('Navigate to Simulation Models Management page', async () => {
        //await page.waitForTimeout(10000);
        await homeOperationPage.navigateToSimulationModels();
        console.log('Navigate to Simulation Models Management page');
    });

    // Step9: Search & Verify Simulation Model Status changed to active
    await test.step('Search on Simulation Model Status changed to active', async () => {
        expect(await simulationModelManagementPage.checkNewSimulationModelAdded(simulationModelData, true, null)).toBe(true);
        console.log('New Simulation Model Status changed to active Successfully');
    });

    // Step10: Edit Simulation Model
    await test.step('Edit Simulation Model', async () => {
        expect(await simulationModelManagementPage.editSimulationModel(simulationModelData)).toBe(true);
        console.log('Simulation Model edited Successfully');
    });

    // Step11: Search & Verify Simulation Model 
    await test.step('Search on Edited Simulation Model', async () => {
        expect(await simulationModelManagementPage.checkNewSimulationModelAdded(simulationModelData, null, true)).toBe(true);
        console.log('Edited Simulation Model Found Successfully');
    });
    // Step12: Navigate to Tasks Managment page
    await test.step('Navigate to Tasks Management page', async () => {
        await homeOperationPage.navigateToTasksTab();
        console.log('Navigate to Tasks Management page');
    });

    //logout
    await test.step("Logout from Operation Portal", async () => {
        await homeOperationPage.logout();
        console.log("User Logout Successfully");
    });

    //login with another user
    await test.step('Login to Operation Portal', async () => {
        var loginSuccess = await loginPage.login(adminusername2, adminpassword2);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });

    // Step5: Navigate to Tasks Managment page
    await test.step('Navigate to Tasks Management page', async () => {
        await homeOperationPage.navigateToTasksTab();
        console.log('Navigate to Tasks Management page');
    });

    // Step14: Approve Task
    await test.step('Approve Task', async () => {
        expect(await tasksPage.approveTask(simulationModelData)).toBe(true);
        console.log('Task approved successfully');
    });

    //logout
    await test.step("Logout from Operation Portal", async () => {
        await homeOperationPage.logout();
        console.log("User Logout Successfully");
    });

    //login with another user
    await test.step('Login to Operation Portal', async () => {
        var loginSuccess = await loginPage.login(adminusername, adminpassword);
        expect(loginSuccess).toBe(true);
        console.log('login done successfully');
    });

    // Step15: Navigate to Simulation Models Managment page
    await test.step('Navigate to Simulation Models Management page', async () => {
        await page.waitForTimeout(10000);
        await homeOperationPage.navigateToSimulationModels();
        console.log('Navigate to Simulation Models Management page');
    });

    // Step16: Search & Verify Simulation Model Status changed to active
    await test.step('Search on Simulation Model Status changed to active', async () => {
        expect(await simulationModelManagementPage.checkNewSimulationModelAdded(simulationModelData, true, null)).toBe(true);
        console.log('New Simulation Model Status changed to active Successfully');
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