const { SearchPage } = require('../SharedPages/SearchPage');
const { ProgramPage } = require('./ProgramPage');

export class StreamManagementPage {

  constructor(page) {
    this.page = page;
    this.createNewStreamButton = '//button[contains(text(),"تعريف مسار")]';
    this.searchInput='//form[@data-testid="search-input"]//descendant::input';
    this.streamsTable = '//table//tbody//';
    this.createSubProgramOption='//ul[@role="menu"]//li[1]';
    this.dotsLocator;
  }


  async clickOnNewStream() {
     await this.page.click(this.createNewStreamButton);    
     
   }

  async searchOnSpecificStream(streamName) {
    let streamRow = [];
    streamRow = await new SearchPage(this.page).searchOnUniqueRow(this.searchInput,streamName,this.streamsTable);
    if(!streamRow || streamRow.length === 0)
    {
       return null;
    }
    return streamRow;
    console.log('List of TD locators and their children:', streamRow);  
    
  }

  async createProgram(streamName) {
    let lastTd;
    let streamRow = [];
    streamRow = await this.searchOnSpecificStream(streamName);
   if(streamRow && streamRow.length > 0)
      {  lastTd = streamRow[streamRow.length - 1].tdLocator; 
         this.dotsLocator = lastTd.locator('div >> button');
         await this.dotsLocator.waitFor({ state: 'visible' });
         await this.dotsLocator.click();
         await this.page.waitForSelector(this.createSubProgramOption, { state: 'visible', timeout: 60000 });
         await this.page.click(this.createSubProgramOption);
         //await this.page.waitForTimeout(5000);
         console.log('Clicked the creat program button');
         }    
     
    
  }


 

}

module.exports = { StreamManagementPage };

