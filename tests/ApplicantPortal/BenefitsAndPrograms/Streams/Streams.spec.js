import { test, expect } from '../../../fixtures.js';

const { ApplicantLoginPage } = require('../../../../src/Pages/ApplicantPortal/ApplicantLoginPage');
const { LiferayLoginPage } = require('../../../../src/Pages/Liferay/LiferayLoginPage');
const { ApplicantStreamsPage} = require("../../../../src/Pages/ApplicantPortal/ProgramsManagement/Streams/ApplicantStreamsPage.js");
const { LiferayStreamsPage} = require("../../../../src/Pages/Liferay/Streams/LiferayStreamsPage");

const { StreamData } = require("../../../../src/Models/AdminPortal/StreamData");
const { Programs } = require("../../../../src/Apis/Business/Programs");

let context , page;
let liferayUsername, liferaypassword , liferayLoginPage;
let applicantStreamsURL ,applicantStreamsPage ,liferayStreamsURL , liferayStreamsPage;
let streamArName ,streamEnName; 
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
    liferayLoginPage  = new LiferayLoginPage(page); 
    applicantStreamsPage = new ApplicantStreamsPage(page);
    liferayStreamsPage = new LiferayStreamsPage(page);

    streamData = new StreamData();
    programs = new Programs();
    
    applicantStreamsURL = global.testConfig.APPLICANT_STREAMS_URL;
    liferayStreamsURL = global.testConfig.LIFERAY_STREAMS_URL

    adminusername = global.testConfig.ADMIN_USER;
    adminpassword = global.testConfig.ADMIN_PASS;

    liferayUsername = global.testConfig.LIFERAY_USER;
    liferaypassword = global.testConfig.LIFERAY_PASS;

});

test('Streams in Applicant Portal', async () => {
  
    // Step1: Create And Appove Stream From API 
      await test.step("Create And Appove Stream From API", async () => {
      var streamNumber = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
      streamArName = streamData.getstreamArabicName();
      streamEnName = streamData.getstreamEnglishName();
      expect(streamNumber).not.toBeNull();
      console.log('API Stream', streamNumber);
      console.log('API Stream', streamArName);
      console.log('API Stream', streamEnName);
      });

    // // Step2: Open Streams Page in Applicant Portal
    //   await test.step("Login to Streams Page in Applicant Portal", async () => {
    //     var stramNavigation = await applicantLoginPage.gotoApplicantStreams(applicantStreamsURL);
    //     expect(stramNavigation).toBe(true);
    //     console.log("Applicant Streams Page open Successfully");
    //   });
  
    //   // Step3: Open Stream Detials Page in Applicant Portal
    //   await test.step("Open Stream Detials Page in Applicant Portal", async () => {

    //     var streamrow = await streamsPage.openStreamDetials(streamArName);
    //     await page.waitForTimeout(6000); 

    //     // var result = await streamManagementPage.createStream(streamData);
    //     // expect(result).toBe(true);
    //     // console.log("New Stream Created Successfully");
    //   });

      // Step4: Open Streams Page in Liferay
      await test.step("Login to Streams Page in Liferay", async () => {
        var stramNavigation = await liferayLoginPage.gotoLiferayStreams(liferayStreamsURL , liferayUsername, liferaypassword);
        expect(stramNavigation).toBe(true);
        console.log("Liferay Streams Page open Successfully");
      });

        // Step3: Open Stream Detials Page in Liferay
      await test.step("Open Stream Detials Page in Liferay", async () => {

        var openStream = await liferayStreamsPage.openStreamDetials(streamEnName);
        expect(openStream).toBe(true);
        await page.waitForTimeout(6000); 
        var addStreamImages = await liferayStreamsPage.addStreamImages(streamEnName);
        expect(addStreamImages).toBe(true);
        await page.waitForTimeout(6000); 
        // var result = await streamManagementPage.createStream(streamData);
        // expect(result).toBe(true);
        // console.log("New Stream Created Successfully");
      });

  // // Step4: Search on new stream created
  // await test.step("Search on Stream", async () => {
  //   console.log("Search on Stream");
  //   expect(await streamManagementPage.checkStreamRowDetails(streamData)).toBe(true);
  //   streamNumber = streamData.getCreatedStreamId();
  //   console.log("New Stream Details Checked Successfully");
  //   await homePage.logout();
  //   console.log("Logout  from admin portal");
  // });


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
  });
  
  
