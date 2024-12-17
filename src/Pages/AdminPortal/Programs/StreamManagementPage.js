export class StreamManagementPage {

  constructor(page) {
    this.page = page;
    this.createNewStreamButton = '//button[contains(text(),"تعريف مسار")]';
    this.streamsTable = '//table//tbody';
 
  }


  async clickOnNewStream() {
    await this.page.waitForSelector(this.streamsTable, { state: 'visible', timeout: 5000 });
    await this.page.click(this.createNewStreamButton);      
   }


   async searchOnRowData(searchValue) {

    var result = await this.search(searchValue);
    expect(result).toBe(true);
}

}

module.exports = { StreamManagementPage };

