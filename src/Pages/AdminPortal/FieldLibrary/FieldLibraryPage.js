import Constants from '../../../Utils/Constants';

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

        this.approvedFieldRecordTab = '//button[@data-testid="tab-4"]';
        this.rejectedFieldRecordTab = '//button[@data-testid="tab-3"]';
        // this.fieldEnablmentStatus ='//div[contains(@class,"formio-component-status") and contains(@class,"formio-component-textfield")]//div[@ref="value"]';
        this.fieldEnablmentStatus ='//*[contains(@class,"status")][2]';

    }

        /**
     * Toggles the activation status of a field library entry.
     * @param {string} confirmationMessage - The confirmation message to expect.
     * @param {string} successMessage - The success message to expect.
     * @param {string} expectedAlertMessage - The expected alert message.
     * @returns {Promise<boolean>} - A promise that resolves to true if the action is successful, otherwise false.
     */
    async toggleFieldLibraryEntry(confirmationMessage, successMessage, expectedAlertMessage) {
        await this.page.waitForSelector(this.activate_deactivateFieldLibraryAlertMsg, {state: "detached"});
        await this.page.click(this.fieldEnablementToggle);
        var popUpMsgResult = await this.popUpMsg.popUpMessage(this.popUpYesButton, confirmationMessage);
        if (popUpMsgResult === true) {
            console.log("Toggle button is now " + (successMessage === global.testConfig.FieldLibrary.fieldActivatedSuccessMsg ? "Activated" : "Deactivated"));
            await this.page.waitForSelector(this.activate_deactivateFieldLibraryAlertMsg, {state: "visible"});
            var actualSuccessMsg = await (await this.page.$(this.activate_deactivateFieldLibraryAlertMsg)).textContent();
            if (actualSuccessMsg === expectedAlertMessage) {
                return true;
            }
            return false;
        }
    }

    async checkInsideFieldStatus(ExpectedFieldStatus , actionType) {

        var FieldTabLocator = actionType === Constants.APPROVE
                        ? this.approvedFieldRecordTab
                        : this.rejectedFieldRecordTab;

        await this.page.click(FieldTabLocator);
        await this.page.waitForTimeout(2000);
        var fieldStatus = this.page.locator(this.fieldEnablmentStatus);
        await fieldStatus.waitFor({ state: "visible", timeout: 30000  });
        var actualStatus = await fieldStatus.textContent();
        if (actualStatus.trim() === ExpectedFieldStatus.trim()) {
                console.log(`Enablment Status is as expected: "${actualStatus.trim()}".`);
                return true;
            }
            return false
    }

    

}
module.exports = { FieldLibraryPage };