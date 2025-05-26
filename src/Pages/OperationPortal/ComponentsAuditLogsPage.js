const { SearchPage } = require("../SharedPages/SearchPage");

export class ComponentsAuditLogsPage {
  //Page Construtor
  constructor(page) {
    this.page = page;
    this.search = new SearchPage(page);

    this.searchInput = '//div[@data-testid="search-input"]//input';
  }

  async verifyObjectAddedToAuditLogs(objectID) {
    let changeCreatorTd;
    let changeStatusTd;

    let changeCreator;
    let changeStatus;
    let objectRow = [];

    objectRow = await this.search.searchOnUniqueRow(this.searchInput, objectID);
    if (objectRow && objectRow.length > 0) {

      changeCreatorTd = objectRow[4].tdLocator;
      changeCreator = changeCreatorTd.locator("span");
      await changeCreator.waitFor({ state: "visible" });
      var actualChangeCreator = await changeCreator.textContent();

      console.log("Actual change Creator: ", actualChangeCreator);

      changeStatusTd = objectRow[8].tdLocator;
      changeStatus = changeStatusTd.locator("span");
      await changeStatus.waitFor({ state: "visible" });
      var actualChangeStatus = await changeStatus.textContent();

      console.log("Actual Change Status: ", actualChangeStatus);

      if (
        actualChangeCreator === global.testConfig.SimulationModels.changeCreatorSameUser &&
        actualChangeStatus === global.testConfig.SimulationModels.changeStatusSuccess
      ) {
        console.log("Object Information matched successfully.");
        return true;
      }
      return false;
    }
    else {
      console.log("Objectl Row length = " + objectRow.length);
    }

  }
}

module.exports = { ComponentsAuditLogsPage };
