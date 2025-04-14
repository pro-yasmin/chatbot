export class FieldsTreePage {
    
    constructor(page) {
      this.page = page;

      this.ISRBtn = '//input[@type="radio"]';
      this.personalInformationBtn = '//span[contains(text(),"البيانات الشخصية")]';
      this.fieldsSection = '//li[@id="mui-tree-view-4-personalInformation"]//ul[@role="group"]';
      this.openTree='//div[contains(@class,"MuiTreeItem-content")]';
      this.ArName='(//label[contains(@id,"arabicName")]//following::div[@ref="value"])[1]';
      this.EngName='(//label[contains(@id,"englishName")]//following::div[@ref="value"])[1]';
      this.assignedDomain='(//label[contains(@id,"assignedDomain")]//following::div[@ref="value"])[1]';
      this.acceptChildType='(//label[contains(@id,"acceptChildType")]//following::div[@ref="value"])[1]';
      this.description='(//label[contains(@id,"description")]//following::div[@ref="value"])[1]';

      
    }
  
    /**
     * open Personal Information section
     */
    async openFieldsSection() {

      await this.page.waitForTimeout(3000);
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
     * @param {object} SubDomainData - The data object containing field data defination tab.


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

  async checkSubDomainsExists(subDomainName,ExpectType){
    await this.page.click(this.openTree);
    const subDomainLocator = `//span[contains(text(),"${subDomainName}")]`;
    const TypeLocator=`(//span[contains(text(),"${subDomainName}")]//following::span)[1]`;
   
   const ActualType=  await this.page.textContent(TypeLocator);

    const isSubDomainVisible = await this.page.locator(subDomainLocator).isVisible();

    if (isSubDomainVisible&&ActualType==ExpectType) {
      console.log(`Field "${subDomainName}" exists.`);
      return true;
    } else {
      console.error(`Field "${subDomainName}" does NOT exist.`);
      return false;
    }
  }

  async checkSubDomainDetails(subDomainData){
    const validations = [];
    let allTrue=[];
    const viewActionLocator=`(//span[contains(text(),"${subDomainData.getsubDomainArabicName()[0]}")]//following::span)[2]`;

    await this.page.click(viewActionLocator);

    console.log("check subDomain details");

   const ActualArName=  await this.page.textContent(this.ArName);
   const ActualEngName= await this.page.textContent(this.EngName);
   const ActualAssignedDomain= await this.page.textContent(this.assignedDomain);
   const ActualAcceptChildType= await this.page.textContent(this.acceptChildType);
   const ActualDescription= await this.page.textContent(this.description);

   validations.push(ActualArName==subDomainData.getsubDomainArabicName()[0]);
   validations.push(ActualEngName==subDomainData.getsubDomainEnglishName()[0]);
   validations.push(ActualAssignedDomain==subDomainData.getassignedDomain());
   validations.push(ActualAcceptChildType==subDomainData.getacceptChildType());
   validations.push(ActualDescription==subDomainData.getsubDomainDescription());

   allTrue = validations.every(element => element === true);
   return allTrue;
  }

  }

  module.exports = { FieldsTreePage };
  