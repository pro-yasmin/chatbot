const { SearchPage } = require("../SharedPages/SearchPage");

const { expect } = require('@playwright/test');

export class LookupsManagmentPage {
  constructor(page) {
    this.page = page;
    this.search = new SearchPage(this.page);
    this.addButton = '//button[contains(text(),"إنشاء قائمة مرجعية")]';
    this.viewLookUpButton = '(//button[@class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium muirtl-rrlqo"])[1]';
    this.lookupStatus = '(//span[@class="MuiChip-label MuiChip-labelMedium muirtl-11lqbxm"])[1]';
    this.lookupTable = "//table//tbody";
    this.editLookupButton = '(//button[@class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium muirtl-rrlqo"])[2]';

  }


  async clickAddButton() {
    await this.page.waitForSelector(this.addButton, { visible: true });
    await this.page.click(this.addButton);
  }

  async clickViewLookUpButton() {
    await this.page.click(this.viewLookUpButton);
  }

  async clickEditLookupButton(){
    await this.page.click(this.editLookupButton);
  }

  async checkNewLookupAdded(lookupData) {
    let arabicTd;
    let englishTd;
    let statusTd;
    let lookupArabicName;
    let lookupEnglishName;
    let lookupStatus;
    let lookupRow = [];
    lookupRow = await this.search.getFirstRow(this.lookupTable);

    if (lookupRow && lookupRow.length > 0) {
      arabicTd = lookupRow[1].tdLocator;
      lookupArabicName = arabicTd.locator("span");
      await lookupArabicName.waitFor({ state: "visible" });
      var actualLookupArabicName = await lookupArabicName.textContent();

      englishTd = lookupRow[2].tdLocator;
      lookupEnglishName = englishTd.locator("span");
      await lookupEnglishName.waitFor({ state: "visible" });
      var actualLookupEnglishName = await lookupEnglishName.textContent();

      statusTd = lookupRow[9].tdLocator;
      lookupStatus = statusTd.locator("span");
      await lookupStatus.waitFor({ state: "visible" });
      var actualLookupStatus = await lookupStatus.textContent();
    }

    if (
      actualLookupArabicName === lookupData.getLookupArabicName() &&
      actualLookupEnglishName === lookupData.getLookupEnglishName() &&
      actualLookupStatus === global.testConfig.lookUps.lookUpStatusActive
    ) {
      console.log("Lookup names matched successfully.");
      let lookupId = await lookupRow[0].tdLocator.textContent();
      lookupData.setCreatedLookupId(lookupId);
      console.log("Created Lookup ID set in LookupData: " + lookupId);
      return true;
    }
    return false;

  }

  async clickViewLookupData() {
    let viewTd;
    let lookupViewButton;
    let lookupRow = [];
    lookupRow = await this.search.getFirstRow(this.lookupTable);

    if (lookupRow && lookupRow.length > 0) {
      await this.page.click(this.viewLookUpButton);
    }

  }



}
module.exports = { LookupsManagmentPage };
