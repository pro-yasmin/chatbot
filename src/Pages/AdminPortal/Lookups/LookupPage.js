const { PopUpPage } = require('../SharedPages/PopUpPage');
const { expect } = require('@playwright/test');

export class LookupPage {
  constructor(page) {
    this.page = page;
    this.popUpMsg = new PopUpPage(this.page);
    //locaors
    this.successPopupTitle = '//span[@id="modal-modal-title"]';
    //Lookup Definition
    this.lookupArabicName = '//input[@name="data[nameAr]"]';
    this.lookupEnglishName = '//input[@name="data[nameEn]"]';
    this.componentDdl = '(//div[@class="form-control ui fluid selection dropdown"])[1]';
    this.ComponentsFirstOption = '(//div[@class="form-control ui fluid selection dropdown"])[1]/..//div[@data-id="1"]';
    this.lookupCategory = '(//div[@class="form-control ui fluid selection dropdown"])[2]';
    this.lookupCategoryFirstOption = '(//div[@class="form-control ui fluid selection dropdown"])[2]/..//div[@data-id="1"]';
    this.parentLookup = '(//div[@class="form-control ui fluid selection dropdown"])[3]';
    this.parentLookupFirstOption = '(//div[@class="form-control ui fluid selection dropdown"])[3]/..//div[@data-id="3"]';
    this.lookupDescriptionArabicName = '//textarea[@name="data[descriptionAr]"]';
    this.lookupDescriptionEnglishName = '//textarea[@name="data[descriptionEn]"]';
    this.defineLookupButton = '[data-testid="next-button"]';

    //Lookup Design
    this.nameInArabic = '//input[@name="data[nameAr]"]';
    this.nameInEnglish = '//input[@name="data[nameEn]"]';
    this.code = '//input[@name="data[code]"]';
    this.createLookupButton = '[data-testid="next-button"]';
    this.popUpDismissButton = '//button[contains(text(),"تم")]';

    //Lookup Item management
    this.nameArabic = '//input[@name="data[nameAr]"]';
    this.nameEnglish = '//input[@name="data[nameEn]"]';
    this.codeLookup = '//input[@name="data[code]"]';
    this.mainList = '//div[@class="choices form-group formio-choices"]';
    this.mainListFirstOption = '//div[@class="form-control ui fluid selection dropdown"]/..//div[@data-id="1"]';
    this.visibleToggle = '//label[@class="form-check-label"]';
    this.addItemToLookupButton = '//button[contains(text(),"اضف عنصر للقائمة المرجعية")]';
    this.makeLookupButton = '//button[contains(text(),"إتاحة القائمة المرجعية")]';
    this.viewLookUpButton = '(//button[@class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium muirtl-rrlqo"])[1]';
    this.lookupDetailsPage = '//span[text()="بيانات العنصر"]';
    this.lookupDetailsPageCloseButton = '//button[@class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium muirtl-k2cbku"]';

    //view lookup
    this.headlinePage = '//span[contains(text(),"المعلومات الرئيسية")]';
  }


  async fillLookupDefinitionInformation(lookupData) {
    var createdLookUpArName = lookupData.getLookupArabicName();
    var createdLookUpEnName = lookupData.getLookupEnglishName();
    await this.page.fill(this.lookupArabicName, createdLookUpArName);
    await this.page.fill(this.lookupEnglishName, createdLookUpEnName);
    await this.page.click(this.componentDdl);
    await this.page.click(this.ComponentsFirstOption);
    await this.page.click(this.lookupCategory);
    await this.page.click(this.lookupCategoryFirstOption);
    await this.page.click(this.parentLookup);
    await this.page.click(this.parentLookupFirstOption);
    await this.page.fill(this.lookupDescriptionArabicName, lookupData.getLookupDescriptionArabicName());
    await this.page.fill(this.lookupDescriptionEnglishName, lookupData.getLookupDescriptionEnglishName());
    await this.page.click(this.defineLookupButton);
    lookupData.setLookupArabicName(createdLookUpArName);
    lookupData.setLookupEnglishName(createdLookUpEnName);
  }

  async fillLookupDesignInformation(lookupData) {
    await this.page.waitForSelector(this.code, { visible: true });
    await this.page.fill(this.nameInArabic, lookupData.getNameInArabic());
    await this.page.fill(this.nameInEnglish, lookupData.getNameInEnglish());
    await this.page.fill(this.code, lookupData.getCode());
    await this.page.click(this.createLookupButton);
    var result = await this.popUpMsg.popUpMessage(this.successPopupTitle, this.popUpDismissButton, global.testConfig.lookUps.successMsgTabTwo);
    return result;
  }

  async fillLookupItemManagementInformation(lookupData) {
    await this.page.fill(this.nameArabic, lookupData.getNameArabic());
    await this.page.fill(this.nameEnglish, lookupData.getNameEnglish());
    await this.page.fill(this.codeLookup, lookupData.getCodeLookup());
    await this.page.click(this.mainList);
    await this.page.click(this.mainListFirstOption);
    await this.page.click(this.visibleToggle);
    await this.page.click(this.addItemToLookupButton);
    var result = await this.popUpMsg.popUpMessage(this.successPopupTitle, this.popUpDismissButton, global.testConfig.lookUps.successMsgTabThree);
    await this.page.click(this.makeLookupButton);
    await this.page.click(this.popUpDismissButton);
    return result;
  }

  async createNewLookup(lookupData) {
    await this.fillLookupDefinitionInformation(lookupData);
    await this.fillLookupDesignInformation(lookupData);
    await this.fillLookupItemManagementInformation(lookupData);
  }

  async validateViewLookupPageIsOpened() {
    await this.page.waitForSelector(this.headlinePage, { visible: true });
  }

  async addNewLookupItem() {
    await this.page.fill(this.nameArabic, global.testConfig.lookUps.arabicName);
    await this.page.fill(this.nameEnglish, global.testConfig.lookUps.englishName);
    await this.page.fill(this.codeLookup, global.testConfig.lookUps.code);
    await this.page.click(this.mainList);
    await this.page.click(this.mainListFirstOption);
    await this.page.click(this.visibleToggle);
    await this.page.click(this.addItemToLookupButton);
  }

  async viewNewLookupItemDetails() {
    await this.page.click(this.viewLookUpButton);
    expect(await this.page.isVisible(this.lookupDetailsPage)).toBeTruthy();
    await this.page.click(this.lookupDetailsPageCloseButton);
  }


}
module.exports = { LookupPage };
