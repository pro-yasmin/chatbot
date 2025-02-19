const { SearchPage } = require("../SharedPages/SearchPage");
const { FieldLibraryPage } = require("../FieldLibrary/FieldLibraryPage");


export class FieldLibraryManagementPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.fieldLibraryPage = new FieldLibraryPage(this.page);
        this.approvedFieldsTab = '//button[@data-testid="tab-2"]';
        this.searchInput = '//input[@data-testid="search-input-base"]';
        this.threeDotsMenu = '//div[@data-testid="three-dots-menu"]';
        this.activate_deactivate_Button = '//li[@data-testid="three-dots-menu-option-0"]';
        this.fieldEnablementStatus = '//div[@data-testid="tag"]';
    }

    async navigateToApprovedFieldsTab() {
        await this.page.click(this.approvedFieldsTab);
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
}
module.exports = { FieldLibraryManagementPage };