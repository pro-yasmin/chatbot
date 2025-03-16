const { SearchPage } = require("../../AdminPortal/SharedPages/SearchPage.js");
const { FieldRequestsPage } = require("./FieldRequestsPage");
const { FieldRequestDetialsPage } = require("./FieldRequestDetialsPage");

export class FieldLibraryUpdateRequestsPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.fieldRequestsPage = new FieldRequestsPage(this.page);
        this.fieldRequestDetialsPage = new FieldRequestDetialsPage(this.page);
        
        this.fieldLibraryUpdateRequestButton = '//button[contains(text(),"طلب تحديث مكتبة الحقول")]';
        this.tableActions='table-actions';


    }

    async navigateToFieldRequestsPage() {
            await this.page.waitForTimeout(5000);
            await this.page.waitForSelector(this.fieldLibraryUpdateRequestButton, { state: "visible", timeout: 7000 });
            await this.page.click(this.fieldLibraryUpdateRequestButton, { force: true });
            console.log("Field Requests Page Opened successfully.");   
    }
    

    async checkFieldRowRequestStatus(ExpectedFieldStatus) {
        let requestTd ,requestType;
        let fieldRow = [];
        fieldRow = await this.search.getFirstRow();

        if (fieldRow && fieldRow.length > 0) {
            requestTd = fieldRow[5].tdLocator;
            requestType = requestTd.locator("span");
            await requestType.waitFor({ state: "visible" });
            var actualRequestStatus = await requestType.textContent();
        }
        console.log("The Request status for created field is: ", actualRequestStatus);
        if (actualRequestStatus === ExpectedFieldStatus) {
            return true;
          }
          return false;
    }
    
    /**
     * Opens the details page of a specific field by its identifier.
     * 
     * @param {string} fieldNumber - The unique identifier of the field to view.
     * @returns {Promise<void>} - Completes the action of opening the field details page.
     */
    async openViewRequestDetailsPage(requestNumber) {
        let actionsTd ;
        let fieldRow = [];

        fieldRow = await this.search.getRowInTableWithSpecificText(requestNumber);
        var actionlocator = "button";
        if (fieldRow && fieldRow.length > 0) {
            await this.search.clickRowAction(fieldRow,this.tableActions, actionlocator);
            console.log("Request Details Page is opened successfully.");
        }
       

       /* if (fieldRow && fieldRow.length > 0) {
            actionsTd = fieldRow[6].tdLocator;
            const viewButton = actionsTd.locator('div[data-testid="table-actions"] button');
            await viewButton.waitFor({ state: "visible", timeout: 5000 });
            await viewButton.click();    
           
        }*/
    
    }


      /**
     * Creates Complex and Input fields.*/
     async createComplexFieldRequest(complexFieldData, inputFieldData) {
        await this.navigateToFieldRequestsPage();
        var complexFieldCreated = await this.fieldRequestsPage.createField(complexFieldData);
        var inputFieldCreated =await this.fieldRequestsPage.createField(inputFieldData);
        if ( complexFieldCreated && inputFieldCreated )
        {
            var complexFieldID = await this.fieldRequestsPage.checkFieldRowDetails(complexFieldData);
            var inputFieldID = await this.fieldRequestsPage.checkFieldRowDetails(inputFieldData);
            var RequestNumber = await this.fieldRequestsPage.sendRequestToApproval();
            console.log('Fields created successfully');
            return [RequestNumber ,complexFieldID ,inputFieldID]
        }

    }

  /**
     * Validates field details and makes a decision.
     */
  async validateFieldDetailsAndMakeDecision(requestChecks ,expectedRequestStatus ,expectedEnablementStatus) {
    
    await this.openViewRequestDetailsPage(requestChecks[0]);

    await this.fieldRequestDetialsPage.checkInsideRequestStatus(expectedRequestStatus);

    var sendRequest = await this.fieldRequestDetialsPage.verifyFieldEnablementStatusesAndMakeDecision(requestChecks, expectedEnablementStatus);
    if (sendRequest) {
        return true;
    }
    return false;
}

    /**
     * Creates Group and Input fields.*/
    async createGroupFieldRequest(groupFieldData, inputFieldData) {
        await this.navigateToFieldRequestsPage();
        var groupFieldCreated = await this.fieldRequestsPage.createField(groupFieldData);
        var inputFieldCreated =await this.fieldRequestsPage.createField(inputFieldData);
        if ( groupFieldCreated && inputFieldCreated )
        {
            var groupFieldID = await this.fieldRequestsPage.checkFieldRowDetails(groupFieldData);
            var inputFieldID = await this.fieldRequestsPage.checkFieldRowDetails(inputFieldData);
            var RequestNumber = await this.fieldRequestsPage.sendRequestToApproval();
            console.log('Fields created successfully');
            return [RequestNumber ,groupFieldID ,inputFieldID]
        }

    }

}
module.exports = { FieldLibraryUpdateRequestsPage };