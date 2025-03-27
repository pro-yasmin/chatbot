var { expect } = require('@playwright/test');
var { LoginService } = require('../Services/LoginService');
var { FieldsService } = require('../Services/FieldsService');
var { FieldRequestsService } = require('../Services/FieldRequestsService');
var { TasksService } = require('../Services/TasksService');
import Constants from '../../Utils/Constants';




/**
 * Manages the creation and approval of fields requests,
 * This class interacts with various services to handle these operations.
 * @class
 */
export class FieldRequests {

    constructor() {
      
        this.baseUrl = global.testConfig.BASE_URL_API;   }


  /**
   * Retrieves an authentication token and initializes services.
   * @param {string} username - The  username.
   * @param {string} password - The  password.
   * @returns {Promise<void>} - Completes token retrieval and service initialization.
   */
  async getToken(username, password) {

    var tokenUrl = global.testConfig.GENERATE_TOKEN_URL_PORTAL;
    var loginService = new LoginService(tokenUrl);
    var token = await loginService.loginAdminPortal(username, password);
    expect(token).not.toBeNull(); 
    return this.token = token;
  }


/**
 * Creates a new Field using API and retrieves its ID and it's request ID.
 * @param {string} username - The admin username.
 * @param {string} password - The admin password.
 * @param {object} fieldData - Data for creating the field.
 * @returns {Promise<[string, string]>} - The field ID and fieldRequest ID.
 */
async createField(username, password,fieldData) 
{ 
  var fieldResult = [];
  var token = await this.getToken(username, password);
  var fieldsService =new FieldsService(token,this.baseUrl);
  var fieldResult = await fieldsService.createFieldAPI(fieldData);
  expect(fieldResult).not.toBeNull();
  fieldResult.push(token);
  return fieldResult;
}

 /**
   * Creates and approves a FieldRequest with fields.
   * @param {string} username - The  username.
   * @param {string} password - The  password.
   * @param {object} fieldRequestData - Data for creating the request including fields.
   * @returns {object} -fieldRequestData 
   */
 async createFieldRequestAPI(username, password,fieldRequestData) {
  var fields =fieldRequestData.getFields();
  var fieldsIds =[];
  var fieldRequestId,fieldResult,fieldRequestNumber;
  var token = await this.getToken(username, password);
  var fieldsService =new FieldsService(token,this.baseUrl);
  //step 1: create  first  field and return field ID & field Request Id
 fieldResult= await fieldsService.createFieldAPI(fields[0]);
  expect(fieldResult).not.toBeNull();
  fieldsIds.push(fieldResult[0]);
  fieldRequestId=fieldResult[1];
  fieldRequestData.setRequestId(fieldRequestId);

  if(fields.length>1){
  //step2 : create other  child fields
  for (let i = 1; fields.length; i++) {
    fields[i].setRequestId(fieldRequestId);
    fieldResult=await fieldsService.createFieldAPI(fields[i]);
    fieldsIds.push(fieldResult[0]);
    }
  }

 
   //step 3: send Request for approval  
   var fieldsRequestsService =new FieldRequestsService(token);
  fieldRequestNumber= await fieldsRequestsService.updateFieldRequestAPI(fieldRequestData,Constants.SUBMIT_FIELDS_REQUESTS_API);
  expect(fieldRequestNumber).not.toBeNull();

  //step4: Assign Request on myself 
  await new Promise((resolve) => setTimeout(resolve, 15000));
  var tasksService = new TasksService(token);
  var searchNumber = await tasksService.getTaskID(fieldRequestNumber);
  expect(searchNumber).not.toBeNull(); 
  var assign = await tasksService.assignTask(searchNumber);
  expect(assign).not.toBeNull(); 
 //step 5: take  approve decision on all fields
  var fieldAccepted;
  for (let i = 0; i < fieldsIds.length; i++) {
    fieldAccepted=await fieldsService.approveRejectFieldAPI(fieldsIds[i],Constants.APPROVE_FIELD_API);
    expect(fieldAccepted).toBe(true);
  }
 
  //step6: complete Request 
  await new Promise((resolve) => setTimeout(resolve, 10000));
  fieldRequestNumber= await fieldsRequestsService.updateFieldRequestAPI(fieldRequestData,Constants.COMPLETE_FIELDS_REQUESTS_API);
  expect(fieldRequestNumber).not.toBeNull();
  return fieldRequestData;
 }

 


 
}
