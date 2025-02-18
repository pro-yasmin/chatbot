const { test, expect } = require('@playwright/test');
const { StreamData } = require('../src/Models/AdminPortal/StreamData');
const { MainProgramData } = require('../src/Models/AdminPortal/MainProgramData');
const { SubProgramsData } = require('../src/Models/AdminPortal/SubProgramsData');
const { Programs } = require("../src/Apis/Business/Programs");
const { BenefitsData } = require('../src/Models/AdminPortal/BenefitsData');


let stream,streamData;
let mainProgram, mainProgramData;
let subProgram, subProgramData;
let programs ;
let createBenefit ,createApproveBenefit , benefitsData;
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

  test('API Test - Create stream', async () => {
  
   var teststream = await programs.createStreamAPI(adminusername, adminpassword, streamData) 
    expect(teststream).not.toBeNull();
    console.log('Stream', teststream);
  });


  test('API Test - Create Main Program', async () => {

  stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
  mainProgram = await programs.createMainProgramAPI(adminusername, adminpassword, mainProgramData, stream[0]);
  expect(mainProgram).not.toBeNull();

  });

  test('API Test - Create Sub Program', async () => {

    stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
    mainProgram = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData, stream[0]);
    subProgram = await programs.createSubProgramAPI(adminusername, adminpassword, subProgramData, mainProgram[0]);
    expect(subProgram).not.toBeNull();

  });

  
  test('API Test - Create sub Program', async () => {
    stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
    mainProgram = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData, stream[0]);
    subProgram = await programs.createSubProgramAndApproveAPI(adminusername, adminpassword, subProgramData, mainProgram[0]);
    expect(subProgram).not.toBeNull();
    
  });

  test('API Test - Create Benefit', async () => {
  
    stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
    console.log('Stream', stream);
    mainProgram = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData, stream[0]);
    console.log('mainProgram', mainProgram);
    subProgram = await programs.createSubProgramAndApproveAPI(adminusername, adminpassword, subProgramData, mainProgram[0]);
    console.log('subProgram', subProgram);
    createBenefit = await programs.createBenefitAPI(adminusername, adminpassword, benefitsData,subProgram[0]) 
    expect(createBenefit).not.toBeNull();
    console.log('Benefit', createBenefit);

    // createApproveBenefit = await programs.createBenefitAndApproveAPI(adminusername, adminpassword, benefitsData,subProgram[0]);
    // console.log('Benefit', createApproveBenefit);

   });

   