const { SearchPage } = require("../../AdminPortal/SharedPages/SearchPage.js");
const{SubDomainCreationPage} = require('./SubDomainCreationPage');
const{ManageSubDomainUpdateRequestsPage} = require ('./ManageSubDomainUpdateRequestsPage.js')


export class SubDomainLibraryUpdateReqPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
    
      
        
        this.subdomainLibraryUpdateRequest = '//button[contains(@class,"MuiButton-containedSizeLarge")]';
    }
/**
   * fill Field Data Definition using the provided data.
    * @param {object} SubDomainData - The data object containing field data defination tab.
   *
**/
    async clickOnSubDomainUpdateLibraryReqBtn() {
        await this.page.waitForSelector(this.subdomainLibraryUpdateRequest, { state: "visible", timeout: 5000 });
        await this.page.click(this.subdomainLibraryUpdateRequest);
        await this.page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        console.log("Sub domain Requests management Page Opened successfully.");   
}

    async submitSubDomainCreateRequest(SubDomainData){
        var subDomainPage = new SubDomainCreationPage(this.page);
        var subDomainRequestManagement= new ManageSubDomainUpdateRequestsPage(this.page);

       await this.clickOnSubDomainUpdateLibraryReqBtn();
       await subDomainRequestManagement.clickOnCreateSubDomainBtn();

        var result = await subDomainPage.createSubDomain(SubDomainData);


    }




}