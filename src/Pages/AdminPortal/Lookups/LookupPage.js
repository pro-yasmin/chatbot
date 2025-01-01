const { PopUpPage } = require('../SharedPages/PopUpPage');
const { expect } = require('@playwright/test');
let createdLookUpArName, createdLookUpEnName;

export class LookupPage {
  constructor(page) {
    this.page = page;
    this.createdLookUpArName = null;
    this.createdLookUpEnName = null;
    this.popUpMsg = new PopUpPage(this.page);
    //locators
    this.successPopupTitle = '//span[@id="modal-modal-title"]';
    //Lookup Definition - first tab
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

    //Lookup Design - second tab
    this.nameInArabic = '//input[@name="data[nameAr]"]';
    this.nameInEnglish = '//input[@name="data[nameEn]"]';
    this.code = '//input[@name="data[code]"]';
    this.createLookupButton = '[data-testid="next-button"]';
    this.popUpDismissButton = '//button[contains(text(),"تم")]';

    //Lookup Item management - third tab
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

  // fill lookup definition information - first tab
  async fillLookupDefinitionInformation(lookupData) {
    console.log("Start filling Definition information");
    this.createdLookUpArName = lookupData.getLookupArabicName();
    this.createdLookUpEnName = lookupData.getLookupEnglishName();
    await this.page.fill(this.lookupArabicName, this.createdLookUpArName);
    await this.page.fill(this.lookupEnglishName, this.createdLookUpEnName);
    await this.page.click(this.componentDdl);
    await this.page.waitForSelector(this.ComponentsFirstOption, { visible: true });
    await this.page.click(this.ComponentsFirstOption);
    await this.page.click(this.lookupCategory);
    await this.page.waitForSelector(this.lookupCategoryFirstOption, { visible: true });
    await this.page.click(this.lookupCategoryFirstOption);
    //await this.page.click(this.parentLookup);
    //await this.page.waitForSelector(this.parentLookupFirstOption, { visible: true });
    //await this.page.click(this.parentLookupFirstOption);
    await this.page.fill(this.lookupDescriptionArabicName, lookupData.getLookupDescriptionArabicName());
    await this.page.fill(this.lookupDescriptionEnglishName, lookupData.getLookupDescriptionEnglishName());
    await this.page.click(this.defineLookupButton);
    lookupData.setLookupArabicName(this.createdLookUpArName);
    lookupData.setLookupEnglishName(this.createdLookUpEnName);
    console.log("End filling Definition information");
  }

  // fill lookup design information - second tab
  async fillLookupDesignInformation(lookupData) {
    console.log("Start filling Design information");
    await this.page.waitForSelector(this.createLookupButton, { visible: true });
    await this.page.fill(this.nameInArabic, lookupData.getNameInArabic());
    await this.page.fill(this.nameInEnglish, lookupData.getNameInEnglish());
    await this.page.fill(this.code, lookupData.getCode());
    await this.page.click(this.createLookupButton);
    var result = await this.popUpMsg.popUpMessage(this.successPopupTitle, this.popUpDismissButton, global.testConfig.lookUps.successMsgTabTwo);
    console.log("End filling Design information");
    return result;
  }

  // fill lookup item management information - third tab
  async fillLookupItemManagementInformation(lookupData) {
    console.log("Start filling items information");
    await this.page.waitForSelector(this.addItemToLookupButton, { visible: true });
    await this.page.fill(this.nameArabic, lookupData.getNameArabic());
    await this.page.fill(this.nameEnglish, lookupData.getNameEnglish());
    await this.page.fill(this.codeLookup, lookupData.getCodeLookup());
    //await this.page.click(this.mainList);
    // await this.page.waitForSelector(this.mainListFirstOption, { visible: true });
    // await this.page.click(this.mainListFirstOption);
    await this.page.click(this.visibleToggle);
    await this.page.click(this.addItemToLookupButton);
    var result = await this.popUpMsg.popUpMessage(this.successPopupTitle, this.popUpDismissButton, global.testConfig.lookUps.successMsgTabThree);
    await this.page.click(this.makeLookupButton);
    await this.page.click(this.popUpDismissButton);
    console.log("End filling items information");
    return result;
  }

  // create new lookup
  async createNewLookup(lookupData) {
    var lookupDesignDone;
    var lookupitemCreated;
    await this.fillLookupDefinitionInformation(lookupData);
    lookupDesignDone = await this.fillLookupDesignInformation(lookupData);
    if (lookupDesignDone) {
      lookupitemCreated = await this.fillLookupItemManagementInformation(lookupData);
    }
    await this.page.waitForTimeout(3000);
    return lookupDesignDone && lookupitemCreated;
  }

  // validate view lookup page is opened
  async validateViewLookupPageIsOpened() {
    await this.page.waitForSelector(this.headlinePage, { visible: true });
  }

  // add new lookup item for edit test case
  async addNewLookupItem() {
    await this.page.fill(this.nameArabic, global.testConfig.lookUps.arabicName);
    await this.page.fill(this.nameEnglish, global.testConfig.lookUps.englishName);
    await this.page.fill(this.codeLookup, global.testConfig.lookUps.code);
    //await this.page.click(this.mainList);
    //await this.page.click(this.mainListFirstOption);
    await this.page.click(this.visibleToggle);
    await this.page.click(this.addItemToLookupButton);
  }

  // view new lookup item details after adding it
  async viewNewLookupItemDetails() {
    await this.page.click(this.viewLookUpButton);
    expect(await this.page.isVisible(this.lookupDetailsPage)).toBeTruthy();
    await this.page.click(this.lookupDetailsPageCloseButton);
  }


}
module.exports = { LookupPage };
