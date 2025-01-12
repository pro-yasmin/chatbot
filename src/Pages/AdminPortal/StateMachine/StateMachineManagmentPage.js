const { SearchPage } = require("../SharedPages/SearchPage");

export class StateMachineManagmentPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.addButton = '[data-testid="toolbar-add-button"]';
        this.stateMachineTable = "//table//tbody";
        this.searchInput = '//form[@data-testid="search-input"]//descendant::input';

    }


    // Click on Add Button
    async clickAddButton() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector(this.addButton, { visible: true });
        await this.page.click(this.addButton);
    }

    /**
     * Clicks the "View" button for a specific State Machine entry in the stateMachineData table.
     *
     * @param {Object} stateMachineData - The data object containing information about the stateMachineData entry.
     * @param {Function} stateMachineData.getCreatedStateMachineId - A function that returns the ID of the created stateMachineData entry.
     * @returns {Promise<void>} - A promise that resolves when the action is completed.
     */
    async clickViewstateMachineButton(stateMachineData) {
        let stateMachineTableRow = [];
        stateMachineTableRow = await this.search.getRowInTableWithSpecificText(this.stateMachineTable, stateMachineData.getCreatedStateMachineId());
        var actionlocator = "div >> button:nth-of-type(1)";
        await this.search.clickRowAction(stateMachineTableRow, actionlocator);
    }

    /**
     * Clicks the edit button for a specific stateMachineData entry in the State Machine table.
     *
     * @param {Object} stateMachineData - The data object containing information about the stateMachineData entry.
     * @param {Function} stateMachineData.getCreatedState MachineId - A function that returns the ID of the created stateMachineData entry.
     * @returns {Promise<void>} - A promise that resolves when the edit button has been clicked.
     */
    async clickEditstateMachineDataButton(stateMachineData) {
        let stateMachineTableRow = [];
        stateMachineTableRow = await this.search.getRowInTableWithSpecificText(this.stateMachineTable, stateMachineData.getCreatedStateMachineId());
        var actionlocator = "div >> button:nth-of-type(2)";
        await this.search.clickRowAction(stateMachineTableRow, actionlocator);
    }

    /**
     * Checks if a new stateMachineData has been added successfully by verifying the Arabic name, English name, and status.
     * 
     * @param {Object} stateMachineData - The data of the stateMachineData to be checked.
     * @param {Function} stateMachineData.getStateMachineArabicName - Function to get the Arabic name of the stateMachineData.
     * @param {Function} stateMachineData.getStateMachineEnglishName - Function to get the English name of the stateMachineData.
     * @param {Function} stateMachineData.setCreatedStateMachineId - Function to set the created stateMachineData ID.
     * 
     * @returns {Promise<boolean>} - Returns true if the stateMachineData names match the expected values, otherwise false.
     */
    async checkNewStateMachineAdded(stateMachineData) {
        let arabicTd;
        let englishTd;
        let statusTd;
        let stateMachineArabicName;
        let stateMachineEnglishName;
        let stateMachineStatus;
        let stateMachineRow = [];
        stateMachineRow = await this.search.searchOnUniqueRow(this.searchInput, stateMachineData.getStateManagmentArabicName(), this.stateMachineTable);

        if (stateMachineRow && stateMachineRow.length > 0) {
            arabicTd = stateMachineRow[1].tdLocator;
            stateMachineArabicName = arabicTd.locator("span");
            await stateMachineArabicName.waitFor({ state: "visible" });
            var actualStateMachineArabicName = await stateMachineArabicName.textContent();

            console.log("Actual Arabic Name: ", actualStateMachineArabicName);
            console.log("Expected Arabic Name: ", stateMachineData.getStateManagmentArabicName());

            englishTd = stateMachineRow[2].tdLocator;
            stateMachineEnglishName = englishTd.locator("span");
            await stateMachineEnglishName.waitFor({ state: "visible" });
            var actualStateMachineEnglishName = await stateMachineEnglishName.textContent();

            console.log("Actual English Name: ", actualStateMachineEnglishName);
            console.log("Expected English Name: ", stateMachineData.getStateManagmentEnglishName());

            statusTd = stateMachineRow[5].tdLocator;
            stateMachineStatus = statusTd.locator("label>span").nth(1);
            await stateMachineStatus.waitFor({ state: "visible" });
            var actualStateMachineStatus = await stateMachineStatus.textContent();
            console.log("Status: ", actualStateMachineStatus);
        }

        if (
            actualStateMachineArabicName === stateMachineData.getStateManagmentArabicName() &&
            actualStateMachineEnglishName === stateMachineData.getStateManagmentEnglishName() &&
            actualStateMachineStatus === global.testConfig.stateMachine.stateMachineStatusAvailable
        ) {
            console.log("State Machine names matched successfully.");
            let stateMachineId = await stateMachineRow[0].tdLocator.textContent();
            stateMachineData.setCreatedStateMachineId(stateMachineId);
            console.log("Created State Machine ID is: " + stateMachineData.getCreatedStateMachineId());
            return true;
        }
        return false;

    }
}
module.exports = { StateMachineManagmentPage };
