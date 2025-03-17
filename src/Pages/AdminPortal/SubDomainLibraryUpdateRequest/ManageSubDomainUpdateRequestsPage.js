const { SearchPage } = require("../../AdminPortal/SharedPages/SearchPage.js");


export class ManageSubDomainUpdateRequestsPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
      
        this.createSubDomain ='//button[text()="تعريف فئة جديدة"]';
       // this.createSubDomain = '//button[contains(@class,"MuiButton-containedSizeLarge")]';
    }

    async clickOnCreateSubDomainBtn() {
        await this.page.waitForSelector(this.createSubDomain, { state: "visible", timeout: 5000 });
        await this.page.waitForTimeout(3000);
        await this.page.click(this.createSubDomain);
        console.log("Sub domain Create Page Opened successfully.");   
}



}