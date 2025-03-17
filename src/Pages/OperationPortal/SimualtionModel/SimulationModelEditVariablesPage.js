const { PopUpPage } = require('../../AdminPortal/SharedPages/PopUpPage');

export class SimulationModelEditVariablesPage {
    constructor(page) {
        this.page = page;
        this.popUpMsg = new PopUpPage(this.page);

        this.editFirstVariable = '(//table//button[contains(@class, "MuiButtonBase-root MuiIconButton-root")])[1]';
        this.defaultValueField = '//input[@name="defaultValue"]';
        this.editVariablesButton = '//button[contains(@class, "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary")]';
        this.saveChangesButton = '//button[@data-testid="next-button"]';

        //popup
        this.popUpYesButton = '(//div[contains(@class, "MuiDialogActions-root")]//button[@tabindex="0"])[1]';
        this.confirmEditButton = '//button[contains(text(), "نعم تعديل")]'; //check locator
    }

    /**
 * Clicks the "View" button for a specific State Machine entry in the simulationModel table.
 * @param {Object} simulationModelData - The data object containing information about the simulationModelData entry.
 * @returns {Promise<void>} - A promise that resolves when the action is completed.
 */
    async editVariable(simulationModelData) {
        await this.page.waitForSelector(this.editFirstVariable, { visible: true });
        await this.page.click(this.editFirstVariable);
        console.log("Edit Variable Clicked");
        await this.page.waitForSelector(this.defaultValueField, { visible: true });
        await this.page.fill(this.defaultValueField, simulationModelData.getSimulationModelDefaultValueOneEdited());
        console.log("Default Value Entered");
        await this.page.click(this.editVariablesButton);
        console.log("Edit Variables Button Clicked");
        await this.page.click(this.saveChangesButton);
        await this.popUpMsg.popUpMessage(this.confirmEditButton, global.testConfig.SimulationModels.editSimulationModeVariablesConfirmationMsg);
        var result = await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SimulationModels.editSimulationModeVariablesSuccessMsg);
        return result;
    }
}
module.exports = { SimulationModelEditVariablesPage };