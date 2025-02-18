import filesPaths from '../../../FilesToUpload/filesPaths';
const { Utils } = require('../../../Utils/utils.js');
const { PopUpPage } = require('../../AdminPortal/SharedPages/PopUpPage');

export class SimualtionModelPage {
    constructor(page) {
        this.page = page;
        this.utils = Utils;
        this.popUpMsg = new PopUpPage(this.page);

        this.fieldEnablementToggle = '//label[@class="form-check-label label-position-right"]';
        this.activate_deactivateFieldLibraryAlertMsg = '//div[@role="presentation"]//span';
        //popup
        this.successPopupTitle = '//div[contains(@class, "MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation24 MuiDialog-paper MuiDialog-paperScrollPaper")]';
        this.popUpYesButton = '//div[contains(@class, "MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation24 MuiDialog-paper MuiDialog-paperScrollPaper")]//button[contains(@class, "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary")]';

        //tab1
        this.simulationModelArNameField = '//input[@name="modelData.nameAr"]';
        this.simulationModelEnNameField = '//input[@name="modelData.nameEn"]';
        this.beneficiaryPartyDdl = '//div[@id="mui-component-select-modelData.beneficiaryParty"]';
        this.beneficiaryPartyDdlFirstValue = '//li[@tabindex="0"]';
        this.simulationModelDescriptionField = '//textarea[@name="modelData.description"]';
        // this.uploaderLocator = '[data-testid="file-input"]';
        // this.attachButton = '(//button[contains(@class, "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary")])[2]';
        this.nextTabButton = '//button[@data-testid="next-button"]';

        //tab2
        this.dataSourceFirstValueCheckbox = '(//input[@type="checkbox"])[1]';

        //tab4
        this.variableArNameField = '//input[@name="nameAr"]';
        this.variableEnNameField = '//input[@name="nameEn"]';
        this.variableDescriptionField = '//textarea[@name="description"]';
        this.variableTypeDdl = '//div[@id="mui-component-select-type"]';
        this.variableTypeDdlFirstValue = '//li[@tabindex="0"]';
        this.defaultValueField = '//input[@name="defaultValue"]';
        this.addVariableButton = '//div[@data-testid="customized-step-content"]//button[contains(@class, "MuiButtonBase-root MuiButton-root MuiButton-contained")]';

        //tab5




    }

    /**
   * Fills the simulation Model information - first tab.
   * @param {Object} simulationModelData - The data object containing simulationModelData information.
   * @returns {Promise<void>} A promise that resolves when the lookup definition information has been filled.
   */
    async fillSimulationModelInfo(simulationModelData) {
        await this.fillTabOne(simulationModelData);
        await this.fillTabTwo();
        await this.fillTabThree();
        await this.fillTabFour(simulationModelData);

    }

    async fillTabOne(simulationModelData) {
        console.log("Start filling Simulation Model Information Tab one");
        await this.page.waitForTimeout(1000);
        this.createdSimulationModelArName = simulationModelData.getSimulationModelArName();
        this.createdSimulationModelEnName = simulationModelData.getSimulationModelEnName();
        this.createdSimulationModelDescription = simulationModelData.getSimulationModelDescription();
        await this.page.fill(this.simulationModelArNameField, this.createdSimulationModelArName);
        await this.page.fill(this.simulationModelEnNameField, this.createdSimulationModelEnName);
        await this.page.click(this.beneficiaryPartyDdl);
        await this.page.waitForSelector(this.beneficiaryPartyDdlFirstValue, { visible: true });
        await this.page.click(this.beneficiaryPartyDdlFirstValue);
        await this.page.fill(this.simulationModelDescriptionField, this.createdSimulationModelDescription);
        await this.utils.uploadFile(this.page, filesPaths.pdfAttachmentPath);

        simulationModelData.setSimulationModelArName(this.createdSimulationModelArName);
        simulationModelData.setSimulationModelEnName(this.createdSimulationModelEnName);
        simulationModelData.setSimulationModelDescription(this.createdSimulationModelDescription);
        console.log("End filling Simulation Model information Tab one");
        await this.page.click(this.nextTabButton);
    }
    async fillTabTwo() {
        console.log("Start filling Simulation Model Information Tab two");
        await this.page.waitForTimeout(1000);
        await this.page.click(this.dataSourceFirstValueCheckbox);
        await this.utils.uploadFile(this.page, filesPaths.csvAttachmentPath);
        console.log("End filling Simulation Model information Tab two");
        await this.page.click(this.nextTabButton);
    }
    async fillTabThree() {
        console.log("Start filling Simulation Model Information Tab three");
        await this.page.waitForTimeout(1000);
        await this.utils.uploadFile(this.page, filesPaths.pdfAttachmentPath);
        console.log("End filling Simulation Model information Tab three");
        await this.page.click(this.nextTabButton);
    }
    async fillTabFour(simulationModelData) {
        console.log("Start filling Simulation Model Information Tab four");
        await this.page.waitForTimeout(1000);
        this.createdVariableArName = simulationModelData.getVariableArName();
        this.createdVariableEnName = simulationModelData.getVariableEnName();
        this.createdVariableDescription = simulationModelData.getVariableDescription();
        this.createdDefaultValue = simulationModelData.getDefaultValue();
        await this.page.fill(this.variableArNameField, this.createdVariableArName);
        await this.page.fill(this.variableEnNameField, this.createdVariableEnName);
        await this.page.fill(this.variableDescriptionField, this.createdVariableDescription);
        await this.page.click(this.variableTypeDdl);
        await this.page.waitForSelector(this.variableTypeDdlFirstValue, { visible: true });
        await this.page.click(this.variableTypeDdlFirstValue);
        await this.page.fill(this.defaultValueField, this.createdDefaultValue);
        await this.page.click(this.addVariableButton);

        simulationModelData.setVariableArName(this.createdVariableArName);
        simulationModelData.setVariableEnName(this.createdVariableEnName);
        simulationModelData.setVariableDescription(this.createdVariableDescription);
        simulationModelData.setDefaultValue(this.createdDefaultValue);
        console.log("End filling Simulation Model information Tab four");
        await this.page.click(this.nextTabButton);
    }
    async fillTabFive() {
        console.log("Start filling Simulation Model Information Tab five");
        await this.page.waitForTimeout(1000);
        console.log("End filling Simulation Model information Tab five");
        await this.page.click(this.nextTabButton);
        var result = await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.simulationModelData.defineSimulationConfirmationMsg);
        return result;

    }

}
module.exports = { SimualtionModelPage };