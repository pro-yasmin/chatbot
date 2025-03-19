import Constants from '../../../Utils/Constants.js';

const { PopUpPage } = require("../../AdminPortal/SharedPages/PopUpPage.js");

/**
 * Represents the Field page and manages the creation of new Field,
 * including filling out metadata, targeting data, and feature details.
 * @class
 */
export class FieldPage {
  constructor(page) {
    this.page = page;

    // Selectors for field data defination section
    this.arabicFieldName = '//input[@name="data[arabicFieldName]"]';
    this.englishFieldName = '//input[@name="data[englishFieldName]"]';
    this.MenuLocators = "//*[@role='listbox']//*[contains(@id,'item-choice-1')]";

    this.dataMenuOptionsLocator='.choices__list.is-active .choices__item.choices__item--selectable';
    this.fieldTypeMenu ='//div[contains(@class, "ui fluid selection dropdown")][.//select[@name="data[fieldType]"]]';
    this.parentLocator ='//input[@data-testid="assigned-domain"]';
    this.fieldNature ='//div[contains(@class, "ui fluid selection dropdown")][.//select[@name="data[fieldNature]"]]';
    this.arabicFieldDescription = '//textarea[@name="data[arabicFieldDescription]"]';
    this.englishFieldDescription = '//textarea[@name="data[englishFieldDescription]"]';
    this.fieldDataDefinitionBtn ='//button[@data-testid="next-button"]';
    // Selectors for field settings
    this.classification ="//div[@class='form-control ui fluid selection dropdown'][//select[@name='data[classification]']]";
    this.settingMenuOptionsLocator = '.choices__list[role="listbox"] .choices__item.choices__item--selectable';
    this.requierdOptionBtn ='//input[@value="mandatory"]';
    this.multipleFieldBtn ='//input[contains(@name,"data[multipleField]") and @value="yes"]';  
    this.periodicDataUpdate = "//select[@name='data[periodicDataUpdate]']//parent::div";
    this.dataMenuSettings ='.choices__list.is-active .choices__item.choices__item--selectable[role="option"]'
    this.privacy ='//div[contains(@class, "form-control ui fluid selection dropdown")][.//select[@name="data[privacy]"]]';
    this.impactDegree = '//div[contains(@class, "form-control ui fluid selection dropdown")][.//select[@name="data[impactDegree]"]]'
    this.DataMenuesettingsSeverity  ='//div[contains(@class, "form-control ui fluid selection dropdown")][.//select[@name="data[severity]"]]';
    this.fieldSettingDefinationBtn='//button[@data-testid="next-button"]';
    // Selectors for field Display
    this.fieldDisplyBtn ='//button[@data-testid="next-button"]';

    this.addAnotherField ='//button[@data-testid="confirmation-modal-primary-button"]';
    this.backToFieldRequestPage ='//button[@data-testid="confirmation-modal-secondary-button"]';
    this.doneButton = '//button[@data-testid="modal-primary-button"]';
  
  }

  /**
   * fill Field Data Definition using the provided data.
   * @param {object} fieldData - The data object containing field data defination tab.
   * @returns {Promise<boolean>} - Returns true if the filed data is created successfully.
   */
  async fillFieldDataDefinition(fieldData) {

    // Retrieve Field names from the provided data
    var createdFieldArName = fieldData.getArabicFieldName();
    var createdFieldEnName = fieldData.getEnglishFieldName();
    var fieldType = fieldData.getFieldType();


    // Fill Field Data Definition section
    await this.page.fill(this.arabicFieldName, createdFieldArName);
    await this.page.fill(this.englishFieldName, createdFieldEnName);
    // await this.selectDropdownOption(this.fieldTypeMenu , this.dataMenuOptionsLocator);
    await this.selectDropdownOption(this.fieldTypeMenu , 1);
    if (fieldType === Constants.COMPLEX_FIELD || fieldType === Constants.GROUP_FIELD ) {
        await this.selectParentOption(this.parentLocator);}
    // await this.selectDropdownOption(this.fieldNature,this.dataMenuOptionsLocator);
    await this.selectDropdownOption(this.fieldNature,2);
    await this.page.fill(this.arabicFieldDescription, fieldData.getArabicFieldDescription());
    await this.page.fill(this.englishFieldDescription, fieldData.getEnglishFieldDescription());
    await this.page.click(this.fieldDataDefinitionBtn);
    await this.page.waitForTimeout(1000);

    fieldData.setArabicFieldName(createdFieldArName);
    fieldData.setEnglishFieldName(createdFieldEnName);
    console.log("Filling Data Definition Ending ")
  }

