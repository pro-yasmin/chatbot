const { test, expect } = require("@playwright/test");
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

let loginPage,homePage,adminusername ,adminpassword , programs;
let streamManagementPage,streamData,streamDetailsPage;
let mainProgramPage, mainProgramManagementPage, mainProgramData ,mainProgramDetailsPage;
let subProgramsManagementPage, subProgramsData, subProgramsPage,subProgramDetailsPage;
let benefitsPage, benefitsManagmentPage, benefitsData;
let streamNumber, mainProgramNumber, subProgramNumber, benefitNumber ;
let mainProgramTask , subProgramTask,benefitTask;


/**
 * Test setup: Initializes all required page objects and logs into the admin portal.
 */
test.beforeEach(async ({ page }) => {

  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  streamManagementPage = new StreamManagementPage(page);
  streamData = new StreamData();
  streamDetailsPage = new StreamDetailsPage(page);
  mainProgramPage = new MainProgramPage(page);
  mainProgramManagementPage = new MainProgramManagementPage(page);
  mainProgramData = new MainProgramData();
  mainProgramDetailsPage= new  MainProgramDetailsPage(page);
  subProgramsManagementPage = new SubProgramsManagementPage(page);
  subProgramsPage = new SubProgramsPage(page);
  subProgramsData = new SubProgramsData();
  subProgramDetailsPage= new SubProgramDetailsPage(page);
  benefitsPage = new BenefitsPage(page);
  benefitsManagmentPage = new BenefitsManagmentPage(page);
  benefitsData = new BenefitsData();
  programs = new Programs();

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
 * Test case: Add Inside a new main program.
*/
test.only("Add Inside New Main Program", async () => {
      // Step1: Create And Appove Stream From API
      await test.step("Create And Appove Stream From API", async () => {
      streamNumber = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
      expect(streamNumber).not.toBeNull();
      console.log('API Stream', streamNumber);
      });

      // Step2: Navigate to Stream list page
      await test.step("Navigate to StreamManagement page", async () => {
      await homePage.navigateToStreamsManagement();
      console.log("Click on Define New Main Program from Stream Details Page.");
      await streamManagementPage.openViewStreamDetailsPage(streamNumber[1]);
      await streamDetailsPage.InsideCreateMainProgram();

      });

      // Step3: Create Inside New Main Program from Stream Details Page.
      await test.step("Create Inside New Program Task", async () => {
      console.log("Main Program Creation Page Opened Successfully.");
      var mainProgramresult = await mainProgramPage.createNewMainProgram(mainProgramData);
      expect(mainProgramresult).toBe(true);
      console.log("New Inside Main Program Created Successfully");
      });

    // Step4: Search on new Main Program
      await test.step("Search on Main program created", async () => {
        console.log("Search on Main Program created");
        expect(await mainProgramManagementPage.checkMainProgramRowDetails( mainProgramData) ).toBe(true);
        mainProgramNumber = mainProgramData.getCreatedMainProgramId();
        console.log("New Main Program Details Checked Successfully");
      });

      // Step5: Approve the created Main Program.
      await test.step("Approve Created Main Program Task", async () => {
      console.log("Approve Created Main Program");
      mainProgramTask = await programs.approveTaskAPI(adminusername, adminpassword,mainProgramNumber); 
      expect(mainProgramTask).not.toBeNull(); 
      console.log("New Inside Main Program Created Successfully");
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
