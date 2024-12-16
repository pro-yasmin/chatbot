export class StreamManagementPage {

  constructor(page) {
    this.page = page;
    this.createNewStreamButton = '//button[contains(text(),"تعريف مسار")]',
    this.streamTitle = '//span[contains(@class, "MuiTypography-root") and contains(@class, "MuiTypography-sub-headline-sm") and text()="إدارة المسارات"]';
 }


  async clickOnNewStream() {
     await this.page.click(this.createNewStreamButton);    
     
   }

 

}

module.exports = { StreamManagementPage };

