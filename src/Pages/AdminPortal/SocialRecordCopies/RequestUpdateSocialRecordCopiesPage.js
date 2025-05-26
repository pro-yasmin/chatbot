const { SearchPage } = require("../../SharedPages/SearchPage");

export class RequestUpdateSocialRecordCopiesPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);

        this.searchInput = '//input[@data-testid="search-input-base"]';
        this.requestUpdateSocialRecordCopiesTab = '//a[@data-testid="submenu-social-record-copies-requests"]';
    }

    async getTaskNumberForISRCopy(socialRecordCopiesData) {
        await this.page.click(this.requestUpdateSocialRecordCopiesTab);
        let isrTaskNumberTd;

        let isrTaskNumber;
        let isrTasksRows = [];
        isrTasksRows = await this.search.getFirstRow();

        isrTaskNumberTd = isrTasksRows[0].tdLocator;
        isrTaskNumber = isrTaskNumberTd.locator("span");
        await isrTaskNumber.waitFor({ state: "visible" });
        var taskNumberForIsrCopy = await isrTaskNumber.textContent();
        socialRecordCopiesData.setIsrTaskNumber(taskNumberForIsrCopy);

        console.log("Task Number For ISR Copy: ", socialRecordCopiesData.getIsrTaskNumber());

    }


    async verifyRequestStatus(requestNumber) {
        let requestStatusTd;
        let requestStatus;

        let socialRecordCopiesTableRow = [];
        socialRecordCopiesTableRow = await this.search.searchOnUniqueRow(this.searchInput, requestNumber);
        if (socialRecordCopiesTableRow && socialRecordCopiesTableRow.length > 0) {
            requestStatusTd = socialRecordCopiesTableRow[4].tdLocator;
            requestStatus = requestStatusTd.locator("span");
            await requestStatus.waitFor({ state: "visible" });
            var actualRequestStatus = await requestStatus.textContent();

            console.log("Actual Request Status: ", actualRequestStatus);
            console.log("Expected Request Status: ", global.testConfig.SocialRecordCopies.socialRecordCopyStatusCompleted);
        }
        if (
            actualRequestStatus === global.testConfig.SocialRecordCopies.socialRecordCopyStatusCompleted
        ) {
            console.log("Request Status matched successfully.");
            return true;
        }
        return false;

    }




}
module.exports = { RequestUpdateSocialRecordCopiesPage };