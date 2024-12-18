export class ProgramPage {

  constructor(page) {
    this.page = page;
   
  }
  async waitForPageLoad() {
     await this.page.waitForLoadState('load');    
  }

}
module.exports = { ProgramPage };

