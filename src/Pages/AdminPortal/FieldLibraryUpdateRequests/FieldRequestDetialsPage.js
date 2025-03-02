const { SearchPage } = require("../SharedPages/SearchPage.js");

export class FieldRequestDetialsPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.requestStatusIcon = '//span[@data-testid="status-processing"]'; 
        this.RequestStatusData = '//span[contains(text(),"معالجة")]'; 
    }   

    async checkInsideRequestStatus(ExpectedFieldRequestStatus) {
    
        // Get the actual status text for both cases
        var requestStatusIcon = await this.page.textContent(this.requestStatusIcon);
        var RequestStatusData = await this.page.textContent( this.RequestStatusData);
    
        // Log the retrieved data
        console.log(`Request Status Icon : ${requestStatusIcon.trim()}`);
        console.log(`Request Status Data: ${RequestStatusData.trim()}`);

        if (requestStatusIcon === ExpectedFieldRequestStatus &&
            RequestStatusData === ExpectedFieldRequestStatus) {
            return true;
          }
          return false;
    }
    
    
    async checkFieldEnablmentStatus(rowId1, rowId2, ExpectedEnablmentStatus) {
        // Retrieve details for both rows using their row IDs
        let row1Details = await this.search.getRowInTableWithSpecificText(rowId1);
        let row2Details = await this.search.getRowInTableWithSpecificText(rowId2);
    
        // Assuming the enablement status
        let row1Status = await row1Details[7].tdLocator.textContent();
        let row2Status = await row2Details[7].tdLocator.textContent();
    
        // Log the status for fields
        console.log(`Row 1 Status (ID: ${rowId1}): ${row1Status}`);
        console.log(`Row 2 Status (ID: ${rowId2}): ${row2Status}`);
    
        // Compare the extracted values with the expected status
        if (row1Status === ExpectedEnablmentStatus && row2Status === ExpectedEnablmentStatus) {
            return true;
        }
        return false;
    }
    
    async openFieldDetailsPage(fieldData) {

        let fieldRow = await this.search.getRowInTableWithSpecificText(fieldData);
        await fieldRow[8].tdLocator.click();
        console.log("Field Detial Page Openned Successfully")

    }

}
module.exports = { FieldRequestDetialsPage };