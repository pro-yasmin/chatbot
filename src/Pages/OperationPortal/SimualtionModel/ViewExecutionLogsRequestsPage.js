const { SearchPage } = require("../../../Pages/AdminPortal/SharedPages/SearchPage");

export class ViewExecutionLogsRequestsPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
    }

    async verifyExecutionLog(request) {
        let executionStatusTd;

        let executionStatus;
        let simulationModelRow = [];
        await this.page.waitForTimeout(5000);
        simulationModelRow = await this.search.getRowInTableWithSpecificText(request);

        if (simulationModelRow && simulationModelRow.length > 0) {
            executionStatusTd = simulationModelRow[3].tdLocator;
            executionStatus = executionStatusTd.locator("span");
            await executionStatus.waitFor({ state: "visible" });
            var actualExecutionStatus = await executionStatus.textContent();

            console.log("Actual Execution Status: ", actualExecutionStatus);
            console.log("Expected Execution Status: ", global.testConfig.taskDetails.Approved);
        }
        if (actualExecutionStatus === global.testConfig.taskDetails.Approved) {
            console.log("Simulation Model Execution is Approved and Checked in the Execution Logs successfully.");
            return true;
        }
        return false;
    }
}


module.exports = { ViewExecutionLogsRequestsPage };