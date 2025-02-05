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
     * Activates a field library entry if it is currently deactivated.
     * @returns {Promise<boolean>} - A promise that resolves to true if the action is successful, otherwise false.
     */
    async activateToggle() {
        await this.page.click(this.fieldEnablementToggle);
        var popUpMsgResult = await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.FieldLibrary.activateConfirmationMsg);
        if (popUpMsgResult === true) {
            console.log("Toggle button is now activated");
            var actualSuccessMsg = await (await this.page.$(this.activate_deactivateFieldLibraryAlertMsg)).textContent();
            if (actualSuccessMsg === global.testConfig.FieldLibrary.fieldActivatedSuccessMsg) {
                return true;
            }
            return false;
        }
    }

    /**
     * Deactivates a field library entry if it is currently activated.
     * @returns {Promise<void>} - A promise that resolves when the action is completed.
     */
    async deactivateToggle() {
        await this.page.click(this.fieldEnablementToggle);
        var popUpMsgResult = await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.FieldLibrary.deactivateConfirmationMsg);
        if (popUpMsgResult === true) {
            console.log("Toggle button is now activated");
            var actualSuccessMsg = await (await this.page.$(this.activate_deactivateFieldLibraryAlertMsg)).textContent();
            if (actualSuccessMsg === global.testConfig.FieldLibrary.fieldDeactivatedSuccessMsg) {
                return true;
            }
            return false;
        }
    }

    /**
     * Deactivates a field library entry if it is currently activated.
     * @returns {Promise<void>} - A promise that resolves when the action is completed.
     */
    async deactivateToggleForBlockedFieldLibrary() {
        await this.page.click(this.fieldEnablementToggle);
        var popUpMsgResult = await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.FieldLibrary.deactivateConfirmationMsgForLockedField);
        if (popUpMsgResult === true) {
            var actualSuccessMsg = await (await this.page.$(this.activate_deactivateFieldLibraryAlertMsg)).textContent();
            if (actualSuccessMsg === global.testConfig.FieldLibrary.fieldActivationErrorMsg) {
                return true;
            }
            return false;
        }
    }


}
module.exports = { FieldLibraryPage };