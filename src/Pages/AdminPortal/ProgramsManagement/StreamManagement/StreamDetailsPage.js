const { StreamManagementPage } = require("./StreamManagementPage");
const { MainProgramManagementPage } = require("../../ProgramsManagement/MainProgramManagement/MainProgramManagementPage");
const { SubProgramsManagementPage } = require("../../ProgramsManagement/SubProgramsManagement/SubProgramsManagmentPage");
const { BenefitsManagmentPage } = require("../../ProgramsManagement/BenefitsManagement/BenefitsManagementPage");

/**
 * Represents the Stream Details page and provides methods for interacting
 * with the stream details, such as navigating to and creating main programs.
 * @class
 */
export class StreamDetailsPage {
  constructor(page) {
    this.page = page;

    // Selectors for stream details elements
    this.mainProgramTab = '//button[@data-testid="tab-2"]';
    this.subProgramTab = '//button[@data-testid="tab-3"]';
    this.benefitsTab = '//button[@data-testid="tab-4"]';
    this.createMainProgramBtn = '//button[@type="button" and contains(text(),"تعريف برنامج رئيسي")]';

  }


  /**
 * Navigates to the "Main Program" tab and clicks the "Create Main Program" button.
 * @returns {Promise<void>} - Completes the action of initiating main program creation.
 */
  async InsideCreateMainProgram() {
    await this.page.click(this.mainProgramTab);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector(this.createMainProgramBtn, {state: "visible"});
   // await this.page.waitForTimeout(1000);
    await this.page.click(this.createMainProgramBtn);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
   // await this.page.waitForTimeout(1000);
    console.log("Clicked the Create Main program button");  
    }

  async navigateToMainProgramTab() {
    await this.page.click(this.mainProgramTab);
  }
  async navigateToSubProgramTab() {
    await this.page.click(this.subProgramTab);
  }
  async navigateToBenefitsTab() {
    await this.page.click(this.benefitsTab);
  }

  /**
  * Filter main programs using provided data.
  * @param {object} mainProgramData - The data object containing main program details.
  * @returns {Promise<boolean>} - Returns true if the main program filtered successfully.
  */
  async filterMainProgram(location, data, type, streamData, mainProgramData) {
    await this.navigateToMainProgramTab();
    var mainProgramManagementPage = new MainProgramManagementPage(this.page);
    const filterResult = await mainProgramManagementPage.filterMainProgram(location, data, type, streamData, mainProgramData);
    return filterResult;
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
* Filter main programs using provided data.
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

module.exports = { StreamDetailsPage };
