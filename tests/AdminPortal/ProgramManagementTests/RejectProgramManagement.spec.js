const { test, expect } = require("@playwright/test");
// const  Constants  = require("../../../src/Utils/Constants");
import Constants from '../../../src/Utils/Constants.js';

const { LoginPage } = require("../../../src/Pages/AdminPortal/LoginPage");
const { HomePage } = require("../../../src/Pages/AdminPortal/HomePage");
const { StreamDetailsPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/StreamManagement/StreamDetailsPage");
const { StreamData } = require("../../../src/Models/AdminPortal/StreamData");
const { StreamManagementPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/StreamManagement/StreamManagementPage");
const { MainProgramPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/MainProgramManagement/MainProgramPage");
const { MainProgramData } = require("../../../src/Models/AdminPortal/MainProgramData");
const { MainProgramDetailsPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/MainProgramManagement/MainProgramDetailsPage");
const { MainProgramManagementPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/MainProgramManagement/MainProgramManagementPage");
const { SubProgramsManagementPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/SubProgramsManagement/SubProgramsManagmentPage");
const { SubProgramDetailsPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/SubProgramsManagement/SubProgramDetailsPage");
const { SubProgramsData } = require("../../../src/Models/AdminPortal/SubProgramsData");
const { SubProgramsPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/SubProgramsManagement/SubProgramsPage");
const { BenefitsPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/BenefitsManagement/BenefitsPage");
const { BenefitsManagmentPage } = require("../../../src/Pages/AdminPortal/ProgramsManagement/BenefitsManagement/BenefitsManagementPage");
const { BenefitsData } = require("../../../src/Models/AdminPortal/BenefitsData");
const { Programs } = require("../../../src/Apis/Business/Programs");
const { TaskDetailsPage} = require("../../../src/Pages/AdminPortal/Tasks/TaskDetailsPage");
const { TasksPage } = require("../../../src/Pages/AdminPortal/Tasks/TasksPage");


let loginPage,homePage,adminusername ,adminpassword , programs;
let streamManagementPage,streamData,streamDetailsPage;
let mainProgramPage, mainProgramManagementPage, mainProgramData ,mainProgramDetailsPage;
let subProgramsManagementPage, subProgramsData, subProgramsPage,subProgramDetailsPage;
let benefitsPage, benefitsManagmentPage, benefitsData;
let streamNumber, mainProgramNumber, subProgramNumber, benefitNumber ;
let mainProgramTask , subProgramTask,benefitTask;
let tasksPage,taskDetailsPage ;

let stream ;
let mainProgram ;
let subProgram, subProgramData;
let Benefit   ;




/**
 * Test setup: Initializes all required page objects and logs into the admin portal.
 */
test.beforeEach(async ({ page }) => {

  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  streamManagementPage = new StreamManagementPage(page);
  streamData = new StreamData(page);
  streamDetailsPage = new StreamDetailsPage(page);
  mainProgramPage = new MainProgramPage(page);
  mainProgramManagementPage = new MainProgramManagementPage(page);
  mainProgramData = new MainProgramData(page);
  mainProgramDetailsPage= new  MainProgramDetailsPage(page);
  subProgramsManagementPage = new SubProgramsManagementPage(page);
  subProgramsPage = new SubProgramsPage(page);
  subProgramsData = new SubProgramsData(page);
  subProgramDetailsPage= new SubProgramDetailsPage(page);
  benefitsPage = new BenefitsPage(page);
  benefitsManagmentPage = new BenefitsManagmentPage(page);
  benefitsData = new BenefitsData(page);
  programs = new Programs();
  tasksPage = new TasksPage(page);
  taskDetailsPage = new TaskDetailsPage(page);

  var baseUrl = global.testConfig.BASE_URL;
  adminusername = global.testConfig.ADMIN_USER;
  adminpassword = global.testConfig.ADMIN_PASS;

  await test.step("Login to Admin Portal", async () => {
  await loginPage.gotoAdminPortal(baseUrl);
  var loginSuccess = await loginPage.login(adminusername, adminpassword);
  expect(loginSuccess).toBe(true);
  console.log("login done successfully");
  });

});

/**
 * Test case: Create and Reject Stream
*/
test("Create and Reject Stream", async () => {

      // Step1: Create Stream From API
      await test.step("Create And Appove Stream From API", async () => {
      streamNumber = await programs.createStreamAPI(adminusername, adminpassword, streamData) 
      expect(streamNumber).not.toBeNull();
      console.log('API Stream', streamNumber);
      });

      // Step2: Reject New Stream
        await test.step("Reject Stream Task", async () => {
        console.log("Navigate to MyTasks page to reject stream task");
        await homePage.navigateToTasks();
        await tasksPage.assignTaskToMe(streamNumber[1]);
        var confirmMsg= global.testConfig.taskDetails.confirmRejectStreamMsg;
        expect(await tasksPage.manageTask(Constants.STREAM, Constants.REJECT,streamNumber[1],confirmMsg)).toBe(true);
        console.log("New Stream Rejected Successfully with id= " + streamNumber[1]);
        });

});

/**
 * Test case: Create and Reject Main Program
 */
test("Create and Reject Main Program", async () => {
  // Step1: Create and approve stream and create New Main Program.
  await test.step("Create and Approve stream and create New Main Program from API", async () => {
     stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
     mainProgram = await programs.createMainProgramAPI(adminusername, adminpassword, mainProgramData, stream[0]);
     expect(mainProgram).not.toBeNull();
   
  });

  // Step2: Reject New Main Program
  await test.step("Reject Main Program Task", async () => {
    console.log("Navigate to MyTasks page to reject Main Program task");
    await homePage.navigateToTasks();
    await tasksPage.assignTaskToMe(mainProgram[1]);
    var confirmMsg = global.testConfig.taskDetails.confirmRejectMainProgramMsg;
    expect(await tasksPage.manageTask(Constants.MAIN_PROGRAM, Constants.REJECT,mainProgram[1],confirmMsg)).toBe(true);
    console.log("New Main Program Rejected Successfully with id= " + mainProgram[1]);
    });

});

/**
 * Test case: Create and Reject Sub Program
 */
test("Create and Reject Sub Program", async () => {
  // Step1: Create and approve stream ,Main Program and create New Sub Program.
  await test.step("Create and approve stream ,Main Program and create New Sub Program from API", async () => {
    stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
    mainProgram = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData, stream[0]);
    subProgram = await programs.createSubProgramAPI(adminusername, adminpassword, subProgramsData, mainProgram[0]);
    expect(subProgram).not.toBeNull();
  });

  // Step2: Reject New Sub Program
  await test.step("Reject Sub Program Task", async () => {
    console.log("Navigate to MyTasks page to reject Sub Program task");
    await homePage.navigateToTasks();
    await tasksPage.assignTaskToMe(subProgram[1]);
    var confirmMsg =global.testConfig.taskDetails.confirmRejectSubProgramMsg;
    expect(await tasksPage.manageTask(Constants.SUB_PROGRAM, Constants.REJECT,subProgram[1],confirmMsg)).toBe(true);
    console.log("New Sub Program Rejected Successfully with id= " + subProgram[1]);
    });

});

/**
 * Test case: Create and Reject Benefits
 */
test.only("Create and Reject Benefits", async () => {
  // Step1: Create and approve stream ,Main Program , SubProgram and create New Benefit.
  await test.step("Create and approve stream ,Main Program , SubProgram and create New Benefit from API", async () => {
  stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
  mainProgram = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData, stream[0]);
  subProgram = await programs.createSubProgramAndApproveAPI(adminusername, adminpassword, subProgramsData, mainProgram[0]);
  Benefit = await programs.createBenefitAPI(adminusername, adminpassword, benefitsData,subProgram[0]) 
  expect(Benefit).not.toBeNull(); 
  });

  // Step2: Reject New Main Program
  await test.step("Reject Benefit Task", async () => {
    console.log("Navigate to MyTasks page to reject Main Program task");
    await homePage.navigateToTasks();
    await tasksPage.assignTaskToMe(Benefit[1]);
    var confirmMsg = global.testConfig.taskDetails.confirmRejectBenefitMsg;
    var taskManage =await tasksPage.manageTask(Constants.BENEFIT, Constants.REJECT,Benefit[1],confirmMsg);
    expect(taskManage).toBe(true);
    console.log("New Benefit Rejected Successfully with id= " + Benefit[1]);
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
