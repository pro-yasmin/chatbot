const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../src/Pages/AdminPortal/LoginPage');
const { HomePage } = require('../../../src/Pages/AdminPortal/HomePage');
const { MainProgramManagementPage } = require('../../../src/Pages/AdminPortal/ProgramsManagement/MainProgramManagement/MainProgramManagementPage');
const { TaskDetailsPage } = require('../../../src/Pages/AdminPortal/Tasks/TaskDetailsPage');
const { TasksPage } = require('../../../src/Pages/AdminPortal/Tasks/TasksPage');
const { SubProgramsManagementPage } = require('../../../src/Pages/AdminPortal/ProgramsManagement/SubProgramsManagement/SubProgramsManagmentPage');
const { SubProgramsPage } = require('../../../src/Pages/AdminPortal/ProgramsManagement/SubProgramsManagement/SubProgramsPage');
const { SubProgramsData } = require('../../../src/Models/AdminPortal/SubProgramsData');
const { BenefitsPage } = require('../../../src/Pages/AdminPortal/ProgramsManagement/BenefitsManagement/BenefitsPage');
const { BenefitsManagmentPage } = require('../../../src/Pages/AdminPortal/ProgramsManagement/BenefitsManagement/BenefitsManagementPage');
const { BenefitsData } = require('../../../src/Models/AdminPortal/BenefitsData');

let loginPage;
let homePage;
let subProgramsPage;
let mainProgramManagementPage;
let tasksPage;
let taskDetailsPage;
let subProgramsManagementPage ;
let subProgramsData;
let benefitsPage;
let benefitsManagmentPage;
let benefitsData;


test('Add and Approve Test Benefits', async ({ page }) => {

    loginPage = new LoginPage(page);
    homePage= new HomePage(page);
    mainProgramManagementPage=new MainProgramManagementPage(page);
    subProgramsManagementPage=new SubProgramsManagementPage(page);
    subProgramsPage = new SubProgramsPage(page);
    subProgramsData = new SubProgramsData(page); 
    tasksPage = new TasksPage(page); 
    taskDetailsPage = new TaskDetailsPage(page);
    benefitsPage = new BenefitsPage(page);
    benefitsManagmentPage = new BenefitsManagmentPage(page);
    benefitsData = new BenefitsData(page); 


    var baseUrl = global.testConfig.BASE_URL;
    var adminusername = global.testConfig.ADMIN_USER;
    var adminpassword = global.testConfig.ADMIN_PASS;

    await loginPage.gotoAdminPortal(baseUrl);
    var loginSuccess = await loginPage.login(adminusername, adminpassword);
    expect(loginSuccess).toBe(true);
    console.log('login done successfully');
    console.log('Navigate to SubPrograms page');
    await homePage.navigateToSubProgramsManagement();
    console.log('Click on Define New Benefit');
    await subProgramsManagementPage.clickOnCreateBenefit('PRG_SPRG_015');//Uat
    var result = await benefitsPage.createNewBenefits(benefitsData);
    expect(result).toBe(true);  
    console.log('New Benefits Created Successfully');
    console.log('Search on Benefits');
    expect( await benefitsManagmentPage.checkBenefitsRowDetails(benefitsData)).toBe(true);    
    console.log('New Benefits Details Checked Successfully');
    console.log('Navigate to MyTasks page to approve Benefit Request');
    await homePage.navigateToTasks();
    await tasksPage.assignTaskToMe();
    await tasksPage.navigateToMyCompletedTasksTab();
    expect( await tasksPage.approveBenefits()).toBe(true); 
    console.log('New Benefit Approved Successfully');
    await homePage.logout();
});