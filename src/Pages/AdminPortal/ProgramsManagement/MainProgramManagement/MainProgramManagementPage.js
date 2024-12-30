const { SearchPage } = require("../../SharedPages/SearchPage");
const { MainProgramPage } = require("./MainProgramPage");

export class MainProgramManagementPage {
  constructor(page) {
    this.page = page;
    this.searchInput = '//form[@data-testid="search-input"]//descendant::input';
    this.mainProgramsTable = "//table//tbody";
    this.createSubProgramOption = '//ul[@role="menu"]//li[1]';
    this.dotsLocator;
  }

  async clickOnNewMainProgram(mainProgramData) {
    await this.page.waitForSelector(this.mainProgramsTable, {
      state: "visible",
      timeout: 5000,
    });
    await this.page.click(this.createNewMainProgramButton);
    var mainProgramPage = new MainProgramPage(this.page);
    const result = await mainProgramPage.createNewMainProgram(mainProgramData);
    return result;

  }

  
  async searchOnSpecificMainProgram(mainProgramName) {
    let mainProgramRow = [];
    mainProgramRow = await new SearchPage(this.page).searchOnUniqueRow(
      this.searchInput,
      mainProgramName,
      this.mainProgramsTable
    );
    if (!mainProgramRow || mainProgramRow.length === 0) {
      return null;
    }

    return mainProgramRow;
  }

  async clickOnCreateSubProgram(mainProgramName,backUpProgram) {
    let lastTd;
    let mainProgramRow = [];
    if(mainProgramName== null)
      mainProgramRow= await this.searchOnSpecificMainProgram(backUpProgram);
    else mainProgramRow = await this.searchOnSpecificMainProgram(mainProgramName);
    if (mainProgramRow && mainProgramRow.length > 0) {
      lastTd = mainProgramRow[mainProgramRow.length - 1].tdLocator;
      this.dotsLocator = lastTd.locator("div >> button");
      await this.dotsLocator.click();
      await this.page.waitForSelector(this.createSubProgramOption, {
        state: "visible",
        timeout: 60000,
      });
      await this.page.click(this.createSubProgramOption);
      console.log("Clicked the Create Sub Program button");
    }
  }

  async checkMainProgramRowDetails(mainProgramData) {  
    let arabicTd;
    let englishTd;
    let arabicName;
    let englishName;
    let mainProgramRow = [];

    mainProgramRow = await this.searchOnSpecificMainProgram(
      mainProgramData.getArabicMainProgramName()
    );

    if (mainProgramRow && mainProgramRow.length > 0) {
      arabicTd = mainProgramRow[1].tdLocator;
      arabicName = arabicTd.locator("span");
      await arabicName.waitFor({ state: "visible" });
      var actualArabicName = await arabicName.textContent();

      englishTd = mainProgramRow[2].tdLocator;
      englishName = englishTd.locator("span");
      await englishName.waitFor({ state: "visible" });
      var actualEnglishName = await englishName.textContent();
    }

    if (
      actualArabicName === mainProgramData.getArabicMainProgramName() &&
      actualEnglishName === mainProgramData.getEnglishMainProgramName()
    ) {
      console.log("Main Program names matched successfully.");    
      let mainProgramId = await mainProgramRow[0].tdLocator.textContent();
      mainProgramData.setCreatedMainProgramId(mainProgramId);
      console.log("Created Main Program ID set in MainProgramData: " + mainProgramId);
      return true;
    }
    return false;
  }
}

module.exports = { MainProgramManagementPage };
