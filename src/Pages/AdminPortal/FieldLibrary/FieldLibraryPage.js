const { PopUpPage } = require('../SharedPages/PopUpPage');

export class FieldLibraryPage {
    constructor(page) {
        this.page = page;
        this.popUpMsg = new PopUpPage(this.page);

        this.fieldEnablementToggle = '//label[@class="form-check-label label-position-right"]';
        this.activate_deactivateFieldLibraryAlertMsg = '//div[@role="presentation"]//span';
        //popup
        this.successPopupTitle = '//span[@data-testid="modal-title"]';
        this.popUpYesButton = '//button[@data-testid="confirmation-modal-primary-button"]';
    }

        /**
     * Toggles the activation status of a field library entry.
     * @param {string} confirmationMessage - The confirmation message to expect.
     * @param {string} successMessage - The success message to expect.
     * @param {string} expectedAlertMessage - The expected alert message.
     * @returns {Promise<boolean>} - A promise that resolves to true if the action is successful, otherwise false.
     */
    async toggleFieldLibraryEntry(confirmationMessage, successMessage, expectedAlertMessage) {
        await this.page.click(this.fieldEnablementToggle);
        var popUpMsgResult = await this.popUpMsg.popUpMessage(this.popUpYesButton, confirmationMessage);
        if (popUpMsgResult === true) {
            console.log("Toggle button is now " + (successMessage === global.testConfig.FieldLibrary.fieldActivatedSuccessMsg ? "Activated" : "Deactivated"));
            var actualSuccessMsg = await (await this.page.$(this.activate_deactivateFieldLibraryAlertMsg)).textContent();
            if (actualSuccessMsg === expectedAlertMessage) {
                return true;
            }
            return false;
        }
    }

}
module.exports = { FieldLibraryPage };