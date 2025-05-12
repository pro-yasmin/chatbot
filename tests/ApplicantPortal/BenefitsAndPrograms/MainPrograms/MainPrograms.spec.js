import { test, expect } from '../../../fixtures.js';

const { ApplicantLoginPage } = require('../../../../src/Pages/ApplicantPortal/ApplicantLoginPage');
const { MainProgramsPage } = require("../../../../src/Pages/ApplicantPortal/ProgramsManagement/MainPrograms/MainProgramsPage");
// const { MainProgramDetailsPage } = require("../../../../src/Pages/ApplicantPortal/ProgramsManagement/MainPrograms/MainProgramDetailsPage");

const { StreamData } = require("../../../../src/Models/AdminPortal/StreamData");
const { MainProgramData } = require("../../../../src/Models/AdminPortal/MainProgramData");
const { Programs } = require("../../../../src/Apis/Business/Programs");

let context, page;
let mainProgramsURL, mainProgramsPage, mainProgramDetailsPage;
let mainProgramArName, mainProgramEnName;
let applicantLoginPage;
let adminusername, adminpassword;
let mainProgramData, programs ,streamData;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();

  applicantLoginPage = new ApplicantLoginPage(page);
  mainProgramsPage = new MainProgramsPage(page);
  // mainProgramDetailsPage = new MainProgramDetailsPage(page);

  mainProgramData = new MainProgramData();
  streamData = new StreamData();
  programs = new Programs();

  mainProgramsURL = global.testConfig.APPLICANT_MAIN_PROGRAMS_URL;
  adminusername = global.testConfig.ADMIN_USER;
  adminpassword = global.testConfig.ADMIN_PASS;
});

test('Add and Approve New Main Program with API in Admin Portal', async () => {
  // Step1: Create and Approve Main Program via API
  await test.step("Create And Approve Main Program From API", async () => {
    var streamNumber = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
    var mainProgramNumber = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData, streamNumber[0]);   
    mainProgramArName = mainProgramData.getArabicMainProgramName();
    mainProgramEnName = mainProgramData.getEnglishMainProgramName();
    expect(mainProgramNumber).not.toBeNull();
    console.log('API Main Program:', mainProgramNumber);
    console.log('Arabic Name:', mainProgramArName);
    console.log('English Name:', mainProgramEnName);
  });

  // Step2: Open Main Programs Page in Applicant Portal
  await test.step("Login to Main Programs Page in Applicant Portal", async () => {
    const navigationSuccess = await applicantLoginPage.gotoApplicantMainPrograms(mainProgramsURL);
    expect(navigationSuccess).toBe(true);
    console.log("Applicant Main Programs Page opened successfully");
  });

  // Step3: Open Main Program Details Page
  await test.step("Open Main Program Details Page", async () => {
    const programRow = await mainProgramsPage.openMainProgramDetails(mainProgramArName);
    expect(programRow).toBe(true);
    await page.waitForTimeout(6000);
  });
});