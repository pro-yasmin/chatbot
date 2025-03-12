const { SearchPage } = require("../../AdminPortal/SharedPages/SearchPage");


export class SimulationModelVersionsViewPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);

        this.searchInput = '//form[@data-testid="search-input"]//input';
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

                statusTd = simulationModelRow[9].tdLocator;
                simulationModelStatus = statusTd.locator("span");
                await simulationModelStatus.waitFor({ state: "visible" });
                var actualSimulationModelStatus = await simulationModelStatus.textContent();

                console.log("Actual Status: ", actualSimulationModelStatus);

                activationStatusTd = simulationModelRow[10].tdLocator;
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
                }
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

                statusTd = simulationModelRow[9].tdLocator;
                simulationModelStatus = statusTd.locator("span");
                await simulationModelStatus.waitFor({ state: "visible" });
                var actualSimulationModelStatus = await simulationModelStatus.textContent();

                console.log("Actual Status: ", actualSimulationModelStatus);

                activationStatusTd = simulationModelRow[10].tdLocator;
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
}
module.exports = { SimulationModelVersionsViewPage };