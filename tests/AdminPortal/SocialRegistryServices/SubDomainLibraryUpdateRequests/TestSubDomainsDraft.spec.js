const { test, expect } = require('@playwright/test');
import Constants from '../../../../src/Utils/Constants';

const { LoginPage } = require('../../../../src/Pages/LoginPage');
const { HomePage } = require('../../../../src/Pages/AdminPortal/HomePage');
const {ManageSubDomainUpdateRequestsPage} = require('../../../../src/Pages/AdminPortal/SubDomainLibraryUpdateRequest/ManageSubDomainUpdateRequestsPage');
const{SubDomainCreationPage} = require('../../../../src/Pages/AdminPortal/SubDomainLibraryUpdateRequest/SubDomainCreationPage');
const{SubDomainLibraryUpdateReqPage}= require('../../../../src/Pages/AdminPortal/SubDomainLibraryUpdateRequest/SubDomainLibraryUpdateReqPage');
const{SubDomainData} = require("../../../../src/Models/AdminPortal/SubDomainData");
const{SubDomainLibraryManagementPage} = require("../../../../src/Pages/AdminPortal/SubDomainLibrary/SubDomainLibraryManagementPage");

let loginPage,homePage,manageSubDomainUpdateRequestsPage,subDomainCreationPage,subDomainLibraryUpdateReqPage,subDomainLibraryManagementPage;
let subDomainData;
let RequestID;
let adminUsername, adminPassword;
let context;
let page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  manageSubDomainUpdateRequestsPage = new ManageSubDomainUpdateRequestsPage(page);
  subDomainCreationPage = new SubDomainCreationPage(page);
  subDomainLibraryUpdateReqPage = new SubDomainLibraryUpdateReqPage(page);
  subDomainData = new SubDomainData(page);
  subDomainLibraryManagementPage= new SubDomainLibraryManagementPage(page);

  
  

  const baseUrl = global.testConfig.BASE_URL;

  adminUsername = global.testConfig.ADMIN_USER;
  adminPassword = global.testConfig.ADMIN_PASS;
  
    await test.step("Login to Admin Portal", async () => {
      await loginPage.gotoAdminPortal(baseUrl);
      var loginSuccess = await loginPage.login(adminUsername, adminPassword);
      expect(loginSuccess).toBe(true);
  
      console.log("login done successfully");
    });
});

   test('Save SubDomain As Draft', async () => {
      // Step1: Navigate to SubDomain library update requests list page
     await test.step("Navigate to SubDomains library update request page", async () => {
        await homePage.navigateToSubDomainLibraryRequests();
        console.log("Navigate to Sub domains library update request page");
      });

      await test.step("Save SubDomain as draft", async () => {
        expect(await subDomainLibraryUpdateReqPage.saveSubDomainAsDraft(subDomainData)).toBe(true);
        console.log("Sub-Domain Saved as draft");
      });

      await test.step("Navigate to draft requests tab and edit", async () => {
        await subDomainLibraryUpdateReqPage.editDraftSubDomain(); 
    
        console.log("check subDomain draft data");
        expect(manageSubDomainUpdateRequestsPage.checkSubDomainDraftData(subDomainData)).toBe(true);

    
   });
    

    });
