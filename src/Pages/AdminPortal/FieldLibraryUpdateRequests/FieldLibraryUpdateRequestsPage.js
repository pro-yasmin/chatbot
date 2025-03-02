const { SearchPage } = require("../../AdminPortal/SharedPages/SearchPage.js");

export class FieldLibraryUpdateRequestsPage {
    constructor(page) {
        this.page = page;
        this.fieldLibraryUpdateRequestButton = '//button[contains(text(),"طلب تحديث مكتبة الحقول")]';
        this.tableActions='table-actions';


    }

    async navigateToFieldRequestsPage() {
        
            await this.page.waitForSelector(this.fieldLibraryUpdateRequestButton, { state: "visible", timeout: 5000 });
            await this.page.click(this.fieldLibraryUpdateRequestButton, { force: true });
            console.log("Field Requests Page Opened successfully.");
       
    }
    

    async checkFieldRowRequestStatus(ExpectedFieldStatus) {
        let requestTd ,requestType;
        let fieldRow = [];
        fieldRow = await new SearchPage(this.page).getFirstRow();

        if (fieldRow && fieldRow.length > 0) {
            requestTd = fieldRow[5].tdLocator;
            requestType = requestTd.locator("span");
            await requestType.waitFor({ state: "visible" });
            var actualRequestStatus = await requestType.textContent();
        }
        console.log("The Request Type for created field is: ", actualRequestStatus);
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
        await new SearchPage(this.page).clickRowAction(fieldRow,this.tableActions, actionlocator);

        if (fieldRow && fieldRow.length > 0) {
            actionsTd = fieldRow[6].tdLocator;
            const viewButton = actionsTd.locator('div[data-testid="table-actions"] button');
            await viewButton.waitFor({ state: "visible", timeout: 5000 });
            await viewButton.click();    
            console.log("Request Details Page is opened successfully.");
        }
    
    }


      /**
     * Creates Complex and Input fields.
     */// rename it to comple 
     async createComplexFieldRequest(complexFieldData, inputFieldData) {
        await this.page.navigateToFieldRequestsPage();
        var complexFieldCreated = await this.fieldRequestsPage.createField(complexFieldData);
        var inputFieldCreated =await this.fieldRequestsPage.createField(inputFieldData);
        if ( complexFieldCreated && inputFieldCreated )
        {
            var complexFieldID = await this.fieldRequestsPage.checkFieldRowDetails(complexFieldData);
            var inputFieldID = await this.fieldRequestsPage.checkFieldRowDetails(inputFieldData);
            var RequestNumber = await this.fieldRequestsPage.sendRequestToApproval();
            console.log('Fields created successfully');
            return [complexFieldID ,inputFieldID , RequestNumber]
        }

    }

  /**
     * Validates field details and makes a decision.
     */
  async validateFieldDetailsAndMakeDecision(complexFieldID, inputFieldID ,expectedRequestStatus ,expectedEnablementStatus) {
    
    await this.page.openViewFieldDetailsPage();
    
    await this.fieldRequestDetialsPage.checkInsideRequestStatus(expectedRequestStatus);

    await this.fieldRequestDetialsPage.checkFieldEnablmentStatus(complexFieldID, inputFieldID, expectedEnablementStatus);
    
    await this.fieldRequestDetialsPage.openFieldDetailsPage(complexFieldID);
    await this.fieldDetialsPage.checkInsideFieldStatus(expectedEnablementStatus);
    await this.fieldDetialsPage.backtoRequestDetialsPage();
    await this.fieldRequestDetialsPage.openFieldDetailsPage(inputFieldID);
    await this.fieldDetialsPage.checkInsideFieldStatus(expectedEnablementStatus);

    var sendRequest = await this.fieldDetialsPage.clickOnMakeDecisionNow();
    if (sendRequest) {return true;}
        return false;
}

}
module.exports = { FieldLibraryUpdateRequestsPage };