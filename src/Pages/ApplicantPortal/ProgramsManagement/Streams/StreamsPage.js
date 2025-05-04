
export class StreamsPage {
  constructor(page) {
    this.page = page;

    // Selectors for stream page
    this.streamWord = '//span[@class="MuiTypography-root MuiTypography-displaySm-bold muirtl-1a6qwee"]';
   
  }

  async verifyStreams() {
    await this.page.waitForSelector(this.streamWord, { state: "visible",timeout: 5000});
    return await this.page.locator(this.streamWord).isVisible();
  }

}
module.exports = { StreamsPage };
