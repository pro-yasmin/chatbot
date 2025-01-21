const { test, expect } = require('@playwright/test');
const {StreamData} = require('../../../src/Models/AdminPortal/StreamData');
const {MainProgramData} = require('../../../src/Models/AdminPortal/MainProgramData');
const {SubProgramsData} = require('../../../src/Models/AdminPortal/SubProgramsData');
const {Programs} = require('../../../src/Apis/Business/Programs');
const {BenefitsData} = require('../../../src/Models/AdminPortal/BenefitsData');


let stream,streamData;
let mainProgram1, mainProgram2, mainProgramData;
let subProgram1, subProgram2, subProgramData;
let programs ;
let Benefit1, Benefit2, benefitsData;
let adminusername ,adminpassword;


test.beforeEach(async () => {

  adminusername = global.testConfig.ADMIN_USER;
  adminpassword = global.testConfig.ADMIN_PASS;

  streamData = new StreamData();
  mainProgramData = new MainProgramData();
  subProgramData = new SubProgramsData();
  benefitsData = new BenefitsData();
  programs = new Programs();


});

  test('API Test - Create Benefit', async () => {
  
    stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData);
    console.log('Stream:', stream);

    mainProgram1 = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData, stream[0]);
    console.log('Main Program 1:', mainProgram1);

    mainProgram2 = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData, stream[0]);
    console.log('Main Program 2:', mainProgram2);

    subProgram1 = await programs.createSubProgramAndApproveAPI(adminusername, adminpassword, subProgramData, mainProgram1[0]);
    console.log('Sub Program 1:', subProgram1);

    subProgram2 = await programs.createSubProgramAndApproveAPI(adminusername, adminpassword, subProgramData, mainProgram1[0]);
    console.log('Sub Program 2:', subProgram2);

    Benefit1 = await programs.createBenefitAndApproveAPI(adminusername, adminpassword, benefitsData, subProgram1[0]);
    console.log('Benefit 1:', Benefit1);

    Benefit2 = await programs.createBenefitAndApproveAPI(adminusername, adminpassword, benefitsData, subProgram1[0]);
    console.log('Benefit 2:', Benefit2);

   });
