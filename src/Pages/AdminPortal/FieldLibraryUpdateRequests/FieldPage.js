
// const { PopUpPage } = require("../../SharedPages/PopUpPage");

/**
 * Represents the Field page and manages the creation of new Field,
 * including filling out metadata, targeting data, and feature details.
 * @class
 */
export class FieldPage {
  constructor(page) {
    this.page = page;

    // Selectors for metadata section
    this.arabicFieldName = '//input[@name="data[arabicFieldName]"]';
    this.englishFieldName = '//input[@name="data[englishFieldName]"]';
    this.fieldType ='//div[contains(@class, "ui fluid selection dropdown")][.//select[@name="data[fieldType]"]]';
    this.parentLocator ='//input[@data-testid="assigned-domain"]';
    this.fieldNature ='//div[contains(@class, "ui fluid selection dropdown")][.//select[@name="data[fieldNature]"]]';
    this.arabicFieldDescription = '//textarea[@name="data[arabicFieldDescription]"]';
    this.englishFieldDescription = '//textarea[@name="data[englishFieldDescription]"]';
    this.fieldDataDefinitionBtn ='//button[@data-testid="next-button"]';
    // Selectors for targeting data section
    this.defineTargetingDataBtn ='//button[contains(text(),"تعريف بيانات الاستهداف")]';
    // Selectors for Field features section
    this.assessmentNeedinput ='//input[@name="assessmentNeed" and @value="false"]';
    this.meritRecurrencePattern ='//div[@id="mui-component-select-entitlementPeriod.pattern"]';
    // this.meritRecurrenceStartDate = '//button[@aria-label="Choose date"][1]';
    // this.meritRecurrenceEndDate = '//button[@aria-label="Choose date"][1]'; 
    this.meritRecurrenceStartDate = '//button[@aria-label="picker-button-entitlementPeriod.startDate"]';
    this.meritRecurrenceEndDate = '//button[@aria-label="picker-button-entitlementPeriod.endDate"]';
    this.selectDateBtn = '//button[contains(text(),"تحديد")]';
    this.FieldRecurrenceRate = '//div[@id="mui-component-select-pace.value"]';
    this.FieldLimitationRate ='//input[@name="pace.children.0" and @value="ongoing"]';
    this.aidRecurrencePattern ='//div[@id="mui-component-select-frequencyOfPeriodic.pattern"]';
    // this.aidRecurrenceStartDate = '//button[@aria-label="Choose date"][1]';
    // this.aidRecurrenceEndDate = '//button[@aria-label="Choose date"][1]';
     this.aidRecurrenceStartDate = '//button[@aria-label="picker-button-frequencyOfPeriodic.startDate"][1]';
    this.aidRecurrenceEndDate = '//button[@aria-label="picker-button-frequencyOfPeriodic.endDate"][1]';
    this.mechanismFieldamount ='//div[@id="mui-component-select-calculation.FieldCalculationMechanism"]';
    this.FieldReceivingEntity ='//div[@id="mui-component-select-receivingEntity"]';
    this.entity = '//input[@name="entity"]';
    this.featuresActivationDate = '//button[@aria-label="Choose date"][1]';
    this.featuresEndDate = '//button[@aria-label="Choose date"][1]';
    this.applicationEnablement ='//input[@name="applicationEnablement"and @value="PERMANENT"]';
    this.requireRegistrarApplication ='//input[@name="requireRegisterApplication"and @value="true"]';
    this.applicationChannels ='//div[@id="mui-component-select-applicationChannelCodes"]';
    this.defineFieldFeaturesBtn = '//button[@data-testid="next-button"]';

    // Selectors for review and submission
    this.createFieldBtn = '//button[@data-testid="next-button"]';
    this.successPopupTitle = '//span[@id="modal-modal-title"]';
    this.backToFieldList ='//button[contains(text(),"العودة لقائمة الإعانات")]';
  }

  //     var popUpMsg = new PopUpPage(this.page);


  /**
   * fill Field Data Definition using the provided data.
   * @param {object} fieldData - The data object containing field data defination tab.
   * @returns {Promise<boolean>} - Returns true if the filed data is created successfully.
   */
  async fillFieldDataDefinition(fieldData) {

    // Retrieve Field names from the provided data
    var createdFieldArName = fieldData.getArabicFieldName();
    var createdFieldEnName = fieldData.getEnglishFieldName();

    // Fill metadata section
    await this.page.fill(this.arabicFieldName, createdFieldArName);
    await this.page.fill(this.englishFieldName, createdFieldEnName);
    await this.selectDropdownOption(this.fieldType);
    await this.selectParentOption(this.parentLocator);
    await this.selectDropdownOption(this.fieldNature);
    await this.page.fill(this.arabicFieldDescription, fieldData.getArabicFieldDescription());
    await this.page.fill(this.englishFieldDescription, fieldData.getEnglishFieldDescription());
    await this.page.click(this.fieldDataDefinitionBtn);
    
    fieldData.setArabicFieldName(createdFieldArName);
    fieldData.setEnglishFieldName(createdFieldEnName);
  }
  //   // Fill targeting data section
  //   await this.page.waitForTimeout(3000);
  //   await this.page.waitForSelector(this.defineTargetingDataBtn, {state: "visible"});
  //   await this.page.click(this.defineTargetingDataBtn);
  //   await this.page.waitForTimeout(3000);

