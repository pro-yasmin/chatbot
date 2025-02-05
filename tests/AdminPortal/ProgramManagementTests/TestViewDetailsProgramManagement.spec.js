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
let streamManagementPage,streamData,streamDetailsPage ,stream;
let mainProgramPage, mainProgramManagementPage, mainProgramData ,mainProgramDetailsPage , mainProgram;
let subProgramsManagementPage, subProgramsData, subProgramsPage,subProgramDetailsPage;
let benefitsPage, benefitsManagmentPage, benefitsData;
let streamNumber, mainProgramNumber, subProgramNumber, benefitNumber ;


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
  var deliveryManagerusername = global.testConfig.BUSINESS_DELIVERY_ADMIN;
  var deliveryManagerpassword = global.testConfig.BUSINESS_DELIVERY_ADMIN_PASS;

  adminusername = global.testConfig.ADMIN_USER;
  adminpassword = global.testConfig.ADMIN_PASS;

  await test.step("Login to Admin Portal", async () => {
  await loginPage.gotoAdminPortal(baseUrl);
  var loginSuccess = await loginPage.login(deliveryManagerusername, deliveryManagerpassword);
  expect(loginSuccess).toBe(true);
  console.log("login done successfully");
  });

});

/**
 * Test case: Check Created Stream Data Detials.
*/
test.only("Check Created Stream Data Detials", async () => {
      // Step1: Create And Appove Stream From API
      await test.step("Create And Appove Stream From API", async () => {
      streamNumber = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
      expect(streamNumber).not.toBeNull();
      console.log('API Stream', streamNumber);
      });

      // Step2: Navigate to Stream detials page
      await test.step("Navigate to StreamManagement page", async () => {
      await homePage.navigateToStreamsManagement();
      console.log("Click on View Stream Details Page.");
      await streamManagementPage.openViewStreamDetailsPage(streamNumber[1]);
      });

      // Step3: Compare UI Data with Expected Data
      await test.step("Compare Data with Expected Data", async () => {
      var streamMatch = await streamDetailsPage.compareStreamDetails(streamData , streamNumber[1]);
      if (streamMatch) {
        console.log("Stream details match successfully");} 
        else {
        console.log("Stream details do not match");}
      });
});


/**
 * Test case: Check Created Main Program Data Details.
 */
test.only("Check Created Main Program Data Details", async () => {

   // Step1: Create and approve stream and create New Main Program.
     await test.step("Create and Approve stream and create New Main Program from API", async () => {
        stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
        mainProgram = await programs.createMainProgramAPI(adminusername, adminpassword, mainProgramData, stream[0]);
        expect(mainProgram).not.toBeNull();
        console.log('API Main Program', mainProgram);
     });

       // Step2: Navigate to Main Program Details Page
       await test.step("Navigate to Main Program Details Page", async () => {
        await homePage.navigateToMainProgramManagement();
        console.log("Click on View Main Program Details Page.");
        await mainProgramManagementPage.openViewMainProgramDetailsPage(mainProgram[1]);
      });

       // Step3: Compare UI Data with Expected Data
       await test.step("Compare Data with Expected Data", async () => {
       var mainProgramMatch = await mainProgramDetailsPage.compareMainProgramDetails(mainProgramData , mainProgram[1]);
        if (mainProgramMatch) {
          console.log("Main Program details match successfully");} 
        else {
          console.log("Main Program details do not match");
        }
    });

});


/**
 * Test case: Check Created Sub Program Data Details.
 */
test("Check Created Sub Program Data Details", async () => {
  // Step1: Create And Approve Sub Program From API
  await test.step("Create And Approve Sub Program From API", async () => {
      subProgramNumber = await programs.createSubProgramAndApproveAPI(adminusername, adminpassword, subProgramsData, mainProgramNumber[0]);
      expect(subProgramNumber).not.toBeNull();
      console.log('API Sub Program', subProgramNumber);
  });

  // Step2: Navigate to Sub Program Details Page
  await test.step("Navigate to Sub Program Details Page", async () => {
      await homePage.navigateToSubProgramsManagement();
      console.log("Click on View Sub Program Details Page.");
      await subProgramsManagementPage.openViewSubProgramDetailsPage(subProgramNumber[1]);
  });

  // Step3: Compare UI Data with Expected Data
  await test.step("Compare Data with Expected Data", async () => {
      var subProgramMatch = await subProgramDetailsPage.compareSubProgramDetails(subProgramsData);
      if (subProgramMatch) {
          console.log("Sub Program details match successfully");
      } else {
          console.log("Sub Program details do not match");
      }
  });
});


/**
 * Test case: Check Created Benefits Data Details.
 */
test("Check Created Benefits Data Details", async () => {
  // Step1: Create And Approve Benefits From API
  await test.step("Create And Approve Benefits From API", async () => {
      benefitNumber = await programs.createBenefitAndApproveAPI(adminusername, adminpassword, benefitsData, subProgramNumber[0]);
      expect(benefitNumber).not.toBeNull();
      console.log('API Benefit', benefitNumber);
  });

  // Step2: Navigate to Benefits Details Page
  await test.step("Navigate to Benefits Details Page", async () => {
      await homePage.navigateToBenefitsManagement();
      console.log("Click on View Benefit Details Page.");
      await benefitsManagementPage.openViewBenefitDetailsPage(benefitNumber[1]);
  });

  // Step3: Compare UI Data with Expected Data
  await test.step("Compare Data with Expected Data", async () => {
      var benefitMatch = await benefitsDetailsPage.compareBenefitDetails(benefitsData);
      if (benefitMatch) {
          console.log("Benefit details match successfully");
      } else {
          console.log("Benefit details do not match");
      }
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
