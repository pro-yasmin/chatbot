const { SubProgramsManagementPage } = require("./SubProgramsManagmentPage");
const { BenefitsManagmentPage } = require("../../ProgramsManagement/BenefitsManagement/BenefitsManagementPage");


/**
 * Represents the Sub Program Details page and provides methods for interacting
 * with the sub program details, such as managing or editing sub program-related data.
 * @class
 */
export class SubProgramDetailsPage {
  constructor(page) {
    this.page = page;

    // Selectors for sub program details elements
    this.detailsTab = '//button[@id="tab-3"]';
    this.benefitsTab = '//button[@data-testid="tab-4"]';
    this.createBenefitBtn = '//button[@type="button" and contains(text(),"تعريف إعانة")]';
  }

  /**
   * Navigates to the "Details" tab and clicks the "Define Benefits" button.
   * @returns {Promise<void>} - Completes the action of initiating Benefits details creation.
   */
  async insideCreateBenefits() {
    await this.page.click(this.detailsTab);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector(this.createBenefitBtn, {state: "visible"});
    //await this.page.waitForTimeout(5000);
    await this.page.click(this.createBenefitBtn);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    //await this.page.waitForTimeout(1000);
    console.log("Clicked the Create Benefits button");  
  }
  async navigateToBenefitsTab() {
    await this.page.click(this.benefitsTab);
  }
    /**
  * Filter Benefits using provided data.
  * @param {object} benefitsData - The data object containing benefits details.
  * @returns {Promise<boolean>} - Returns true if the benefits filtered successfully.
  */
    async filterBenefit(location, data, type, streamData, mainProgramData, subProgramData, benefitsData) {
      await this.navigateToBenefitsTab();
      var benefitsManagmentPage = new BenefitsManagmentPage(this.page);
      const filterResult = await benefitsManagmentPage.filterBenefit(location, data, type, streamData, mainProgramData, subProgramData, benefitsData);
      return filterResult;
    }
}

module.exports = { SubProgramDetailsPage };
