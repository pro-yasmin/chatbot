const { PopUpPage }= require('../../SharedPages/PopUpPage');

export class BenefitsPage {
  constructor(page) {

    this.page = page;

    //1-Meta Data Section 
    this.arabicBenefitName = '//input[@name="main.nameAr"]';
    this.englishBenefitName = '//input[@name="main.nameEn"]';
    this.benefitResponsibleEntity = '//div[@id="mui-component-select-governance.designResponsibleGovernance.0.code"]';
    this.mechanism = '//div[@id="mui-component-select-governance.designResponsibleGovernance.0.responsibleCodes"]';
    this.benefitGFSBudget = '//div[@id="mui-component-select-governance.executionResponsibleGovernance.0.code"]';
    this.benefitType = '//div[@id="mui-component-select-governance.executionResponsibleGovernance.0.responsibleCodes"]';
    this.benefitProvider = '//input[@name="cost.budget"]';
    this.benefitEstimatedValue = '//div[@id="mui-component-select-cost.programFundingSourcesCode"]';
    this.defineMetadataBtn = '//button[contains(text(),"تعريف البيانات الوصفية")]'; //'//input[@data-testid="next-button"]'; 
   
    //2-Target Data Section 
    this.assistanceUnit = '//div[@id="mui-component-select-targetingData.assistanceUnitCode"]';
    this.conditionsOfAssistanceUnit ='//input[@name="targetingData.conditionsAssistanceUnits.0.condition"]';
    this.approach ='//input[@name="targetingMechanism.approach"]';
    this.defineTargetingDataBtn = '//button[contains(text(),"تعريف بيانات الاستهداف")]';

    //3-Benefits Features Section
    this.programActivationDate = '//button[@aria-label="Choose date"][1]';
    this.programEndDate ='//button[@aria-label="Choose date"][1]';
    this.programApplicationEnablement ='//input[@name="operatingCharacteristics.applicationEnablement"]';
    this.requireRegistrarApplication='//input[@name="operatingCharacteristics.requireRegisterApplication"]';
    this.applicationChannels='//div[@id="mui-component-select-operatingCharacteristics.applicationChannelCodes"]';
    this.reapplicationAfterExit='//input[@name="resubmitAfterEligible.allowResubmitAfterEligible" and @value="false"]';
    this.reapplicationAfterwithdrawal='//input[@name="resubmitAfterWithdrawal.allowResubmitAfterWithdrawal" and @value="false"]';
    this.defineProgramFeaturesBtn = '//button[contains(text(),"تعريف خصائص البرنامج")]';
    this.createSubProgramBtn = '//button[contains(text(),"تعريف برنامج فرعي")]';
    
    //4-Review Data
    this.successPopupTitle='//span[@id="modal-modal-title"]';
    this.backToSubProgramsList='//button[contains(text(),"العودة لقائمة البرامج الفرعية")]';

  }

  async createNewSubPrograms(subProgramsData) {

    
    var popUpMsg = new PopUpPage(this.page);

    var createdSubProgramsArName = subProgramsData.getArabicSubProgramName();
    var createdSubProgramsEnName = subProgramsData.getEnglishSubProgramName();

    //1-Meta Data Section 
    await this.page.fill(this.arabicSubProgramName, createdSubProgramsArName);
    await this.page.fill(this.englishSubProgramName, createdSubProgramsEnName);
    await this.selectDropdownOption(this.subProgramType);
    await this.selectTodayDate(this.regulationsPublishedDate);
    await this.selectDropdownOption(this.designResponsibleEntity);
    await this.selectDropdownOption(this.responsibleAgency); 
    await this.page.keyboard.press('Tab');
    await this.selectDropdownOption(this.executionEntity);
    await this.selectDropdownOption(this.executionAgency);
    await this.page.keyboard.press('Tab');
    await this.page.fill(this.GFS_Budget, subProgramsData.getGFSBudget());
    await this.selectDropdownOption(this.programFundingSources); 
    await this.page.click(this.movementMechanismRadioBtn);
    await this.page.waitForSelector(this.defineMetadataBtn, { state: 'visible' });
    await this.page.click(this.defineMetadataBtn);

    //2-Target Data Section 
    await this.selectDropdownOption(this.assistanceUnit);
    await this.page.waitForTimeout(1000);
    await this.page.fill(this.conditionsOfAssistanceUnit, subProgramsData.getConditionsOfAssistanceUnit());
    await this.page.click(this.approach);
    await this.page.click(this.defineTargetingDataBtn);

     //3-Program Features Section
     await this.selectTodayDate(this.programActivationDate);
     await this.selectTodayDate(this.programEndDate);
     await this.page.click(this.programApplicationEnablement);
     await this.page.click(this.requireRegistrarApplication);
     await this.selectDropdownOption(this.applicationChannels); 
     await this.page.keyboard.press('Tab');
     await this.page.click(this.reapplicationAfterExit);
     await this.page.click(this.reapplicationAfterwithdrawal);
     await this.page.click(this.defineProgramFeaturesBtn);

    //4-Review Data
    await this.page.waitForTimeout(1000);
    await this.page.click(this.createSubProgramBtn);

    await this.page.waitForTimeout(2000);

    subProgramsData.setArabicSubProgramName(createdSubProgramsArName);
    subProgramsData.setEnglishSubProgramName(createdSubProgramsEnName);

    var result =await popUpMsg.popUpMessage( this.successPopupTitle , this.backToSubProgramsList,global.testConfig.createSubPrograms.subProgramsSuccessMsg);
     return result;

  }


  async selectTodayDate(dateLocator) {
    await this.page.click(dateLocator);
    await this.page.waitForSelector('//div[@role="grid"]', { state: 'visible' });
    await this.page.click('//button[@role="gridcell" and @aria-current="date"]');
  }


  async selectDropdownOption(dropdownLocator) {
    await this.page.click(dropdownLocator);
      var optionsLocator  = `//li[@role="option" and not(@aria-disabled="true") and @tabindex="0"]`;
      await this.page.waitForSelector(optionsLocator , { state: 'visible' });
      var firstOptionLocator = `${optionsLocator}[1]`;
      await this.page.click(firstOptionLocator);  
    }

  }


