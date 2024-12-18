import { Console } from "console";
const { StreamData } = require("../../../Models/AdminPortal/StreamData");
const { SearchPage } = require("../SharedPages/SearchPage");
const { ProgramPage } = require("./ProgramPage");
const { HomePage } = require("../HomePage");

export class StreamManagementPage {
  constructor(page) {
    this.page = page;
    this.createNewStreamButton = '//button[contains(text(),"تعريف مسار")]';
    this.searchInput = '//form[@data-testid="search-input"]//descendant::input';
    this.streamsTable = "//table//tbody";
    this.createSubProgramOption = '//ul[@role="menu"]//li[1]';
    this.dotsLocator;
  }

  async clickOnNewStream() {
    await this.page.waitForSelector(this.streamsTable, {
      state: "visible",
      timeout: 5000,
    });
    await this.page.click(this.createNewStreamButton);
  }

  async searchOnSpecificStream(streamName) {
    let streamRow = [];
    streamRow = await new SearchPage(this.page).searchOnUniqueRow(
      this.searchInput,
      streamName,
      this.streamsTable
    );
    if (!streamRow || streamRow.length === 0) {
      return null;
    }

    return streamRow;
  }

  async createProgram(streamName) {
    let lastTd;
    let streamRow = [];
    streamRow = await this.searchOnSpecificStream(streamName);
    if (streamRow && streamRow.length > 0) {
      lastTd = streamRow[streamRow.length - 1].tdLocator;
      this.dotsLocator = lastTd.locator("div >> button");
      await this.dotsLocator.waitFor({ state: "visible" });
      await this.dotsLocator.click();
      await this.page.waitForSelector(this.createSubProgramOption, {
        state: "visible",
        timeout: 60000,
      });
      await this.page.click(this.createSubProgramOption);
      //await this.page.waitForTimeout(5000);
      console.log("Clicked the create program button");
    }
  }

  async checkStreamRowDetails(streamData) {
    let arabicTd;
    let englishTd;
    let arabicName;
    let englishName;
    let streamRow = [];

    streamRow = await this.searchOnSpecificStream(
      streamData.getstreamArabicName()
    );
    if (streamRow && streamRow.length > 0) {
      arabicTd = streamRow[1].tdLocator;
      arabicName = arabicTd.locator("span");
      await arabicName.waitFor({ state: "visible" });
      var actualArabicName = await arabicName.textContent();

      englishTd = streamRow[2].tdLocator;
      englishName = englishTd.locator("span");
      await englishName.waitFor({ state: "visible" });
      var actualEnglishName = await englishName.textContent();
    }
    //add if statment to check the matched reusult - actual = get in stream data
    let streamId = await streamRow[0].tdLocator.textContent();
    streamData.setCreatedStreamId(streamId);
    console.log("Created Stream ID set in StreamData: " + streamId);
  }
}

module.exports = { StreamManagementPage };
