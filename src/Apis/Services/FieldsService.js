const { request } = require("@playwright/test");


/**
 * Service class to manage fields through API endpoints, including creating fields
 * and retrieving their details.
 * @class
 */
export class FieldsService {
  constructor(token) {
    this.baseUrl = global.testConfig.BASE_URL_API;
    this.fieldUrl = this.baseUrl + "/isr/fieldManagement/v1/fields";
    this.token = "Bearer " + token;
  }

    /**
   * Creates a new field using the provided data.
   * @param {object} fieldBody - The data object containing field details.
   * @returns {Promise<string|null>} - Returns the ids of the field, ISR request ID.
   */
  async createFieldAPI(fieldBody) {
    let fieldId,requestId;
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });

    // Prepare the payload for the request
    var jsonPayload = fieldBody.toJSON();    

    // Send the POST request to create the benefit
    var response = await requestContext.post(this.fieldUrl, {
      headers: { "Content-Type": "application/json",Accept: "application/json",Authorization: this.token },
      data: JSON.stringify(jsonPayload), 
      timeout: 30000,
    });

    var responseBody = await response.json();
    if (response.ok()) {
      fieldId = responseBody.result.fieldId;
      requestId=responseBody.result.requestId;
    // Retrieve the field ID & request Id of the created field
      console.log("Field Id is :", fieldId);
      console.log("Request Id is :", requestId);
    } else {
          // Log errors if the creation fails
          var errorBody = await response.text();
          console.error("Error Response Body:", errorBody);
          console.error("Failed to create Field:",response.status(),response.statusText());
           }

    await requestContext.dispose();
    return [fieldId,requestId];
  }


  
  /**
   * Approve /reject  a new field using the provided data.
   * @param {number} fieldId - The field Id.
   * @param {Boolean} approveRejectField - "ACCEPT_FIELD" or "REJECT_FIELD"
   * @returns {Boolean} - Returns true if success or false if fails.
   */
  async approveRejectFieldAPI(fieldId,approveRejectField) {
    let fieldApprovedRejected;
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });
    // Prepare the payload for the request
    var jsonPayload = {"action":approveRejectField};   
    // Send the POST request to create the benefit
    var url=this.fieldUrl+"/"+fieldId+"/decision";
    var response = await requestContext.put(url, {
      headers: { "Content-Type": "application/json",Accept: "application/json",Authorization: this.token },
      data: JSON.stringify(jsonPayload), 
      timeout: 30000,
    });
    var responseBody = await response.json();
    if (response.ok()) {
     fieldApprovedRejected=true;
    } else {
          // Log errors if the creation fails
          var errorBody = await response.text();
          console.error("Error Response Body:", errorBody);
          console.error("Failed to Approve/Reject Field:",response.status(),response.statusText());
          fieldApprovedRejected=false;
           }

    await requestContext.dispose();
    return fieldApprovedRejected;
  }

   /**
   *activate /deactivate  a new field using the provided data.
   * @param {number} fieldId - The field Id.
   * @param {Boolean} activateDeactivateField - true or false.
   * @returns {Boolean} - Returns true if success or false if fails.
   */
   async aactivateDeactivateFieldAPI(fieldId,activateDeactivateField) {
    let fieldUpdated;
    var requestContext = await request.newContext({ ignoreHTTPSErrors: true });

    // Prepare the payload for the request
    
    var jsonPayload = {"activation":activateDeactivateField};    

    // Send the POST request to create the benefit
    var response = await requestContext.patch(this.fieldUrl+"/"+fieldId, {
      headers: { "Content-Type": "application/json",Accept: "application/json",Authorization: this.token },
      data: JSON.stringify(jsonPayload), 
      timeout: 30000,
    });

    if (response.ok()) {
      fieldUpdated=true;
    } else {
          // Log errors if the creation fails
          var errorBody = await response.text();
          console.error("Error Response Body:", errorBody);
          console.error("Failed to Activate/Deactivate Field:",response.status(),response.statusText());
          fieldUpdated=false;
           }

    await requestContext.dispose();
    return fieldUpdated;
  }


  
}
