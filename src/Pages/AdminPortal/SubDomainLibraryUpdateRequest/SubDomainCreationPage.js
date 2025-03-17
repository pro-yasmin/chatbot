import Constants from '../../../Utils/Constants.js';

const { PopUpPage } = require("../../AdminPortal/SharedPages/PopUpPage.js");


export class SubDomainCreationPage {
    constructor(page) {
      this.page = page;

this.subDomainArName= '//input[@data-testid="domain-arabic-name"]';
this.subDomainEngName= '//input[@data-testid="sub-domain-englishName"]';
this.acceptChildTypeField ='//input[@data-testid="childType" and @value="FIELD"]';
this.acceptChildTypeDomain='//input[@data-testid="childType" and @value="DOMAIN"]';
this.assignedDomain='//input[@data-testid="assigned-domain"]';
this.chooseAssignedDomain='(//button[contains(@class,"MuiButton-containedSizeMedium")])[2]';
this.subDomainDesc='//textarea[contains(@id,"description")]';
this.createDomainBtn='//button[@data-testid="next-button"]';
    }

 /**
   * fill Field Data Definition using the provided data.
   * @param {object} SubDomainData - The data object containing field data defination tab.
   * @returns {Promise<boolean>} - Returns true if the filed data is created successfully.
   *
**/

async createSubDomain(SubDomainData) {

    // Retrieve domain names from the provided data
    var subDomainAr = SubDomainData.getsubDomainArabicName();
    var subDomainEng = SubDomainData.getsubDomainEnglishName();
    var acceptedChildType = SubDomainData.getacceptChildType();
    var assignedDomain=SubDomainData.getassignedDomain();
    var subDomainDesc=SubDomainData.getsubDomainDescription();


    await this.page.fill(this.subDomainArName,subDomainAr );
    await this.page.fill(this.subDomainEngName, subDomainEng);
    if(acceptedChildType==Constants.acceptChildTypeField){
        await this.page.click(this.acceptChildTypeField);
    }else{
        await this.page.click(this.acceptChildTypeDomain );
    }
    this.selectAssignedDomain(assignedDomain);
    await this.page.fill(this.subDomainDesc, subDomainDesc);
    await this.page.click(this.createDomainBtn);
      }





      async selectAssignedDomain(domainName) {
        await this.page.click(this.assignedDomain);
        await this.page.getByText(domainName).click();
        await this.page.click(this.chooseAssignedDomain);

        }


         
        
    


}     