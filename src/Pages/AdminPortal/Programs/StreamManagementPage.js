export class StreamManagementPage {

  constructor(page) {
    this.page = page;
    this.createNewStreamButton = '//button[contains(text(),"تعريف مسار")]';
  }


  async clickOnNewStream() {
     await this.page.click(this.createNewStreamButton);    
     
   }

 

}

module.exports = { StreamManagementPage };

