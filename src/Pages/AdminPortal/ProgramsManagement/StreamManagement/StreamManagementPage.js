const { SearchPage } = require("../../SharedPages/SearchPage");
const { StreamPage } = require("./StreamPage");


export class StreamManagementPage {
  constructor(page) {
    this.page = page;
    this.createNewStreamButton = '//button[contains(text(),"تعريف مسار")]';
    this.searchInput = '//form[@data-testid="search-input"]//descendant::input';
    this.streamsTable = "//table//tbody";
    this.createMainProgramOption = '//ul[@role="menu"]//li[1]';
    this.dotsLocator;
  }


  async clickOnNewStream() {
    await this.page.waitForSelector(this.streamsTable, {
      state: "visible",
      timeout: 5000,
    });
    await this.page.click(this.createNewStreamButton);
  }

  async createStream(streamData) {
  await this.clickOnNewStream();
  var streamPage = new StreamPage(this.page);
    const result = await streamPage.createNewStream(streamData);
    return result;
  }


  async searchOnSpecificStream(streamName) {
    let streamRow = [];
    streamRow = await new SearchPage(this.page).searchOnUniqueRow(
      this.searchInput,
      streamName,
      );
    if (!streamRow || streamRow.length === 0) {
      return null;
    }
    return streamRow;
  }

  async clickOnCreateMainProgram(streamName,backUpStream) {
    let lastTd;
    let streamRow = [];
    if(streamName== null)
      streamRow = await this.searchOnSpecificStream(backUpStream);
    else streamRow = await this.searchOnSpecificStream(streamName);
    if (streamRow && streamRow.length > 0) {
      lastTd = streamRow[streamRow.length - 1].tdLocator;
      this.dotsLocator = lastTd.locator("div >> button");
      await this.dotsLocator.click();
      await this.page.waitForSelector(this.createMainProgramOption, {
        state: "visible",
        timeout: 60000,
      });
      await this.page.click(this.createMainProgramOption);
      console.log("Clicked the Create Main program button");
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

    if (
      actualArabicName === streamData.getstreamArabicName() &&
      actualEnglishName === streamData.getstreamEnglishName()
    ) {
      console.log("Stream names matched successfully.");    
      let streamId = await streamRow[0].tdLocator.textContent();
        streamData.setCreatedStreamId(streamId);
        console.log("Created Stream ID set in StreamData: " + streamId);
              return true;
      }
      return false;

  }
}

module.exports = { StreamManagementPage };
