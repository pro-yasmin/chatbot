import filesPaths from '../../../../configs/paths.js';
const { PopUpPage } = require('../../AdminPortal/SharedPages/PopUpPage');
const { UploadFilePage } = require('../../AdminPortal/SharedPages/UploadFilePage.js');

export class SimualtionModelPage {
    constructor(page) {
        this.page = page;
        this.popUpMsg = new PopUpPage(this.page);
        this.uploadFilePage = new UploadFilePage(this.page);

        this.fieldEnablementToggle = '//label[@class="form-check-label label-position-right"]';
        this.activate_deactivateFieldLibraryAlertMsg = '//div[@role="presentation"]//span';
        this.attachButton = '//button[@type="button" and contains(text(),"إضافة الملف")]';
        
        //popup
        this.popUpYesButton = '(//div[contains(@class, "MuiDialogActions-root")]//button[@tabindex="0"])[1]';
        

        //tab1
        this.simulationModelArNameField = '//input[@name="modelData.nameAr"]';
        this.simulationModelEnNameField = '//input[@name="modelData.nameEn"]';
        this.beneficiaryPartyDdl = '//div[@id="mui-component-select-modelData.beneficiaryParty"]';
        this.beneficiaryPartyDdlFirstValue = '//li[@data-value="a2"]';
        this.beneficiaryPartyDdlSecondValue = '//li[@data-value="a1"]';
        this.simulationModelDescriptionField = '//textarea[@name="modelData.description"]';
        this.uploadedFileName = '//td[1]//span';
        this.nextTabButton = '//button[@data-testid="next-button"]';


        //tab2
        this.dataSourceCheckbox = '(//input[@type="checkbox"])[1]';
        this.auCheckbox = '(//input[@type="checkbox"])[2]';
        this.ibrCheckbox = '(//input[@type="checkbox"])[3]';
        this.isrCheckbox = '(//input[@type="checkbox"])[4]';

        //tab4
        this.variableArNameField = '//input[@name="nameAr"]';
        this.variableEnNameField = '//input[@name="nameEn"]';
        this.variableDescriptionField = '//textarea[@name="description"]';
        this.variableTypeDdl = '//div[@id="mui-component-select-type"]';
        this.variableTypeDdlTextValue = '//li[@data-value="string"]';
        this.variableTypeDdlNumericValue = '//li[@data-value="integer"]';
        this.variableTypeDdlDateValue = '//li[@data-value="date"]';
        this.defaultValueField = '//input[@name="defaultValue"]';
        this.calendarDatePicker = '//div[contains(@class, "MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary MuiInputBase-fullWidth MuiInputBase-formControl MuiInputBase")]//button[contains(@class, "MuiButtonBase-root MuiIconButton-root MuiIconButton")]';
        this.todayDate = '//button[contains(@class, "MuiButtonBase-root MuiPickersDay-root") and @tabindex="0"]';
        this.addVariableButton = '//div[@data-testid="customized-step-content"]//button[contains(@class, "MuiButtonBase-root MuiButton-root MuiButton-contained")]';
    }

    /**
   * Fills the simulation Model information - first tab.
   * @param {Object} simulationModelData - The data object containing simulationModelData information.
   * @returns {Promise<void>} A promise that resolves when the lookup definition information has been filled.
   */
    async fillSimulationModelInfo(simulationModelData) {
        await this.fillModelDataTab(simulationModelData);
        await this.fillDataSourceTab();
        await this.fillDefineConditionsTab();
        await this.fillDefineVariablesTab(simulationModelData);
        return await this.fillDefineSimulationModelTab();

    }

