const { SearchPage } = require("../../SharedPages/SearchPage");
const { SubProgramsPage } = require("../SubProgramsManagement/SubProgramsPage");

export class BenefitsManagmentPage {
  constructor(page) {
    this.page = page;
    this.searchInput = '//form[@data-testid="search-input"]//descendant::input';
    this.benefitsTable = "//table//tbody";
    this.dotsLocator;
  }

  async searchOnSpecificBenefits(benefitsData) {
    let BenefitsRow = [];
    BenefitsRow = await new SearchPage(this.page).searchOnUniqueRow(
      this.searchInput,
      benefitsData,
      this.benefitsTable
    );
    if (!BenefitsRow || BenefitsRow.length === 0) {
      return null;
    }
    return BenefitsRow;
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

  async checkBenefitsRowDetails(benefitsData) {
    let arabicTd;
    let englishTd;
    let arabicName;
    let englishName;
    let benefitsRow = [];

    benefitsRow = await this.searchOnSpecificBenefits(
      benefitsData.getArabicBenefitName()
    );

    if (benefitsRow && benefitsRow.length > 0) {
      arabicTd = benefitsRow[1].tdLocator;
      arabicName = arabicTd.locator("span");
      await arabicName.waitFor({ state: "visible" });
      var actualArabicName = await arabicName.textContent();

      englishTd = benefitsRow[2].tdLocator;
      englishName = englishTd.locator("span");
      await englishName.waitFor({ state: "visible" });
      var actualEnglishName = await englishName.textContent();
    }

    if (
      actualArabicName === benefitsData.getArabicBenefitName() &&
      actualEnglishName === benefitsData.getEnglishBenefitName()
    ) {
      console.log("Sub Program names matched successfully.");
      let benefitsId = await benefitsRow[0].tdLocator.textContent();
      benefitsData.setCreatedBenefitId(benefitsId);
      console.log("Created Benefits ID set in Benefits Data: " + benefitsId);
      return true;
    }
    return false;
  }
}

module.exports = { BenefitsManagmentPage };