  //   // Fill Field features section
  //   await this.page.waitForSelector(this.assessmentNeedinput, { state: "visible"});
  //   await this.page.click(this.assessmentNeedinput);
  //   await this.selectDropdownOption(this.meritRecurrencePattern);
  //   await this.page.waitForSelector(this.meritRecurrenceStartDate, {state: "visible" });
  //   await this.selectTodayDateWithBtn(this.meritRecurrenceStartDate);
  //   await this.selectTodayDateWithBtn(this.meritRecurrenceEndDate);
  //   await this.selectDropdownOption(this.FieldRecurrenceRate);
  //   await this.page.click(this.FieldLimitationRate);
  //   await this.selectDropdownOption(this.aidRecurrencePattern);
  //   await this.page.waitForSelector(this.aidRecurrenceStartDate, { state: "visible"});
  //   await this.selectTodayDateWithBtn(this.aidRecurrenceStartDate);
  //   await this.selectTodayDateWithBtn(this.aidRecurrenceEndDate);
  //   await this.selectDropdownOption(this.mechanismFieldamount);
  //   await this.selectDropdownOption(this.FieldReceivingEntity);
  //   await this.page.waitForSelector(this.entity, { state: "visible" });
  //   await this.page.fill(this.entity, FieldData.getentity());
  //   await this.selectTodayDate(this.featuresActivationDate);
  //   await this.selectTodayDate(this.featuresEndDate);
  //   await this.page.click(this.applicationEnablement);
  //   await this.page.click(this.requireRegistrarApplication);
  //   await this.selectDropdownOption(this.applicationChannels);
  //   await this.page.keyboard.press("Tab");
  //   await this.page.click(this.defineFieldFeaturesBtn);
  //   await this.page.waitForTimeout(5000);

  //   // Submit and review data
  //   await this.page.click(this.defineFieldFeaturesBtn);
  //   await this.page.waitForTimeout(5000);

  //   FieldData.setArabicFieldName(createdFieldArName);
  //   FieldData.setEnglishFieldName(createdFieldEnName);

  //   var result = await popUpMsg.popUpMessage(this.backToFieldList,global.testConfig.createField.FieldSuccessMsg);
  //   return result;
  // }

  /**
   * Selects today's date in a date picker.
   * @param {string} dateLocator - The selector for the date picker button.
   * @returns {Promise<void>} - Completes the date selection.
   */
  async selectTodayDate(dateLocator) {
    await this.page.click(dateLocator);
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector('//div[@role="grid"]', {state: "visible",});
    await this.page.click(
      '//button[@role="gridcell" and not(contains(@class, "Mui-disabled"))]'
    );
  }

  /**
   * Selects today's date in a date picker and confirms the selection.
   * @param {string} dateLocator - The selector for the date picker button.
   * @returns {Promise<void>} - Completes the date selection and confirmation.
   */
  async selectTodayDateWithBtn(dateLocator) {
    await this.page.click(dateLocator);
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector('//div[@role="grid"]', { state: "visible",});
    await this.page.click('//button[@role="gridcell" and @aria-current="date"]' );
    await this.page.click(this.selectDateBtn);
  }

  /**
   * Selects the first available option from a dropdown menu.
   * @param {string} dropdownLocator - The selector for the dropdown element.
   * @returns {Promise<void>} - Completes the dropdown selection.
   */
  async selectDropdownOption(dropdownLocator) {
    await this.page.click(dropdownLocator);
    await this.page.waitForTimeout(2000);
    var optionsLocator = `//div[contains(@class, "choices__item") and contains(@class, "choices__item--selectable")and (@role="option")]`;
   var print = optionsLocator.textcontent 
    console.log()
    await this.page.waitForSelector(optionsLocator, { state: "visible" });
    const firstOption = await this.page.locator(optionsLocator).first();
    await firstOption.click();  }
    
    
    
    

  /**
   * Selects the value option from a fields tree.
   * @param {string} parentLocator - The selector for the parent option element.
   * @returns {Promise<void>} - Completes the dropdown selection.
   */
  async selectParentOption(parentLocatorField) {
    await this.page.click(parentLocatorField);
    await this.page.waitForTimeout(1000);
    const socialRecordItem = this.page.locator('//div[contains(@class, "MuiTreeItem-content")]//span[contains(text(), "السجل الاجتماعي  الموحد")]');
    await socialRecordItem.waitFor({ state: 'visible', timeout: 5000 });
    await socialRecordItem.click();    
    await this.page.waitForTimeout(1000);
    const personalDataItem = this.page.locator('//div[contains(@class, "MuiTreeItem-content")]//span[contains(text(), "البيانات الشخصية")]');
    await personalDataItem.waitFor({ state: 'visible', timeout: 5000 });
    await personalDataItem.click();
    await this.page.waitForTimeout(1000);
    await this.page.locator('//button[contains(text(),"اختيار")]').click();
  }

}
