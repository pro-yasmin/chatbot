const { test, expect } = require("@playwright/test");

const { ApplicantLoginPage } = require('../../../src/Pages/ApplicantPortal/ApplicantLoginPage');
const { StreamsPage} = require("../../../src/Pages/ApplicantPortal/ProgramsManagement/Streams/StreamsPage");
const { StreamDetailsPage } = require("../../../src/Pages/ApplicantPortal/ProgramsManagement/Streams/StreamDetailsPage");

const { StreamData } = require("../../../src/Models/AdminPortal/StreamData");
const { Programs } = require("../../../src/Apis/Business/Programs");

let context , page;
let streamsPage,streamDetailsPage;
let applicantLoginPage ;
let adminusername ,adminpassword ;
let streamData , programs;


/**
 * Test setup: Initializes all required page objects and logs into the applicant portal.
 */
test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    applicantLoginPage  = new ApplicantLoginPage(page); 
    streamsPage = new StreamsPage(page);
    streamDetailsPage = new StreamDetailsPage(page);

    streamData = new StreamData();
    programs = new Programs();
    
    var streamsURL = global.testConfig.APPLICANT_STREAMS_URL;

    adminusername = global.testConfig.ADMIN_USER;
    adminpassword = global.testConfig.ADMIN_PASS;

  await test.step("Login to Streams Page in Applicant Portal", async () => {
    var stramNavigation = await applicantLoginPage.gotoApplicantStreams(streamsURL);
    expect(stramNavigation).toBe(true);
    console.log("Apllicant Streams Page open Successfully");
  });
});

test('Add and Approve New Stream with API in Admin Portal', async () => {
  
    // Step1: Create And Appove Stream From API 
      await test.step("Create And Appove Stream From API", async () => {
      var streamNumber = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
      expect(streamNumber).not.toBeNull();
      console.log('API Stream', streamNumber);
      });
  });
  
//   // Step2: Create New stream
//   await test.step("Create New Stream Task", async () => {
//     console.log("Navigate to Create Streams page");
//     var result = await streamManagementPage.createStream(streamData);
//     expect(result).toBe(true);
//     console.log("New Stream Created Successfully");
//   });
//   // Step3: Search on new stream created
//   await test.step("Search on Stream", async () => {
//     console.log("Search on Stream");
//     expect(await streamManagementPage.checkStreamRowDetails(streamData)).toBe(true);
//     streamNumber = streamData.getCreatedStreamId();
//     console.log("New Stream Details Checked Successfully");
//     await homePage.logout();
//     console.log("Logout  from admin portal");
//   });
//   // Step4: Approve new created
//   await test.step("Approve Stream Task", async () => {
//     var loginSuccess = await loginPage.login(adminusername, adminpassword);
//     expect(loginSuccess).toBe(true);
//     console.log("login to admin portal by admin user");
//     console.log("Navigate to MyTasks page to approve stream Request");
//     await homePage.navigateToTasks();
//     await tasksPage.assignTaskToMe(streamNumber);
//     var confirmMsg = global.testConfig.taskDetails.confirmStreamMsg
//     var taskManage =await tasksPage.manageTask(Constants.STREAM, Constants.APPROVE,streamNumber,confirmMsg);
//     expect(taskManage).toBe(true);
//     console.log("New Stream Approved Successfully with id= " + streamNumber);
//   });
  
