const { SearchPage } = require("../../SharedPages/SearchPage");
const { SubProgramsPage } = require("../SubProgramsManagement/SubProgramsPage");

export class BenefitsManagmentPage {
  constructor(page) {
    this.page = page;
    this.searchInput = '//form[@data-testid="search-input"]//descendant::input';
    this.subProgramsTable = "//table//tbody";
    // this.createSubProgramOption = '//ul[@role="menu"]//li[1]';
    this.dotsLocator;
  }

  async clickOnNewSubProgram(subProgramsData) {
    await this.page.waitForSelector(this.subProgramsTable, {
      state: "visible",
      timeout: 5000,
    });
    await this.page.click(this.createNewSubProgramButton);
    var subProgramsPage = new SubProgramsPage(this.page);
    const result = await subProgramsPage.createNewSubPrograms(subProgramsData);
    return result;
  }

  async searchOnSpecificSubProgram(subProgramsName) {
    let subProgramRow = [];
    subProgramRow = await new SearchPage(this.page).searchOnUniqueRow(
      this.searchInput,
      subProgramsName,
      this.subProgramsTable
    );
    if (!subProgramRow || subProgramRow.length === 0) {
      return null;
    }
    return subProgramRow;
  }

  // async clickOnCreateSubProgram(subProgramsName) {
  //   let lastTd;
  //   let subProgramRow = [];
  //   subProgramRow = await this.searchOnSpecificSubProgram(subProgramsName);
  //   if (subProgramRow && subProgramRow.length > 0) {
  //     lastTd = subProgramRow[subProgramRow.length - 1].tdLocator;
  //     this.dotsLocator = lastTd.locator("div >> button");
  //     await this.dotsLocator.click();
  //     await this.page.waitForSelector(this.createSubProgramOption, {
  //       state: "visible",
  //       timeout: 60000,
  //     });
  //     await this.page.click(this.createSubProgramOption);
  //     console.log("Clicked the Create Sub Program button");
  //   }
  // }

  async checkSubProgramsRowDetails(subProgramsData) {
    let arabicTd;
    let englishTd;
    let arabicName;
    let englishName;
    let subProgramRow = [];

    subProgramRow = await this.searchOnSpecificSubProgram(
      subProgramsData.getArabicSubProgramName()
    );

    if (subProgramRow && subProgramRow.length > 0) {
      arabicTd = subProgramRow[1].tdLocator;
      arabicName = arabicTd.locator("span");
      await arabicName.waitFor({ state: "visible" });
      var actualArabicName = await arabicName.textContent();

      englishTd = subProgramRow[2].tdLocator;
      englishName = englishTd.locator("span");
      await englishName.waitFor({ state: "visible" });
      var actualEnglishName = await englishName.textContent();
    }

    if (
      actualArabicName === subProgramsData.getArabicSubProgramName() &&
      actualEnglishName === subProgramsData.getEnglishSubProgramName()
    ) {
      console.log("Sub Program names matched successfully.");
      let subProgramId = await subProgramRow[0].tdLocator.textContent();
      subProgramsData.setCreatedSubProgramId(subProgramId);
      console.log("Created Sub Program ID set in SubProgramData: " + subProgramId);
      return true;
    }
    return false;
  }
}

module.exports = { SubProgramsManagementPage };
