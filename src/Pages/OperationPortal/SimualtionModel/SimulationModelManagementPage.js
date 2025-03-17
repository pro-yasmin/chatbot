const { SearchPage } = require("../../../Pages/AdminPortal/SharedPages/SearchPage");
const { PopUpPage } = require('../../AdminPortal/SharedPages/PopUpPage');
const { SimualtionModelPage } = require("../SimualtionModel/SimualtionModelPage");
const { SimualtionModelDetailsPage } = require("../SimualtionModel/SimualtionModelDetailsPage");
const { SimulationModelVersionsViewPage } = require("../SimualtionModel/SimulationModelVersionsViewPage");
const { SimulationModelEditVariablesPage } = require("../SimualtionModel/SimulationModelEditVariablesPage");
const { SimulationModelExecutionRecordsPage } = require("../SimualtionModel/SimulationModelExecutionRecordsPage");


export class SimulationModelManagementPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.popUpMsg = new PopUpPage(this.page);
        this.simualtionModelPage = new SimualtionModelPage(this.page);
        this.simualtionModelDetailsPage = new SimualtionModelDetailsPage(this.page);
        this.simulationModelVersionsViewPage = new SimulationModelVersionsViewPage(this.page);
        this.simulationModelEditVariablesPage = new SimulationModelEditVariablesPage(this.page);
        this.simulationModelExecutionRecordsPage = new SimulationModelExecutionRecordsPage(this.page);

        //popup
        this.popUpYesButton = '(//div[contains(@class, "MuiDialogActions-root")]//button[@tabindex="0"])[1]';

        this.defineSimulationModelButton = '//button[contains(@class, "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-colorPrimary")]';
        this.searchInput = '//form[@data-testid="search-input"]//input';
        this.threeDotsMenu = '//div[@data-testid="three-dots-menu"]';
        this.activate_deactivate_Button = '//li[@data-testid="three-dots-menu-option-0"]';
        this.fieldEnablementStatus = '//div[@data-testid="tag"]';
        this.tableActions = '(//div[contains(@class, "MuiStack-root")])[38]';

        //to be removed after adding data-testid
        this.viewButton = '(//div[contains(@class, "MuiStack-root")])[34]//span//button[@tabindex="0"]';
        this.editButton = '((//div[contains(@class, "MuiStack-root")])[34]//span//button[@tabindex="0"])[2]';
        this.ThreeDotsActionsButton = '((//div[contains(@class, "MuiStack-root")])[33]//button)[3]';
        this.ModelVersionsButton = '(//li[contains(@class, "MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root")])[4]';
        this.editVariablesButton = '(//li[contains(@class, "MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root")])[2]';
        this.executeSimulationModelButton = '(//li[contains(@class, "MuiButtonBase-root MuiMenuItem-root MuiMenuItem-gutters MuiMenuItem-root")])[1]';
    }

    async clickDefineSimulationModel() {
        await this.page.click(this.defineSimulationModelButton);
    }
    async defineSimulationModel(simulationModelData) {
        await this.clickDefineSimulationModel();
        return await this.simualtionModelPage.fillSimulationModelInfo(simulationModelData);

    }
    async checkNewSimulationModelAdded(simulationModelData, simulationModelstatusActive, editedSimulationModel, simulationModelstatusExecuted) {
        let arabicTd;
        let englishTd;
        let statusTd;
        let activationStatusTd;

        let simulationModelArabicName;
        let simulationModelEnglishName;
        let simulationModelStatus;
        let simulationModelActivationStatus;
        let simulationModelRow = [];
        if (editedSimulationModel) {
            //await this.page.waitForTimeout(5000);
            simulationModelRow = await this.search.getRowInTableWithSpecificText(simulationModelData.getSimulationModelArName());
        }
        else {
            //await this.page.waitForTimeout(5000);
            simulationModelRow = await this.search.searchOnUniqueRow(this.searchInput, simulationModelData.getSimulationModelArName());
        }

        if (simulationModelRow && simulationModelRow.length > 0) {
            arabicTd = simulationModelRow[1].tdLocator;
            simulationModelArabicName = arabicTd.locator("span");
            await simulationModelArabicName.waitFor({ state: "visible" });
            var actualSimulationModelArabicName = await simulationModelArabicName.textContent();

            console.log("Actual Arabic Name: ", actualSimulationModelArabicName);
            console.log("Expected Arabic Name: ", simulationModelData.getSimulationModelArName());

            englishTd = simulationModelRow[2].tdLocator;
            simulationModelEnglishName = englishTd.locator("span");
            await simulationModelEnglishName.waitFor({ state: "visible" });
            var actualSimulationModelEnglishName = await simulationModelEnglishName.textContent();

            console.log("Actual English Name: ", actualSimulationModelEnglishName);
            console.log("Expected English Name: ", simulationModelData.getSimulationModelEnName());

            statusTd = simulationModelRow[7].tdLocator;
            simulationModelStatus = statusTd.locator("span");
            await simulationModelStatus.waitFor({ state: "visible" });
            var actualSimulationModelStatus = await simulationModelStatus.textContent();

            console.log("Actual Status: ", actualSimulationModelStatus);

            activationStatusTd = simulationModelRow[8].tdLocator;
            simulationModelActivationStatus = activationStatusTd.locator("span");
            await simulationModelActivationStatus.waitFor({ state: "visible" });
            var actualSimulationModelActivationStatus = await simulationModelActivationStatus.textContent();

            console.log("Actual Activation Status: ", actualSimulationModelActivationStatus);
        }

        if (simulationModelstatusActive) {
            if (
                actualSimulationModelArabicName === simulationModelData.getSimulationModelArName() &&
                actualSimulationModelEnglishName === simulationModelData.getSimulationModelEnName() &&
                actualSimulationModelStatus === global.testConfig.SimulationModels.simulationModelStatusReady &&
                actualSimulationModelActivationStatus === global.testConfig.SimulationModels.acivationStatusEnabled
            ) {
                console.log("Simulation Model Information matched successfully.");
                let simulationModelId = await simulationModelRow[0].tdLocator.textContent();
                simulationModelData.setCreatedSimulationModelId(simulationModelId);
                console.log("Created simulation Model ID set in simulationModelData: " + simulationModelData.getCreatedSimulationModelId());
                return true;
            }
            return false;
        }
        else if (simulationModelstatusExecuted) {
            if (
                actualSimulationModelArabicName === simulationModelData.getSimulationModelArName() &&
                actualSimulationModelEnglishName === simulationModelData.getSimulationModelEnName() &&
                actualSimulationModelStatus === global.testConfig.SimulationModels.simulationModelStatusExecuted &&
                actualSimulationModelActivationStatus === global.testConfig.SimulationModels.acivationStatusEnabled
            ) {
                console.log("Simulation Model Status changed to Executed");
                return true;
            }
            return false;
        }
        else {
            if (
                actualSimulationModelArabicName === simulationModelData.getSimulationModelArName() &&
                actualSimulationModelEnglishName === simulationModelData.getSimulationModelEnName() &&
                actualSimulationModelStatus === global.testConfig.SimulationModels.simulationModelStatusCreated &&
                actualSimulationModelActivationStatus === global.testConfig.SimulationModels.acivationStatusDisabled
            ) {
                console.log("Simulation Model Information matched successfully.");
                let simulationModelId = await simulationModelRow[0].tdLocator.textContent();
                simulationModelData.setCreatedSimulationModelEditedId(simulationModelId);
                console.log("Edited simulation Model ID set in simulationModelData: " + simulationModelData.getCreatedSimulationModelEditedId());
                return true;
            }
            return false;
        }
    }

    /**
 * Clicks the "View" button for a specific State Machine entry in the simulationModel table.
 * @param {Object} simulationModelData - The data object containing information about the simulationModelData entry.
 * @returns {Promise<void>} - A promise that resolves when the action is completed.
 */
    async verifySimualtionModelsActiveAndEdited(simulationModelData, simulationModelstatusActive, simulationModelstatusInactive) {
        let arabicTd;
        let englishTd;
        let statusTd;
        let activationStatusTd;

        let simulationModelArabicName;
        let simulationModelEnglishName;
        let simulationModelStatus;
        let simulationModelActivationStatus;
        let simulationModelRow = [];
        if (simulationModelstatusInactive) {
            simulationModelRow = await this.search.searchOnUniqueRow(this.searchInput, simulationModelData.getCreatedSimulationModelEditedId());
            if (simulationModelRow && simulationModelRow.length > 0) {
                arabicTd = simulationModelRow[1].tdLocator;
                simulationModelArabicName = arabicTd.locator("span");
                await simulationModelArabicName.waitFor({ state: "visible" });
                var actualSimulationModelArabicName = await simulationModelArabicName.textContent();

                console.log("Actual Arabic Name: ", actualSimulationModelArabicName);
                console.log("Expected Arabic Name: ", simulationModelData.getSimulationModelArName());

                englishTd = simulationModelRow[2].tdLocator;
                simulationModelEnglishName = englishTd.locator("span");
                await simulationModelEnglishName.waitFor({ state: "visible" });
                var actualSimulationModelEnglishName = await simulationModelEnglishName.textContent();

                console.log("Actual English Name: ", actualSimulationModelEnglishName);
                console.log("Expected English Name: ", simulationModelData.getSimulationModelEnName());

                statusTd = simulationModelRow[7].tdLocator;
                simulationModelStatus = statusTd.locator("span");
                await simulationModelStatus.waitFor({ state: "visible" });
                var actualSimulationModelStatus = await simulationModelStatus.textContent();

                console.log("Actual Status: ", actualSimulationModelStatus);

                activationStatusTd = simulationModelRow[8].tdLocator;
                simulationModelActivationStatus = activationStatusTd.locator("span");
                await simulationModelActivationStatus.waitFor({ state: "visible" });
                var actualSimulationModelActivationStatus = await simulationModelActivationStatus.textContent();

                console.log("Actual Activation Status: ", actualSimulationModelActivationStatus);

                if (
                    actualSimulationModelArabicName === simulationModelData.getSimulationModelArName() &&
                    actualSimulationModelEnglishName === simulationModelData.getSimulationModelEnName() &&
                    actualSimulationModelStatus === global.testConfig.SimulationModels.simulationModelStatusCreated &&
                    actualSimulationModelActivationStatus === global.testConfig.SimulationModels.acivationStatusDisabled
                ) {
                    console.log("Simulation Model Information matched successfully.");
                    //return true;
                }
                //return false;
            }
            else {
                console.log("Simulation Model Row length = " + simulationModelRow.length);
            }
        }
        if (simulationModelstatusActive) {
            simulationModelRow = await this.search.searchOnUniqueRow(this.searchInput, simulationModelData.getCreatedSimulationModelId());
            if (simulationModelRow && simulationModelRow.length > 0) {
                arabicTd = simulationModelRow[1].tdLocator;
                simulationModelArabicName = arabicTd.locator("span");
                await simulationModelArabicName.waitFor({ state: "visible" });
                var actualSimulationModelArabicName = await simulationModelArabicName.textContent();

                console.log("Actual Arabic Name: ", actualSimulationModelArabicName);
                console.log("Expected Arabic Name: ", simulationModelData.getSimulationModelArName());

                englishTd = simulationModelRow[2].tdLocator;
                simulationModelEnglishName = englishTd.locator("span");
                await simulationModelEnglishName.waitFor({ state: "visible" });
                var actualSimulationModelEnglishName = await simulationModelEnglishName.textContent();

                console.log("Actual English Name: ", actualSimulationModelEnglishName);
                console.log("Expected English Name: ", simulationModelData.getSimulationModelEnName());

                statusTd = simulationModelRow[7].tdLocator;
                simulationModelStatus = statusTd.locator("span");
                await simulationModelStatus.waitFor({ state: "visible" });
                var actualSimulationModelStatus = await simulationModelStatus.textContent();

                console.log("Actual Status: ", actualSimulationModelStatus);

                activationStatusTd = simulationModelRow[8].tdLocator;
                simulationModelActivationStatus = activationStatusTd.locator("span");
                await simulationModelActivationStatus.waitFor({ state: "visible" });
                var actualSimulationModelActivationStatus = await simulationModelActivationStatus.textContent();

                console.log("Actual Activation Status: ", actualSimulationModelActivationStatus);

                if (
                    actualSimulationModelArabicName === simulationModelData.getSimulationModelArName() &&
                    actualSimulationModelEnglishName === simulationModelData.getSimulationModelEnName() &&
                    actualSimulationModelStatus === global.testConfig.SimulationModels.simulationModelStatusReady &&
                    actualSimulationModelActivationStatus === global.testConfig.SimulationModels.acivationStatusEnabled
                    
                ) {
                    console.log("Simulation Model Information matched successfully.");
                    return true;
                }
                return false;
            }
            else {
                console.log("Simulation Model Row length = " + simulationModelRow.length);
            }
        }
    }

    /**
     * Clicks the "View" button for a specific Simulation Model entry in the simulationModel table.
     * @param {Object} simulationModelData - The data object containing information about the simulationModelData entry.
     * @returns {Promise<void>} - A promise that resolves when the action is completed.
     */
    async clickViewButton(simulationModelData) {
        await this.search.searchOnUniqueRow(this.searchInput, simulationModelData.getCreatedSimulationModelEditedId());
        //tobe removed after adding data-testid
        await this.page.click(this.viewButton);
    }

    /**
     * Clicks the "Edit" button for a specific Simulation Model entry in the simulationModel table.
     * @param {Object} simulationModelData - The data object containing information about the simulationModelData entry.
     * @returns {Promise<void>} - A promise that resolves when the action is completed.
     */
    async clickEditButton(simulationModelData) {
        await this.search.searchOnUniqueRow(this.searchInput, simulationModelData.getCreatedSimulationModelId());
        //tobe removed after adding data-testid
        await this.page.click(this.editButton);
    }

    /**
     * Clicks the "Actions" button for a specific Simulation Model entry in the simulationModel table.
     * @param {Object} simulationModelData - The data object containing information about the simulationModelData entry.
     * @returns {Promise<void>} - A promise that resolves when the action is completed.
     */
    async click3DotsActionsButton(simulationModelData) {
        await this.search.searchOnUniqueRow(this.searchInput, simulationModelData.getCreatedSimulationModelId());
        //tobe removed after adding data-testid
        await this.page.click(this.ThreeDotsActionsButton);
    }

    /**
     * Validates that the simulation Model page is opened.
     * @param {Object} simulationModelData - The data required to identify the simulation Model.
     * @returns {Promise<void>} - Resolves when the validation is complete.
     */
    async viewSimulationModelDetails(simulationModelData) {
        await this.clickViewButton(simulationModelData);
        console.log('View Simulaion Model Button Clicked');
        return await this.simualtionModelDetailsPage.validateSimulationModelDetails(simulationModelData);
    }

    /**
     * Validates that the simulation Model page is opened.
     * @param {Object} simulationModelData - The data required to identify the simulation Model.
     * @returns {Promise<void>} - Resolves when the validation is complete.
     */
    async editSimulationModel(simulationModelData) {
        await this.clickEditButton(simulationModelData);
        console.log('Edit Simulaion Model Button Clicked');
        return await this.simualtionModelPage.editSimulationModel(simulationModelData);
    }

    /**
     * Validates that the simulation Model page is opened.
     * @param {Object} simulationModelData - The data required to identify the simulation Model.
     * @returns {Promise<void>} - Resolves when the validation is complete.
     */
    async VerifySimulationModelVersionsDetails(simulationModelData, simulationModelstatusActive, simulationModelstatusInactive) {
        await this.click3DotsActionsButton(simulationModelData);
        console.log('Actions Simulaion Model Button Clicked');
        await this.page.click(this.ModelVersionsButton);
        console.log('Simulaion Model Versions Button Clicked');
        return await this.simulationModelVersionsViewPage.verifySimualtionModelsActiveAndEdited(simulationModelData, simulationModelstatusActive, simulationModelstatusInactive);
    }

    /**
     * Validates that the simulation Model page is opened.
     * @param {Object} simulationModelData - The data required to identify the simulation Model.
     * @returns {Promise<void>} - Resolves when the validation is complete.
     */
    async editSimulationModelVariables(simulationModelData) {
        await this.click3DotsActionsButton(simulationModelData);
        console.log('Actions Simulaion Model Button Clicked');
        await this.page.click(this.editVariablesButton);
        console.log('Edit Variables Button Clicked');
        return await this.simulationModelEditVariablesPage.editVariable(simulationModelData);
    }

    /**
     * Validates that the simulation Model page is opened.
     * @param {Object} simulationModelData - The data required to identify the simulation Model.
     * @returns {Promise<void>} - Resolves when the validation is complete.
     */
    async executeSimulationModel(simulationModelData, executionRecordNewAdded) {
        await this.click3DotsActionsButton(simulationModelData);
        console.log('Actions Simulaion Model Button Clicked');
        await this.page.click(this.executeSimulationModelButton);
        console.log('Execute Simulaion Model Button Clicked');
        await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SimulationModels.executeSimulationModelConfirmationMsg);
        await this.page.waitForTimeout(2000);
        await this.popUpMsg.popUpMessage(this.popUpYesButton, global.testConfig.SimulationModels.executeSimulationModelSuccessMsg);
        return await this.simulationModelExecutionRecordsPage.verifySimualtionModelExecutionRecord(executionRecordNewAdded);
    }
}
module.exports = { SimulationModelManagementPage };