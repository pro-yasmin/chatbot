const { MainProgramManagementPage } = require("./MainProgramManagementPage");
const { SubProgramsManagementPage } = require("../../ProgramsManagement/SubProgramsManagement/SubProgramsManagmentPage");
const { BenefitsManagmentPage } = require("../../ProgramsManagement/BenefitsManagement/BenefitsManagementPage");


/**
 * Represents the Main Program Details page and provides methods for interacting
 * with the main program details, such as managing or editing program-related data.
 * @class
 */
export class MainProgramDetailsPage {
  constructor(page) {
    this.page = page;

    // Selectors for main program details elements
    this.subProgramTab = '//button[@data-testid="tab-2"]';
    this.benefitsTab = '//button[@data-testid="tab-3"]';
    this.createSubProgramBtn = '//button[@type="button" and contains(text(),"تعريف برنامج فرعي")]'; 
  }

  /**
  * Navigates to the "Sub Programs" tab and clicks the "Define Sub Program" button.
  * @returns {Promise<void>} - Completes the action of initiating Sub program creation.
  */
  async InsideCreateSubProgram(mainProgramNumber) {

    var mainProgramManagementPage = new MainProgramManagementPage(this.page);
    await mainProgramManagementPage.openViewMainProgramDetailsPage(mainProgramNumber);
    await this.page.click(this.subProgramTab);
    await this.page.waitForSelector(this.createSubProgramBtn, { state: "visible" });
    await this.page.waitForTimeout(1000);
    await this.page.click(this.createSubProgramBtn);
    await this.page.waitForTimeout(1000);
    console.log("Clicked the Create Sub program button");
  }

  async navigateToSubProgramTab() {
    await this.page.click(this.subProgramTab);
  }
  async navigateToBenefitsTab() {
    await this.page.click(this.benefitsTab);
  }

  /**
* Filter main programs using provided data.
* @param {object} subProgramData - The data object containing sub program details.
* @returns {Promise<boolean>} - Returns true if the sub program filtered successfully.
*/
  async filterSubProgram(location, data, type, streamData, mainProgramData, subProgramsData) {
    await this.navigateToSubProgramTab();
    var subProgramsManagementPage = new SubProgramsManagementPage(this.page);
    const filterResult = await subProgramsManagementPage.filterSubProgram(location, data, type, streamData, mainProgramData, subProgramsData);
    return filterResult;
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

module.exports = { MainProgramDetailsPage };
