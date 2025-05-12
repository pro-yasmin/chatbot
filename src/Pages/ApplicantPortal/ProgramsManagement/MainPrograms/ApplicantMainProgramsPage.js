const { SearchPage } = require("../../SearchPage");

export class ApplicantMainProgramsPage {
  constructor(page) {
    this.page = page;
    this.search = new SearchPage(this.page);

    // Selectors for main program page
    this.mainProgramWord = '//span[@class="MuiTypography-root MuiTypography-displaySm-bold muirtl-1a6qwee"]';
    this.mainProgramSearchInput = '//div[@data-testid="Search-input"]';
    this.mainProgramViewBtn = '//a[@data-testid="main-programs-view-button"][1]'; 
  }

  async verifyMainPrograms() {
    await this.page.waitForSelector(this.mainProgramSearchInput, { state: "visible", timeout: 5000 });
    return await this.page.locator(this.mainProgramSearchInput).isVisible();
  }

  async openMainProgramDetails(mainProgramName) {
    let requestTd, requestType;
        fieldRow = await this.search.getRowInTableWithSpecificText(mainProgramName);

    if (fieldRow && fieldRow.length > 0) {
      requestTd = fieldRow[0].tdLocator;
      requestType = requestTd.locator("p");
      await requestType.waitFor({ state: "visible" });
      var actualMainProgramName = await requestType.textContent();
    }

    if (actualMainProgramName === mainProgramName) {
          await this.search.clickRowAction(fieldRow, this.tableActions, this.mainProgramViewBtn);
      console.log("Main Program Details Page opened successfully");
      return true;
    }
    return false;
  }
}
module.exports = { ApplicantMainProgramsPage };