  /**
   * fill Field Settings using the provided data.
   * @returns {Promise<boolean>} - Returns true if the filed data is created successfully.
   */
  async fillFieldSettings() {

    // Fill Field Data Definition section
    // await this.selectDropdownOption(this.classification , this.settingMenuOptionsLocator);
    await this.selectDropdownOption(this.classification , 1);
    await this.page.click(this.requierdOptionBtn);
    await this.page.click(this.multipleFieldBtn);
    await this.selectDropdownOption(this.periodicDataUpdate ,3);
    await this.selectDropdownOption(this.privacy ,4 );
    await this.selectDropdownOption(this.impactDegree  ,5 );
    await this.selectDropdownOption(this.DataMenuesettingsSeverity ,6);
    // await this.selectDropdownOption(this.periodicDataUpdate ,this.dataMenuSettings);
    // await this.selectDropdownOption(this.privacy ,this.dataMenuSettings );
    // await this.selectDropdownOption(this.impactDegree  ,this.dataMenuSettings );
    // await this.selectDropdownOption(this.DataMenuesettingsSeverity ,this.dataMenuSettings);
    await this.page.click(this.fieldSettingDefinationBtn);
    console.log("Filling Field Settings Ending ");
  }
  
  /**
   * fill Field Settings using the provided data.
   * @returns {Promise<boolean>} - Returns true if the filed data is created successfully.
   */
  async fieldDisplay(fieldData) {
    let fieldType = fieldData.getFieldType();

    await this.page.waitForTimeout(2000); 
    await this.page.click(this.fieldDisplyBtn);
    console.log("Field Display Ending ");
    await this.page.waitForTimeout(2000); 
    var popUpMsg = new PopUpPage(this.page);

    if (fieldType === Constants.COMPLEX_FIELD || fieldType === Constants.GROUP_FIELD) {
      var result = await popUpMsg.popUpMessage( this.addAnotherField,global.testConfig.createField.createAnotherFieldMsg);  }
    else if (fieldType === Constants.INPUT_FIELD ){
    var result = await popUpMsg.popUpMessage(this.doneButton,global.testConfig.createField.confirmaCreateFieldMsg);}
    // var result = await popUpMsg.popUpMessage(this.backToFieldRequestPage,global.testConfig.createField.createAnotherFieldMsg);}
    return result;
  }
  
  /**
 * Selects an option from a dropdown menu based on the provided index.
 * @param {string} dropdownLocator - The selector for the dropdown element.
 * @param {number} menuOptionsIndex - The index of the option to select (1-based).
 * @returns {Promise<void>} - Completes the dropdown selection.
 */
  async selectDropdownOption(dropdownLocator, menuOptionsIndex) {
    await this.page.click(dropdownLocator);
    await this.page.waitForTimeout(2000); 
    let menuOptionsLocator = `(${this.MenuLocators})[${menuOptionsIndex}]`;
    var optionsLocator = this.page.locator(menuOptionsLocator);
    await optionsLocator.first().waitFor({ state: "visible", timeout: 5000 });
    await optionsLocator.first().click({ force: true });
    await this.page.waitForTimeout(500);
}

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
    await this.page.locator('//div[contains(@class,"MuiDialogAction")]//button[1]').click();
    await this.page.waitForTimeout(1000);
  }

  /**
   * Creates a new lookup entry by filling in the necessary information.
   * @param {Object} lookupData - The data required to create the lookup.
   * @returns {Promise<boolean>} - Returns true if the lookup design and item creation were successful, otherwise false.
   */
  async creationField(fieldData, fieldType) {
    var fieldDataDefinition, fieldSettings, fieldDisplay;
    // Common steps for all applicable field types
        fieldDataDefinition = await this.fillFieldDataDefinition(fieldData);
        fieldSettings = await this.fillFieldSettings();
        fieldDisplay = await this.fieldDisplay(fieldData);
        return fieldDisplay; 
  
}

}
