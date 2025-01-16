import { features } from 'process';

const { PopUpPage }= require('../../SharedPages/PopUpPage');

export class BenefitsPage {
  constructor(page) {

    this.page = page;

    //1-Meta Data Section 
    this.arabicBenefitName = '//input[@name="nameAr"]';
    this.englishBenefitName = '//input[@name="nameEn"]';
    this.benefitResponsibleEntity = '//div[@id="mui-component-select-responsibleCode"]';
    this.mechanism = '//input[@name="mechanism" and @value="FULL"]';
    this.benefitGFSBudget = '//input[@name="benefitDetails.budget"]';
    this.benefitType = '//input[@name="benefitType" and @type="radio"]';
    this.cashBenefitNature = '//div[@id="mui-component-select-benefitDetails.nature.value"]';
    this.benefitProvider = '//div[@id="mui-component-select-benefitDetails.providerCodes"]';
    this.benefitEstimatedValue = '//input[@name="benefitDetails.estimatedValue"]';
    this.defineMetadataBtn = '//button[contains(text(),"تعريف البيانات الوصفية")]'; 
   
    //2-Target Data Section 
    this.defineTargetingDataBtn = '//button[contains(text(),"تعريف بيانات الاستهداف")]';

    //3-Benefits Features Section
    this.assessmentNeedinput ='//input[@name="assessmentNeed" and @value="false"]';
    this.meritRecurrencePattern ='//div[@id="mui-component-select-entitlementPeriod.pattern"]';
    this.meritRecurrenceStartDate ='//button[@aria-label="Choose date"][1]';
    this.meritRecurrenceEndDate='//button[@aria-label="Choose date"][1]';
    this.selectDateBtn = '//button[contains(text(),"تحديد")]';
    this.benefitRecurrenceRate='//div[@id="mui-component-select-pace.value"]';
    this.benefitLimitationRate='//input[@name="pace.children.0" and @value="ongoing"]';
    this.aidRecurrencePattern ='//div[@id="mui-component-select-frequencyOfPeriodic.pattern"]'
    this.aidRecurrenceStartDate ='//button[@aria-label="Choose date"][1]';
    this.aidRecurrenceEndDate ='//button[@aria-label="Choose date"][1]'
    this.mechanismBenefitamount ='//div[@id="mui-component-select-calculation.benefitCalculationMechanism"]';
    this.benefitReceivingEntity ='//div[@id="mui-component-select-receivingEntity"]';
    this.entity ='//input[@name="entity"]';
    this.featuresActivationDate = '//button[@aria-label="Choose date"][1]';
    this.featuresEndDate = '//button[@aria-label="Choose date"][1]';
    this.applicationEnablement ='//input[@name="applicationEnablement"and @value="PERMANENT"]';
    this.requireRegistrarApplication ='//input[@name="requireRegisterApplication"and @value="true"]';
    this.applicationChannels ='//div[@id="mui-component-select-applicationChannelCodes"]';
    this.defineBenefitsFeaturesBtn = '//button[@data-testid="next-button"]';
    
    //4-Review Data
    this.createBenefitBtn = '//button[@data-testid="next-button"]';
    this.successPopupTitle= '//span[@id="modal-modal-title"]';
    this.backToBenefitsList ='//button[contains(text(),"العودة لقائمة الإعانات")]';

  }

  async createNewBenefits(benefitsData) {
    var popUpMsg = new PopUpPage(this.page);

    var createdBenefitsArName = benefitsData.getArabicBenefitName();
    var createdBenefitsEnName = benefitsData.getEnglishBenefitName();

    //1-Meta Data Section 
    await this.page.fill(this.arabicBenefitName, createdBenefitsArName);
    await this.page.fill(this.englishBenefitName, createdBenefitsEnName);
    await this.selectDropdownOption(this.benefitResponsibleEntity);
    await this.page.click(this.mechanism);
    await this.page.fill(this.benefitGFSBudget, benefitsData.getgetbenefitsGFSBudget());
    await this.page.click(this.benefitType);
    await this.page.waitForSelector(this.cashBenefitNature, { state: 'visible'});
    await this.selectDropdownOption(this.cashBenefitNature);
    await this.selectDropdownOption(this.benefitProvider);
    await this.page.keyboard.press('Tab');
    await this.page.fill(this.benefitEstimatedValue, benefitsData.getbenefitEstimatedValue());
    await this.page.click(this.defineMetadataBtn);

    //2-Target Data Section 
    await this.page.waitForSelector(this.defineTargetingDataBtn, { state: 'visible' });
    await this.page.click(this.defineTargetingDataBtn);
    await this.page.waitForTimeout(3000);


    //3-Benefits Features Section
    await this.page.waitForSelector(this.assessmentNeedinput, { state: 'visible' });
    await this.page.click(this.assessmentNeedinput);
    await this.selectDropdownOption(this.meritRecurrencePattern); 
    await this.page.waitForSelector(this.meritRecurrenceStartDate, { state: 'visible' });
    await this.selectTodayDateWithBtn(this.meritRecurrenceStartDate);
    await this.selectTodayDateWithBtn(this.meritRecurrenceEndDate);
    await this.selectDropdownOption(this.benefitRecurrenceRate);
    await this.page.click(this.benefitLimitationRate);
    await this.selectDropdownOption(this.aidRecurrencePattern); 
    await this.page.waitForSelector(this.aidRecurrenceStartDate, { state: 'visible' });
    await this.selectTodayDateWithBtn(this.aidRecurrenceStartDate);
    await this.selectTodayDateWithBtn(this.aidRecurrenceEndDate);
    await this.selectDropdownOption(this.mechanismBenefitamount);
    await this.selectDropdownOption(this.benefitReceivingEntity);
    await this.page.waitForSelector(this.entity, { state: 'visible' });
    await this.page.fill(this.entity, benefitsData.getentity());
    await this.selectTodayDate(this.featuresActivationDate);
    await this.selectTodayDate(this.featuresEndDate);
    await this.page.click(this.applicationEnablement);
    await this.page.click(this.requireRegistrarApplication);
    await this.selectDropdownOption(this.applicationChannels);
    await this.page.keyboard.press('Tab');
    await this.page.click(this.defineBenefitsFeaturesBtn);
    await this.page.waitForTimeout(5000);

    //4-Review Data
    await this.page.click(this.defineBenefitsFeaturesBtn);
    await this.page.waitForTimeout(5000);
      
    benefitsData.setArabicBenefitName(createdBenefitsArName);
    benefitsData.setEnglishBenefitName(createdBenefitsEnName);

    var result =await popUpMsg.popUpMessage(this.backToBenefitsList ,global.testConfig.createBenefits.benefitsSuccessMsg);
    return result;

  }


  async selectTodayDate(dateLocator) {
    await this.page.click(dateLocator);
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector('//div[@role="grid"]', { state: 'visible' });
    await this.page.click('//button[@role="gridcell" and not(contains(@class, "Mui-disabled"))]');
  }

  async selectTodayDateWithBtn(dateLocator) {
    await this.page.click(dateLocator);
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector('//div[@role="grid"]', { state: 'visible' });
    await this.page.click('//button[@role="gridcell" and @aria-current="date"]');
    await this.page.click(this.selectDateBtn);

  }

  async selectDropdownOption(dropdownLocator) {
      await this.page.click(dropdownLocator);
      var optionsLocator  = `//li[@role="option" and not(@aria-disabled="true") and @tabindex="0"]`;
      await this.page.waitForSelector(optionsLocator , { state: 'visible' });
      var firstOptionLocator = `${optionsLocator}[1]`;
      await this.page.click(firstOptionLocator);  
    }

  }


