const { SearchPage } = require("../../SearchPage");

export class ApplicantStreamsPage {
  constructor(page) {
    this.page = page;
    this.search = new SearchPage(this.page);

    // Selectors for stream page
    this.streamWord = '//span[@class="MuiTypography-root MuiTypography-displaySm-bold muirtl-1a6qwee"]';
    this.streamSearchInput = '//div[@data-testid="Search-input"]';
    this.streamViewBtn = '//a[@data-testid="streamsViewButton"][1]';
    this.tableActions = '//table[@data-testid="streams-Table"]' 

   
  }

  async verifyStreams() {
    await this.page.waitForSelector(this.streamSearchInput, { state: "visible",timeout: 5000});
    return await this.page.locator(this.streamSearchInput).isVisible();
  }


  // async openStreamDetials(streamName) {
  //       let requestTd, requestType;
  //       let fieldRow = [];
  //       fieldRow = await this.search.getFirstRow();

  //       if (fieldRow && fieldRow.length > 0) {
  //           requestTd = fieldRow[0].tdLocator;
  //           requestType = requestTd.locator("p");
  //           await requestType.waitFor({ state: "visible" });
  //           var actualStreamName = await requestType.textContent();
  //       }
  //       if (actualStreamName === streamName) {
  //         await this.page.waitForSelector(this.streamViewBtn, { state: 'visible', timeout: 2000 });
  //         await this.page.click(this.streamViewBtn);
  //         console.log("Streams Detials Page open Successfully");
  //         return true;
  //       }
  //       return false;
  //   }



    async openStreamDetials(streamName) {
        let requestTd, requestType;
        let fieldRow = [];
        fieldRow = await this.search.getRowInTableWithSpecificText(streamName);

        if (fieldRow && fieldRow.length > 0) {
            requestTd = fieldRow[0].tdLocator;
            requestType = requestTd.locator("p");
            await requestType.waitFor({ state: "visible" });
            var actualStreamName = await requestType.textContent();
        }
        if (actualStreamName === streamName) {
          await this.search.clickRowAction(fieldRow, this.tableActions, this.streamViewBtn);
          console.log("Streams Detials Page open Successfully");
          return true;
        }
        return false;
    }
  


}
module.exports = { ApplicantStreamsPage };
