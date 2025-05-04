const { test, expect } = require('@playwright/test');

import Constants from './src/Utils/Constants.js';

const { StreamData } = require('./src/Models/AdminPortal/StreamData.js');
const { MainProgramData } = require('./src/Models/AdminPortal/MainProgramData.js');
const { SubProgramsData } = require('./src/Models/AdminPortal/SubProgramsData.js');
const { Programs } = require("./src/Apis/Business/Programs.js");
const { BenefitsData } = require('./src/Models/AdminPortal/BenefitsData.js');
const { Simulation } = require("./src/Apis/Business/Simulation.js");
const { SimulationModelData } = require("./src/Models/OperationPortal/SimulationModelData.js");
const { FieldRequests } = require("./src/Apis/Business/FieldRequests.js");
const { FieldRequestData } = require("./src/Models/AdminPortal/FieldRequestData.js");
const { FieldData } = require("./src/Models/AdminPortal/FieldData.js");

let stream,streamData;
let mainProgram, mainProgramData;
let subProgram, subProgramData;
let programs ;
let createBenefit ,createApproveBenefit , benefitsData;
let adminusername ,adminpassword;
let simulation,simulationData;
let complexFieldData,groupFieldData,inputFieldData,fieldRequestData,fieldRequests;


test.beforeEach(async () => {

  adminusername = global.testConfig.ADMIN_USER;
  adminpassword = global.testConfig.ADMIN_PASS;

  streamData = new StreamData();
  mainProgramData = new MainProgramData();
  subProgramData = new SubProgramsData();
  benefitsData = new BenefitsData();
  programs = new Programs();
  simulation = new Simulation();
  fieldRequests=new FieldRequests();
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

  test.only('API Test - Create Benefit', async () => {
  
    stream = await programs.createStreamAndApproveAPI(adminusername, adminpassword, streamData) 
    console.log('Stream', stream);
    mainProgram = await programs.createMainProgramAndApproveAPI(adminusername, adminpassword, mainProgramData, stream[0]);
    console.log('mainProgram', mainProgram);
    subProgram = await programs.createSubProgramAndApproveAPI(adminusername, adminpassword, subProgramData, mainProgram[0]);
    console.log('subProgram', subProgram);
    // createBenefit = await programs.createBenefitAPI(adminusername, adminpassword, benefitsData,subProgram[0]) 
    // expect(createBenefit).not.toBeNull();

    createApproveBenefit = await programs.createBenefitAndApproveAPI(adminusername, adminpassword, benefitsData,subProgram[0]);
    console.log('Benefit', createApproveBenefit);
    expect(createApproveBenefit).not.toBeNull();

    

   });

   test('API Test -Create & Approve simulation model', async () => {
    simulationData= new SimulationModelData();
    await simulation.createsimulationModelAndApproveAPI(adminusername, adminpassword,simulationData) ;
    console.log('Simulation Model ID = ' + simulationData.getCreatedSimulationModelId());
   });

   test('API Test -Create & Approve field Request', async ({context}) => {
    var fields =[];
    //create & approve input field
    inputFieldData= new FieldData();
    inputFieldData.setFieldType(Constants.INPUT_FIELD);
    inputFieldData.setInputSource(Constants.API_Input_Source_Input);
    fields.push(inputFieldData);
    fieldRequestData=new FieldRequestData();
    fieldRequestData.setFields(fields);
    await fieldRequests.createFieldRequestAPI(adminusername, adminpassword,fieldRequestData)
 
     //create & approve complex  field with input child field 
     /*complexFieldData=new FieldData();
     complexFieldData.setFieldType(Constants.COMPLEX_FIELD);
     inputFieldData= new FieldData();
     inputFieldData.setFieldType(Constants.INPUT_FIELD);
     inputFieldData.setParentKey(complexFieldData.getEnglishFieldName());
     fields.push(complexFieldData);
     fields.push(inputFieldData);
     fieldRequestData=new FieldRequestData();
     fieldRequestData.setFields(fields);
     await fieldRequests.createFieldRequestAPI(adminusername, adminpassword,fieldRequestData)
*/
   });

   