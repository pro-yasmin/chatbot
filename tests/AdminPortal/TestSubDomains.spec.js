const { test, expect } = require('@playwright/test');
import Constants from '../../src/Utils/Constants';

const { LoginPage } = require('../../src/Pages/LoginPage');
const { HomePage } = require('../../src/Pages/AdminPortal/HomePage');
const {ManageSubDomainUpdateRequestsPage} = require('../../src/Pages/AdminPortal/SubDomainLibraryUpdateRequest/ManageSubDomainUpdateRequestsPage');
const{SubDomainCreationPage} = require('../../src/Pages/AdminPortal/SubDomainLibraryUpdateRequest/SubDomainCreationPage');
const{SubDomainLibraryUpdateReqPage}= require('../../src/Pages/AdminPortal/SubDomainLibraryUpdateRequest/SubDomainLibraryUpdateReqPage');
const{SubDomainData} = require("../../src/Models/AdminPortal/SubDomainData");


let loginPage,homePage,manageSubDomainUpdateRequestsPage,subDomainCreationPage,subDomainLibraryUpdateReqPage;
let subDomainData;
let RequestID, details;
let adminUsername, adminPassword;

test.beforeEach(async ({ page }) => {
  
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  manageSubDomainUpdateRequestsPage = new ManageSubDomainUpdateRequestsPage(page);
  subDomainCreationPage = new SubDomainCreationPage(page);
  subDomainLibraryUpdateReqPage = new SubDomainLibraryUpdateReqPage(page);
  subDomainData = new SubDomainData(page);
  

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

    test('Add Sub Domains', async () => {
      // Step1: Navigate to SubDomain library update requests list page
      await test.step("Navigate to SubDomains library update request page", async () => {
        await homePage.navigateToSubDomainLibraryRequests();
        console.log("Navigate to Sub domains library update request page");
      });

      await test.step("Create SubDomain request", async () => {
        RequestID= await subDomainLibraryUpdateReqPage.sendSubDomainRequest(subDomainData,2)
        expect(RequestID).not.toBeNull(); 
        console.log("Sub domain request submitted " + RequestID);
      });
    
      await test.step("check request status",async ()=> {
        var expectedRequestStatus = global.testConfig.createSubDomain.subDomainProcessingStatus;
        expect(await subDomainLibraryUpdateReqPage.checkSubDomainReqStatus(expectedRequestStatus,RequestID)).toBe(true);
        console.log("request Status processing");
    });

    await test.step("check request details",async ()=> {
      await subDomainLibraryUpdateReqPage.checkSubDomainRequestDetails(RequestID,)
  

    });
  });
