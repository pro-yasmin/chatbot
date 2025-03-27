const { SearchPage } = require("../../AdminPortal/SharedPages/SearchPage.js");




export class ViewSubDomainRequest{
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);


    } 

/**
   * fill Field Data Definition using the provided data.
    * @param {object} SubDomainData - The data object containing field data defination tab.
   *
**/
    async checkSubmittedSubDomains(SubDomainsArName){
        let subDomainInfoRow=[];
        let status;
        let requestStatus;
        for(i=0;i>SubDomainsArName.length;i++){
        subDomainInfoRow = await this.search.searchOnUniqueRow(this.searchField,SubDomainsArName[i]);
        if (requestRowInfo && requestRowInfo.length > 0) {
            status = requestRowInfo[4].tdLocator;
            requestStatus = status.locator("span");
            await requestStatus.waitFor({ state: "visible" });
            var actual = await requestStatus.textContent();
        }
        if(actual==expectedStatus){
            return true;
        }
    }
    }





    
}