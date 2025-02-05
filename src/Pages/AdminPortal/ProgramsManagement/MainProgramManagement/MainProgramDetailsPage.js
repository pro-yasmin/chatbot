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

    this.programId = '//span[@data-testid="value_main-program-serialNumber"]'
    this.streamName = '//span[@data-testid="value_main-program-stream"]'
    this.arabicProgramName = '//span[@data-testid="value_main-program-name-ar"]'
    this.englishProgramName= '//span[@data-testid="value_main-program-name-en"]'
    this.arabicProgramDescription= '//span[@data-testid="value_main-program-description-ar"]'
    this.englishProgramDescription= '//span[@data-testid="value_main-program-description-en"]'
    this.responsibleEntity= '//span[@data-testid="value_responsible-entity"]'
    this.estimatedBudget= '//span[@data-testid="value_main-program-estimated-budget"]'
    this.year= '//span[@data-testid="value_main-program-year"]'
    this.calculationMethod= '//span[@data-testid="value_main-program-calculation-method"]'
    this.riskCategory= '//span[@data-testid="value_main-program-risk-category-0"]'
    this.risks= '//span[@data-testid="value_main-program-risk-0"]'
    this.arabicRiskDescription= '//span[@data-testid="value_main-program-risk-description-ar"]'
    this.englishRiskDescription= '//span[@data-testid="value_main-program-risk-description-en"]'


  }

  /**
  * Navigates to the "Sub Programs" tab and clicks the "Define Sub Program" button.
  * @returns {Promise<void>} - Completes the action of initiating Sub program creation.
  */
  async InsideCreateSubProgram() {
    await this.page.click(this.subProgramTab);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await this.page.waitForSelector(this.createSubProgramBtn, {state: "visible"});
    //await this.page.waitForTimeout(1000);
    await this.page.click(this.createSubProgramBtn);
    await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    //await this.page.waitForTimeout(1000);
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

/**
 * Retrieves all main program details displayed on the UI dynamically.
 * @returns {Promise<object>} - Object containing all main program details.
 */
async getUiMainProgramDetails() {
  var programId = await this.page.locator(this.programId).textContent();
  // var streamName = await this.page.locator(this.streamName).textContent(); streamName
  var arabicProgramName = await this.page.locator(this.arabicProgramName).textContent();
  var englishProgramName = await this.page.locator(this.englishProgramName).textContent();
  var arabicProgramDescription = await this.page.locator(this.arabicProgramDescription).textContent();
  var englishProgramDescription = await this.page.locator(this.englishProgramDescription).textContent();
  var responsibleEntity = await this.page.locator(this.responsibleEntity).textContent();
  var estimatedBudget = await this.page.locator(this.estimatedBudget).textContent();
  var year = await this.page.locator(this.year).textContent();
  var calculationMethod = await this.page.locator(this.calculationMethod).textContent();
  var riskCategory = await this.page.locator(this.riskCategory).textContent();
  var risks = await this.page.locator(this.risks).textContent();
  var arabicRiskDescription = await this.page.locator(this.arabicRiskDescription).textContent();
  var englishRiskDescription = await this.page.locator(this.englishRiskDescription).textContent();
  
  return {
      programId,arabicProgramName,englishProgramName,arabicProgramDescription,englishProgramDescription,
      responsibleEntity,estimatedBudget,year,calculationMethod,riskCategory,risks,
      arabicRiskDescription,englishRiskDescription
  };
}

/**
 * Compares main program details from the UI with expected data.
 * @param {object} createdData - The expected main program details.
 * @returns {boolean} - Returns true if all details match, otherwise false.
 */
async compareMainProgramDetails(createdData , mainProgramNumber) {
  var uiDetails = await this.getUiMainProgramDetails();

  var programId = mainProgramNumber;
  // var streamName = createdData.getStreamName();
  var arabicProgramName = createdData.getArabicMainProgramName();
  var englishProgramName = createdData.getEnglishMainProgramName();
  var arabicProgramDescription = createdData.getArabicMainProgramDescription();
  var englishProgramDescription = createdData.getEnglishMainProgramDescription();
  var responsibleEntity = createdData.getResponsibleEntity();
  var estimatedBudget = createdData.getEstimatedBudget();
  var year = createdData.getYear();
  var calculationMethod = createdData.getCalculationMethod();
  var riskCategory = createdData.getRiskCategory();
  var risks = createdData.getRisks();
  var arabicRiskDescription = createdData.getRiskArabicDescription();
  var englishRiskDescription = createdData.getRiskEnglishDescription();
//       uiDetails.streamName === streamName &&
  var result =  uiDetails.programId === programId &&
                uiDetails.arabicProgramName === arabicProgramName &&
                uiDetails.englishProgramName === englishProgramName &&
                uiDetails.arabicProgramDescription === arabicProgramDescription &&
                uiDetails.englishProgramDescription === englishProgramDescription &&
                uiDetails.responsibleEntity === responsibleEntity &&
                uiDetails.estimatedBudget === estimatedBudget &&
                uiDetails.year === year &&
                uiDetails.calculationMethod === calculationMethod &&
                uiDetails.riskCategory === riskCategory &&
                uiDetails.risks === risks &&
                uiDetails.arabicRiskDescription === arabicRiskDescription &&
                uiDetails.englishRiskDescription === englishRiskDescription 
      
  if (result) {
      console.log("All Main Program Details Match");
  } else {
      console.log("Main Program Details Mismatch Found");
  }

  return result;
}


  
}

module.exports = { MainProgramDetailsPage };
