const { SubProgramsManagementPage } = require("./SubProgramsManagmentPage");


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
    this.createBenefitBtn = '//button[@type="button" and contains(text(),"تعريف إعانة")]';
  }

  /**
   * Navigates to the "Details" tab and clicks the "Define Benefits" button.
   * @returns {Promise<void>} - Completes the action of initiating Benefits details creation.
   */
  async insideCreateBenefits(subProgramNumber) {
    var subProgramsManagementPage = new SubProgramsManagementPage(this.page);
    await subProgramsManagementPage.openViewSubProgramDetailsPage(subProgramNumber);
    await this.page.click(this.detailsTab);
    await this.page.waitForSelector(this.createBenefitBtn, {state: "visible"});
    await this.page.waitForTimeout(5000);
    await this.page.click(this.createBenefitBtn);
    await this.page.waitForTimeout(1000);
    console.log("Clicked the Create Benefits button");  
  }
}

module.exports = { SubProgramDetailsPage };
