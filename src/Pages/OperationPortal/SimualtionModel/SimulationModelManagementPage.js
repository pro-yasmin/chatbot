const { SearchPage } = require("../../../Pages/AdminPortal/SharedPages/SearchPage");
const { SimualtionModelPage } = require("../SimualtionModel/SimualtionModelPage");


export class SimulationModelManagementPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.simualtionModelPage = new SimualtionModelPage(this.page);
        this.defineSimulationModelButton = '//button[contains(@class, "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeSmall MuiButton-containedSizeSmall MuiButton-colorPrimary")]';
        
        this.searchInput = '//input[@data-testid="search-input-base"]';
        this.threeDotsMenu = '//div[@data-testid="three-dots-menu"]';
        this.activate_deactivate_Button = '//li[@data-testid="three-dots-menu-option-0"]';
        this.fieldEnablementStatus = '//div[@data-testid="tag"]';
    }

    async defineSimulationModel(simulationModelData) {
        await this.clickDefineSimulationModel();
        await this.simualtionModelPage.fillSimulationModelInfo(simulationModelData);
        
    }

    async clickDefineSimulationModel() {
        await this.page.click(this.defineSimulationModelButton);
    }

    /**
     * Activates a field library entry if it is currently deactivated.
     * @returns {Promise<void>} - A promise that resolves when the action is completed.
     */
    async activateFieldLibrary() {
        await this.navigateToApprovedFieldsTab();
        let fieldLibraryTableRow = [];
        fieldLibraryTableRow = await this.search.searchOnUniqueRow(this.searchInput, global.testConfig.FieldLibrary.unlockedField);
        if (fieldLibraryTableRow && fieldLibraryTableRow.length > 0) {
            var actualFieldEnablementStatus = await (await this.page.$(this.fieldEnablementStatus)).textContent();
        }
        if (actualFieldEnablementStatus === global.testConfig.FieldLibrary.fieldEnablementStatusDeactivated) {
            console.log("field Enablement Status is Deactivated");
            await this.page.click(this.threeDotsMenu);
            await this.page.click(this.activate_deactivate_Button);
            await this.fieldLibrary.activateToggle();
            return true;
        }
        return false;
    }

    /**
     * Deactivates a field library entry if it is currently Activated.
     * @returns {Promise<void>} - A promise that resolves when the action is completed.
     */
    async deactivateFieldLibrary() {
        let fieldLibraryTableRow = [];
        fieldLibraryTableRow = await this.search.searchOnUniqueRow(this.searchInput, global.testConfig.FieldLibrary.unlockedField);
        if (fieldLibraryTableRow && fieldLibraryTableRow.length > 0) {
            var actualFieldEnablementStatus = await (await this.page.$(this.fieldEnablementStatus)).textContent();
        }
        if (actualFieldEnablementStatus === global.testConfig.FieldLibrary.fieldEnablementStatusActivated) {
            console.log("field Enablement Status is Activated");
            await this.page.click(this.threeDotsMenu);
            await this.page.click(this.activate_deactivate_Button);
            await this.fieldLibrary.deactivateToggle();
            return true;
        }
        return false;
    }

    /**
     * Deactivates a field library entry if it is currently Activated.
     * @returns {Promise<void>} - A promise that resolves when the action is completed.
     */
    async deactivateFieldLibraryForBlockedFieldLibrary() {
        await this.navigateToApprovedFieldsTab();
        let fieldLibraryTableRow = [];
        fieldLibraryTableRow = await this.search.searchOnUniqueRow(this.searchInput, global.testConfig.FieldLibrary.lockedField);
        if (fieldLibraryTableRow && fieldLibraryTableRow.length > 0) {
            var actualFieldEnablementStatus = await (await this.page.$(this.fieldEnablementStatus)).textContent();
        }
        if (actualFieldEnablementStatus === global.testConfig.FieldLibrary.fieldEnablementStatusActivated) {
            console.log("field Enablement Status is Activated");
            await this.page.click(this.threeDotsMenu);
            await this.page.click(this.activate_deactivate_Button);
            await this.fieldLibrary.deactivateToggleForBlockedFieldLibrary();
            return true;
        }
        return false;
    }
}
module.exports = { SimulationModelManagementPage };