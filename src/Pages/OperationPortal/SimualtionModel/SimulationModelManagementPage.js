const { SearchPage } = require("../../../Pages/AdminPortal/SharedPages/SearchPage");
const { SimualtionModelPage } = require("../SimualtionModel/SimualtionModelPage");
const { SimualtionModelDetailsPage } = require("../SimualtionModel/SimualtionModelDetailsPage");


export class SimulationModelManagementPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.simualtionModelPage = new SimualtionModelPage(this.page);
        this.simualtionModelDetailsPage = new SimualtionModelDetailsPage(this.page);

        this.defineSimulationModelButton = '//button[contains(@class, "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-colorPrimary")]';
        this.searchInput = '//form[@data-testid="search-input"]//input';
        this.threeDotsMenu = '//div[@data-testid="three-dots-menu"]';
        this.activate_deactivate_Button = '//li[@data-testid="three-dots-menu-option-0"]';
        this.fieldEnablementStatus = '//div[@data-testid="tag"]';
        this.tableActions = '(//div[contains(@class, "MuiStack-root")])[38]';

        //to be removed after adding data-testid
        this.viewButton = '(//div[contains(@class, "MuiStack-root")])[38]//span//button[@tabindex="0"]';
        this.editButton = '((//div[contains(@class, "MuiStack-root")])[34]//span//button[@tabindex="0"])[2]';
    }

    async clickDefineSimulationModel() {
        await this.page.click(this.defineSimulationModelButton);
    }
    async defineSimulationModel(simulationModelData) {
        await this.clickDefineSimulationModel();
        return await this.simualtionModelPage.fillSimulationModelInfo(simulationModelData);

    }
    async checkNewSimulationModelAdded(simulationModelData, simulationModelstatusActive, editedSimulationModel) {
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
            await this.page.waitForTimeout(5000);
            simulationModelRow = await this.search.getRowInTableWithSpecificText(simulationModelData.getSimulationModelArName());
        }
        else {
            await this.page.waitForTimeout(5000);
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
                simulationModelData.setCreatedSimulationModelId(simulationModelId);
                console.log("Created simulation Model ID set in simulationModelData: " + simulationModelData.getCreatedSimulationModelId());
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
    async clickViewButton(simulationModelData) {
        await this.search.searchOnUniqueRow(this.searchInput, simulationModelData.getCreatedSimulationModelId());
        //tobe removed after adding data-testid
        await this.page.click(this.viewButton);
    }

    /**
     * Clicks the "Edit" button for a specific State Machine entry in the simulationModel table.
     * @param {Object} simulationModelData - The data object containing information about the simulationModelData entry.
     * @returns {Promise<void>} - A promise that resolves when the action is completed.
     */
    async clickEditButton(simulationModelData) {
        await this.search.searchOnUniqueRow(this.searchInput, simulationModelData.getCreatedSimulationModelId());
        //tobe removed after adding data-testid
        await this.page.click(this.editButton);
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
}
module.exports = { SimulationModelManagementPage };