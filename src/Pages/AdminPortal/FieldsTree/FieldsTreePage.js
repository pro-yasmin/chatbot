export class FieldsTreePage {
    
    constructor(page) {
      this.page = page;
      this.ISRBtn = '//input[@type="radio"]';
      this.personalInformationBtn = '//span[contains(text(),"البيانات الشخصية")]';
      this.fieldsSection = '//li[@id="mui-tree-view-4-personalInformation"]//ul[@role="group"]';
    }
  
    /**
     * open Personal Information section
     */
    async openFieldsSection() {

      await this.page.waitForTimeout(5000);
     //await this.page.waitForSelector(this.ISRBtn, { state: "visible", timeout: 60000 });
      await this.page.locator(this.ISRBtn).click({ timeout: 5000 });
      //await this.page.click(this.ISRBtn);  
      await this.page.waitForSelector(this.personalInformationBtn, { state: "visible", timeout: 10000 });
      await this.page.locator(this.personalInformationBtn).click({ timeout: 5000 });
     // await this.page.click(this.personalInformationBtn);
      console.log("Fields Personal Information opened successfully");
    }
  
    /**
     * Check if Arabic field name exists
     * @param {string} fieldNameArabic - The Arabic field name to search for.
     * @returns {Promise<boolean>}
     */
    async checkFieldExists(fieldData) {
    await this.openFieldsSection();
    let fieldNameArabic = fieldData.getArabicFieldName();
      const fieldLocator = `//span[contains(text(),"${fieldNameArabic}")]`;
      const isFieldVisible = await this.page.locator(fieldLocator).isVisible();
      
      if (isFieldVisible) {
        console.log(`Field "${fieldNameArabic}" exists.`);
      } else {
        console.error(`Field "${fieldNameArabic}" does NOT exist.`);
      }
  
      return isFieldVisible;
    }
  }

  module.exports = { FieldsTreePage };
  