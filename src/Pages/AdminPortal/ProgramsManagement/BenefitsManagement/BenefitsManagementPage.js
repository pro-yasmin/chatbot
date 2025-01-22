const { SearchPage } = require("../../SharedPages/SearchPage");
const { SubProgramsPage } = require("../SubProgramsManagement/SubProgramsPage");

/**
 * Represents the Benefits Management page and provides methods for searching,
 * validating, and managing benefits.
 * @class
 */
export class BenefitsManagmentPage {
  constructor(page) {
    this.page = page;
    this.searchInput = '//form[@data-testid="search-input"]//descendant::input';
    //this.benefitsTable = "//table//tbody";
    this.dotsLocator;
  }

  /**
   * Searches for a specific benefit by its data.
   * @param {string} benefitsData - The benefit data to search for.
   * @returns {Promise<Array|null>} - An array containing row details if found, or null if not found.
   */
  async searchOnSpecificBenefits(benefitsData) {
    let BenefitsRow = [];
    BenefitsRow = await new SearchPage(this.page).searchOnUniqueRow(
      this.searchInput,
      benefitsData,
     );
    if (!BenefitsRow || BenefitsRow.length === 0) {
      return null;
    }
    return BenefitsRow;
  }

  /**
   * Validates that the benefit details match the expected data.
   * @param {object} benefitsData - The data object containing the expected benefit details.
   * @returns {Promise<boolean>} - Returns true if the benefit details match; otherwise, false.
   */
  async checkBenefitsRowDetails(benefitsData) {
    let arabicTd;
    let englishTd;
    let arabicName;
    let englishName;
    let benefitsRow = [];

    // Search for the specific benefit
    benefitsRow = await this.searchOnSpecificBenefits(benefitsData.getArabicBenefitName() );

    if (benefitsRow && benefitsRow.length > 0) {
      // Validate Arabic benefit name
      arabicTd = benefitsRow[1].tdLocator;
      arabicName = arabicTd.locator("span");
      await arabicName.waitFor({ state: "visible" });
      var actualArabicName = await arabicName.textContent();

      // Validate English benefit name
      englishTd = benefitsRow[2].tdLocator;
      englishName = englishTd.locator("span");
      await englishName.waitFor({ state: "visible" });
      var actualEnglishName = await englishName.textContent();
    }
    if (
      actualArabicName === benefitsData.getArabicBenefitName() &&
      actualEnglishName === benefitsData.getEnglishBenefitName()
    ) {
      // Set the created benefit ID in the benefit data object
      console.log("Sub Program names matched successfully.");
      let benefitId = await benefitsRow[0].tdLocator.textContent();
      benefitsData.setCreatedBenefitId(benefitId);
      console.log("Created Benefits ID set in Benefits Data: " + benefitId);
      return true;
    }
    return false;
  }
}

module.exports = { BenefitsManagmentPage };
