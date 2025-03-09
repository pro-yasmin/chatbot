import Constants from '../../../Utils/Constants';

const { SearchPage } = require("../SharedPages/SearchPage");
const { FieldLibraryPage } = require("../FieldLibrary/FieldLibraryPage");


export class FieldLibraryManagementPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.fieldLibraryPage = new FieldLibraryPage(this.page);
        this.tableActions = 'table-actions';
        this.searchInputSelector = '//form[@data-testid="search-input"]//input';

        this.approvedFieldsTab = '//button[@data-testid="tab-2"]';
        this.rejectedFieldsTab = '//button[@data-testid="tab-4"]';
        this.searchInput = '//input[@data-testid="search-input-base"]';
        this.threeDotsMenu = '//div[@data-testid="three-dots-menu"]';
        this.activate_deactivate_Button = '//li[@data-testid="three-dots-menu-option-0"]';
        this.fieldEnablementStatus = '//div[@data-testid="tag"]';
    }

    async navigateToApprovedFieldsTab() {
        await this.page.click(this.approvedFieldsTab);
    }

    async navigateToRejectedFieldsTab() {
        await this.page.click(this.rejectedFieldsTab);
    }

        /**
    * Toggles the activation status of a field library entry.
    * @param {string} fieldName - The name of the field to toggle.
    * @param {boolean} isLocked - Whether the field is locked or not.
    * @returns {Promise<void>} - A promise that resolves when the action is completed.
    */
    async toggleFieldLibraryEntry(fieldName, isLocked) {
        let fieldLibraryTableRow = [];
        fieldLibraryTableRow = await this.search.searchOnUniqueRow(this.searchInput, fieldName);
        if (fieldLibraryTableRow && fieldLibraryTableRow.length > 0) {
            var actualFieldEnablementStatus = await (await this.page.$(this.fieldEnablementStatus)).textContent();
        }
        if (actualFieldEnablementStatus === global.testConfig.FieldLibrary.fieldEnablementStatusDeactivated) {
            console.log("field Enablement Status is Deactivated");
            await this.page.click(this.threeDotsMenu);
            await this.page.click(this.activate_deactivate_Button);
            var result = await this.fieldLibraryPage.toggleFieldLibraryEntry(global.testConfig.FieldLibrary.activateConfirmationMsg, global.testConfig.FieldLibrary.fieldActivatedSuccessMsg, global.testConfig.FieldLibrary.fieldActivatedSuccessMsg);
            return result;
        } else if (actualFieldEnablementStatus === global.testConfig.FieldLibrary.fieldEnablementStatusActivated) {
            console.log("field Enablement Status is Activated");
            await this.page.click(this.threeDotsMenu);
            await this.page.click(this.activate_deactivate_Button);
            if (isLocked) {
                var result = await this.fieldLibraryPage.toggleFieldLibraryEntry(global.testConfig.FieldLibrary.deactivateConfirmationMsgForLockedField, global.testConfig.FieldLibrary.fieldDeactivatedSuccessMsg, global.testConfig.FieldLibrary.fieldActivationErrorMsg);
            } else {
                var result = await this.fieldLibraryPage.toggleFieldLibraryEntry(global.testConfig.FieldLibrary.deactivateConfirmationMsg, global.testConfig.FieldLibrary.fieldDeactivatedSuccessMsg, global.testConfig.FieldLibrary.fieldDeactivatedSuccessMsg);
            }
            return result;
        }
    }


    async checkFieldStatusDetails(fieldMap) {

        await this.page.waitForTimeout(5000);

        for (const [fieldId, actionType] of fieldMap.entries()) {

            if (actionType === Constants.APPROVE) 
                { await this.navigateToApprovedFieldsTab();} 
            else if (actionType === Constants.REJECT) 
                { await this.navigateToRejectedFieldsTab(); }
    
            console.log(`Verifying ${actionType} field with ID: ${fieldId}`);
            await this.page.waitForTimeout(5000);
            // Search for the field row using the field ID
            var fieldRow = await this.search.searchOnUniqueRow(this.searchInputSelector, fieldId);
            await this.page.waitForTimeout(5000);
            // Open the field details page
            var actionLocator = "button";
            await this.search.clickRowAction(fieldRow, this.tableActions, actionLocator);
            console.log(`Opened field details page for ID: ${fieldId}`);
    
            // Determine expected status based on action type
            const expectedStatus = actionType === Constants.APPROVE
                ? global.testConfig.FieldLibrary.fieldEnablementStatusActivated
                : global.testConfig.FieldLibrary.fieldEnablementStatusDeactivated;
    
            // var fieldStatus = await this.fieldLibraryPage.checkInsideFieldStatus(expectedStatus , actionType);

            console.log(`Field status verified for ID: ${fieldId}`);

            // await this.page.goBack();
            // await this.page.waitForLoadState('domcontentloaded');
        }
        return fieldStatus;
    }
    
}
module.exports = { FieldLibraryManagementPage };