    async fillModelDataTab(simulationModelData) {
        console.log("Start filling Simulation Model Information Tab one");
        await this.page.waitForTimeout(3000);
        this.createdSimulationModelArName = simulationModelData.getSimulationModelArName();
        this.createdSimulationModelEnName = simulationModelData.getSimulationModelEnName();
        this.createdSimulationModelDescription = simulationModelData.getSimulationModelDescription();
        await this.page.fill(this.simulationModelArNameField, this.createdSimulationModelArName);
        await this.page.fill(this.simulationModelEnNameField, this.createdSimulationModelEnName);
        await this.page.click(this.beneficiaryPartyDdl);
        await this.page.waitForSelector(this.beneficiaryPartyDdlFirstValue, { visible: true });
        await this.page.click(this.beneficiaryPartyDdlFirstValue);
        await this.page.fill(this.simulationModelDescriptionField, this.createdSimulationModelDescription);
        await this.uploadFilePage.uploadFile(global.testConfig.SimulationModels.simulationModelPDF, this.attachButton);

        simulationModelData.setSimulationModelArName(this.createdSimulationModelArName);
        simulationModelData.setSimulationModelEnName(this.createdSimulationModelEnName);
        simulationModelData.setSimulationModelDescription(this.createdSimulationModelDescription);
        console.log("End filling Simulation Model information Tab one");
        await this.page.click(this.nextTabButton);
    }
    async fillDataSourceTab() {
        console.log("Start filling Simulation Model Information Tab two");
        await this.page.waitForTimeout(3000);
        await this.page.click(this.dataSourceCheckbox);
        await this.page.click(this.auCheckbox);
        await this.page.click(this.ibrCheckbox);
        await this.page.click(this.isrCheckbox);
        await this.uploadFilePage.uploadFile(global.testConfig.SimulationModels.simulationModelCSV, this.attachButton);
        console.log("End filling Simulation Model information Tab two");
        await this.page.click(this.nextTabButton);
    }
    async fillDefineConditionsTab() {
        console.log("Start filling Simulation Model Information Tab three");
        await this.page.waitForTimeout(3000);
        await this.uploadFilePage.uploadFile(global.testConfig.SimulationModels.simulationModelPDF, this.attachButton);
        console.log("End filling Simulation Model information Tab three");
        await this.page.click(this.nextTabButton);
    }
    async fillDefineVariablesTab(simulationModelData) {
        console.log("Start filling Simulation Model Information Tab four");
        await this.page.waitForTimeout(1000);
        //var1
        this.createdVariableOneArName = simulationModelData.getVariableOneArName();
        this.createdVariableOneEnName = simulationModelData.getVariableOneEnName();
        this.createdVariableOneDescription = simulationModelData.getVariableOneDescription();
        this.createdDefaultValueOne = simulationModelData.getDefaultValueOne();

        //var2
        this.createdVariableTwoArName = simulationModelData.getVariableTwoArName();
        this.createdVariableTwoEnName = simulationModelData.getVariableTwoEnName();
        this.createdVariableTwoDescription = simulationModelData.getVariableTwoDescription();
        this.createdDefaultValueTwo = simulationModelData.getDefaultValueTwo();

        //var3
        this.createdVariableThreeArName = simulationModelData.getVariableThreeArName();
        this.createdVariableThreeEnName = simulationModelData.getVariableThreeEnName();
        this.createdVariableThreeDescription = simulationModelData.getVariableThreeDescription();

        await this.fillVariableData(
            this.createdVariableOneArName,
            this.createdVariableOneEnName,
            this.createdVariableOneDescription,
            this.variableTypeDdlTextValue,
            this.createdDefaultValueOne
        );

        await this.fillVariableData(
            this.createdVariableTwoArName,
            this.createdVariableTwoEnName,
            this.createdVariableTwoDescription,
            this.variableTypeDdlNumericValue,
            this.createdDefaultValueTwo
        );

        await this.fillVariableData(
            this.createdVariableThreeArName,
            this.createdVariableThreeEnName,
            this.createdVariableThreeDescription,
            this.variableTypeDdlDateValue
        );

        console.log("End filling Simulation Model information Tab four");
        await this.page.click(this.nextTabButton);
    }
    async fillVariableData(arName, enName, description, type, defaultValue = null) {
        await this.page.fill(this.variableArNameField, arName);
        await this.page.fill(this.variableEnNameField, enName);
        await this.page.fill(this.variableDescriptionField, description);
        await this.page.click(this.variableTypeDdl);
        await this.page.waitForSelector(type, { visible: true });
        await this.page.click(type);

        if (defaultValue) {
            await this.page.fill(this.defaultValueField, defaultValue);
        } else {
            await this.page.click(this.calendarDatePicker);
            await this.page.waitForSelector(this.todayDate, { visible: true });
            await this.page.click(this.todayDate);
        }

        await this.page.click(this.addVariableButton);
    }

    async fillDefineSimulationModelTab() {
        console.log("Start filling Simulation Model Information Tab five");
        await this.page.waitForTimeout(3000);
        console.log("End filling Simulation Model information Tab five");
        await this.page.click(this.nextTabButton);
        await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SimulationModels.defineSimulationConfirmationMsg);
        var result = await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SimulationModels.defineSimulationSuccessMsg);
        return result;
    }

    async editSimulationModel(simulationModelData) {
        await this.page.click(this.beneficiaryPartyDdl);
        await this.page.waitForSelector(this.beneficiaryPartyDdlFirstValue, { visible: true });
        await this.page.click(this.beneficiaryPartyDdlSecondValue);
        console.log("Beneficiary Party changed to second value");
        await this.page.fill(this.simulationModelDescriptionField, simulationModelData.getEditedSimulationModelDescription());
        await this.uploadFilePage.uploadFile(global.testConfig.SimulationModels.simulationModelPDF, this.attachButton);
        await this.page.click(this.nextTabButton);
        console.log("Navigate to Second tab");
        await this.page.waitForTimeout(5000);
        await this.uploadFilePage.uploadFile(global.testConfig.SimulationModels.simulationModelSecondCSV, this.attachButton);
        await this.page.click(this.nextTabButton);
        console.log("Navigate to Third tab");
        await this.page.waitForTimeout(5000);
        await this.uploadFilePage.uploadFile(global.testConfig.SimulationModels.simulationModelPDF, this.attachButton);
        await this.page.click(this.nextTabButton);
        console.log("Navigate to Fourth tab");
        this.createdVariableOneArName = simulationModelData.getVariableFourArName();
        this.createdVariableOneEnName = simulationModelData.getVariableFourEnName();
        this.createdVariableOneDescription = simulationModelData.getVariableOneDescription();
        this.createdDefaultValueOne = simulationModelData.getDefaultValueOne();
        await this.page.fill(this.variableArNameField, this.createdVariableOneArName);
        await this.page.fill(this.variableEnNameField, this.createdVariableOneEnName);
        await this.page.fill(this.variableDescriptionField, this.createdVariableOneDescription);
        await this.page.click(this.variableTypeDdl);
        await this.page.waitForSelector(this.variableTypeDdlTextValue, { visible: true });
        await this.page.click(this.variableTypeDdlTextValue);
        await this.page.fill(this.defaultValueField, this.createdDefaultValueOne);
        await this.page.click(this.addVariableButton);
        await this.page.click(this.nextTabButton);
        console.log("Navigate to Fifth tab");
        await this.page.click(this.nextTabButton);
        await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SimulationModels.editSimulationConfirmationMsg);
        var result = await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SimulationModels.defineSimulationSuccessMsg);
        return result;
    }

}
module.exports = { SimualtionModelPage };