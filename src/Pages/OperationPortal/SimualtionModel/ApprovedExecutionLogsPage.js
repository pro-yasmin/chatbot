const { SearchPage } = require("../../AdminPortal/SharedPages/SearchPage");

export class ApprovedExecutionLogsPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
    }

    async verifyExecutionRequestInApprovedLogs(request) {
        let simulationModelRow = [];
        await this.page.waitForTimeout(5000);
        simulationModelRow = await this.search.getRowInTableWithSpecificText(request);

        if (simulationModelRow && simulationModelRow.length > 0) {
            console.log("Simulation Model Execution is exeist in Approved Execution Logs page.");
            return true;
        }
        return false;
    }
}


module.exports = { ApprovedExecutionLogsPage };