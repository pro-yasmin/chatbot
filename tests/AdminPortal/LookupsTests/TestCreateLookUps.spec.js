const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../src/Pages/AdminPortal/LoginPage');
const { HomePage } = require('../../src/Pages/AdminPortal/HomePage');
const { LookupsManagmentPage }= require('../../src/Pages/AdminPortal/Lookups/LookupsManagmentPage');
const { LookupPage }= require('../../src/Pages/AdminPortal/Lookups/LookupPage');
const { LookupData }= require('../../src/Models/AdminPortal/LookupData');



let loginPage;
let homePage;
let lookupsManagmentPage;
let lookupPage;
let lookupData;


test('Create New Lookup', async ({ page }) => {

    loginPage = new LoginPage(page);
    homePage= new HomePage(page);
    lookupsManagmentPage = new LookupsManagmentPage(page);
    lookupPage = new LookupPage(page);
    lookupData = new LookupData(page); 


    var baseUrl = global.testConfig.BASE_URL;
    var adminusername = global.testConfig.ADMIN_USER;
    var adminpassword = global.testConfig.ADMIN_PASS;

    await loginPage.gotoAdminPortal(baseUrl);
    var loginSuccess = await loginPage.login(adminusername, adminpassword);
    expect(loginSuccess).toBe(true);
    console.log('login done successfully');
    await homePage.navigateToLookupsManagment();
    console.log('Navigate to LookUps Managment page');
    await lookupsManagmentPage.clickAddButton();
    await lookupPage.createNewLookup(lookupData);
    console.log('New lookup Created Successfully');
    await lookupsManagmentPage.checkNewLookupAdded(lookupData);
    console.log('New lookup Details Checked Successfully');
    await homePage.logout();
});