import { TIMEOUT } from 'dns';

const { PopUpPage }= require('../SharedPages/PopUpPage');

export class MainProgramPage {
  constructor(page) {
    this.page = page;
    this.arabicProgramNameField = '//input[@name="nameAr"]';
    this.englishProgramNameField = '//input[@name="nameEn"]';
    this.responsibleEntityDropdown = '//div[@id="mui-component-select-responsibleId"]';
    this.arabicProgramDescriptionField = '//textarea[@name="descriptionAr"]';
    this.englishProgramDescriptionField = '//textarea[@name="descriptionEn"]';
    this.yearDropdown = '//div[@id="mui-component-select-estimatedBudgets.0.yearId"]';
    this.estimatedBudgetField = '//input[@name="estimatedBudgets.0.estimatedBudget"]';
    this.calculationMethodField = '//textarea[@name="calculationMethod"]';
    this.riskCategoryDropdown = '//div[@id="mui-component-select-targetedRiskCoverages.0.riskCategoryId"]';
    this.risksDropdown = '//div[@id="mui-component-select-targetedRiskCoverages.0.risks.0.riskId"]';
    this.riskArabicDescriptionField = '//textarea[@name="targetedRiskCoverages.0.risks.0.descriptionAr"]'; 
    this.riskEnglishDescriptionField = '//textarea[@name="targetedRiskCoverages.0.risks.0.descriptionEn"]';
    this.arabicProgramGoalField = '//textarea[@name="programGoals.0.nameAr"]';
    this.englishProgramGoalField = '//textarea[@name="programGoals.0.nameEn"]'; 
    this.defineMainProgramButton = '//button[@type="submit"]';
    this.successPopupTitle= '//span[@id="modal-modal-title"]';
    this.backToMainProgramList = '//button[contains(text(),"العودة إلى قائمة البرامج الرئيسية")]';
  }

  async createNewMainProgram(mainProgramData) {

    
    var popUpMsg = new PopUpPage(this.page);

    var createdMainProgramArName = mainProgramData.getArabicMainProgramName();
    var createdMainProgramEnName = mainProgramData.getEnglishMainProgramName();

    await this.page.fill(this.arabicProgramNameField, mainProgramData.getArabicMainProgramName());
    await this.page.fill(this.englishProgramNameField, mainProgramData.getEnglishMainProgramName());
    await this.selectDropdownOption(this.responsibleEntityDropdown, mainProgramData.getResponsibleEntity()); 
    await this.page.fill(this.arabicProgramDescriptionField, mainProgramData.getArabicMainProgramDescription());
    await this.page.fill(this.englishProgramDescriptionField, mainProgramData.getEnglishMainProgramDescription());
    await this.selectDropdownOption(this.yearDropdown, mainProgramData.getYear()); 
    await this.page.fill(this.estimatedBudgetField, mainProgramData.getEstimatedBudget());
    await this.page.fill(this.calculationMethodField, mainProgramData.getCalculationMethod());
    await this.selectDropdownOption(this.riskCategoryDropdown, mainProgramData.getRiskCategory()); 
    await this.page.fill(this.riskArabicDescriptionField, mainProgramData.getRiskArabicDescription());
    await this.page.fill(this.riskEnglishDescriptionField, mainProgramData.getRiskEnglishDescription());
    await this.selectDropdownOption(this.risksDropdown, mainProgramData.getRisks()); 
    await this.page.fill(this.arabicProgramGoalField, mainProgramData.getArabicMainProgramGoal());
    await this.page.fill(this.englishProgramGoalField, mainProgramData.getEnglishMainProgramGoal());
  

  await this.page.click(this.defineMainProgramButton);

  mainProgramData.setArabicMainProgramName(createdMainProgramArName);
  mainProgramData.setEnglishMainProgramName(createdMainProgramEnName);

  var result =await popUpMsg.popUpMessage( this.successPopupTitle , this.backToMainProgramList,global.testConfig.createMainProgram.mainProgramSuccessMsg);
  return result;
  }


   async selectDropdownOption(dropdownLocator, value) {
    await this.page.click(dropdownLocator); 
    // if about el value , or index
    const optionLocator = `//li[@role="option" and contains(text(),"${value}")]`;
    await this.page.waitForSelector(optionLocator, { state: 'visible'});
    await this.page.click(optionLocator); 

  }

  }



