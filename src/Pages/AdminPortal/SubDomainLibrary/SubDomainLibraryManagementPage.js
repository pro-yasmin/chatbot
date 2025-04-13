const { SearchPage } = require("../../AdminPortal/SharedPages/SearchPage.js");
import Constants from '../../../../src/Utils/Constants.js';



export class SubDomainLibraryManagementPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);

        this.tableActions = 'table-actions';
        this.allSubDomainTab = '//button[@data-testid="tab-1"]';
        this.approvedsubDomainsTab = '//button[@data-testid="tab-2"]';
        this.underReviewsubDomainsTab = '//button[@data-testid="tab-3"]';
        this.rejectedSubDomainTab = '//button[@data-testid="tab-4"]';
        this.searchInput = '//input[@data-testid="search-input-base"]';


    }
 /**
    * fill Field Data Definition using the provided data.
    * @param {object} SubDomainData - The data object containing field data defination tab.
**/

async navigateToApprovedTab() {
    await this.page.click(this.approvedsubDomainsTab);
}

async navigateToRejectedTab() {
    await this.page.click(this.rejectedSubDomainTab);
}

async navigateToAllTab() {
    await this.page.click(this.allSubDomainTab);
}

async navigateToUnderReviewTab() {
    await this.page.click(this.underReviewsubDomainsTab);
}

async checkSubDomainsListAtLibrary(subDomainsName, tabName){
    let subDomainRowInfo=[];
    let status =[];
    let nameAr;
    let subDomainName;
   if (tabName == Constants.SUBDOMAIN_LIB_UNDERREVIEW){
    await this.navigateToUnderReviewTab();
   }
   else if(tabName == Constants.SUBDOMAIN_LIB_REJECTED){
    await this.navigateToRejectedTab();
   }
   else if(tabName == Constants.SUBDOMAIN_LIB_APPROVED){
    await this.navigateToApprovedTab();
   }else{
    await this.page.click(this.allSubDomainTab);
   }

    for(let i=0;i<subDomainsName.length;i++){
   subDomainRowInfo = await this.search.searchOnUniqueRow(this.searchInput,subDomainsName[i] );
    if (subDomainRowInfo && subDomainRowInfo.length > 0) {
        nameAr = subDomainRowInfo[1].tdLocator;
        subDomainName = nameAr.locator("span");
        await subDomainName.waitFor({ state: "visible" });
        var actual = await subDomainName.textContent();
    }
    if(subDomainsName[i]==actual){
        status.push(true);
        }  
      }
     let allTrue = status.every(element => element === true);

      return allTrue;
}

}