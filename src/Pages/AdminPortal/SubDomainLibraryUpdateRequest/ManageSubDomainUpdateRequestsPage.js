const { SearchPage } = require("../../AdminPortal/SharedPages/SearchPage.js");
const {UploadFilePage} = require("../SharedPages/UploadFilePage.js");
const { PopUpPage } = require("../../AdminPortal/SharedPages/PopUpPage.js");
const{SubDomainCreationPage} = require('./SubDomainCreationPage');
const {Utils}= require('../../../Utils/utils.js');





export class ManageSubDomainUpdateRequestsPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.uploadFile= new UploadFilePage(this.page);
        this.popUpMsg= new PopUpPage(this.page);
        this.utils = Utils;

      
        this.createSubDomain ='//div[@data-testid="toolbar-container"]//button[@type="button"]';
        this.justification='//div[@class="form-control ui fluid selection dropdown"]';
        this.justificationList ='(//*[@role="listbox"]//*[contains(@id,"item-choice-1")])';
        this.chooseFileBtn= '//span[text()="اختيار الملف"]';
        this.uploadFileBtn='//button[text()="إضافة الملف"]';
        this.sendRequestBtn= '//button[text()="إرسال الطلب للموافقة"]';
        this.successPopUpMsg='//span[@data-testid="modal-title"]';
        this.closeSuccessPopup='//button[@data-testid="modal-primary-button"]';
        this.draftSubDomainBtn='//button[@data-testid="save-draft-request-sub-domains"]';
        this.backToReqPageBtn='//button[@data-testid="confirmation-modal-secondary-button"]';
        this.searchField= '//input[@data-testid="search-input-base"]';

    }

    /**
   * fill Field Data Definition using the provided data.
   * @param {object} SubDomainData - The data object containing field data defination tab.
   * @returns {Promise<boolean>} - Returns true if the filed data is created successfully.
   *
**/
    async clickOnCreateSubDomainBtn() {
        await this.page.waitForSelector(this.createSubDomain, { state: "visible", timeout: 7000 });
        await this.page.waitForTimeout(3000);
        await this.page.click(this.createSubDomain);
        console.log("Sub domain Create Page Opened successfully.");   
}

 async submitSubDomainCreateRequest(SubDomainData,NumOfDomains){
        var subDomainPage = new SubDomainCreationPage(this.page);
  
       for(let i=0;i<NumOfDomains;i++){
       await this.clickOnCreateSubDomainBtn();
       await subDomainPage.createSubDomain(SubDomainData,NumOfDomains);
       }
       var result = await this.sendRequestToApproval(SubDomainData);
       return result; 
    }

async createDraftSubDomain(SubDomainData){
    var subDomainPage = new SubDomainCreationPage(this.page);
    await this.clickOnCreateSubDomainBtn();
    await subDomainPage.createSubDomain(SubDomainData,1);

    //upload file
    await this.uploadFileForSubDomain(SubDomainData.getfile());

    //select justification
    await this.selectJustification();

    await this.page.waitForTimeout(3000);
    await this.page.click(this.draftSubDomainBtn);

    let successMsg= await this.popUpMsg.popUpMessage( this.successPopUpMsg,this.confirmSendMeg,global.testConfig.createSubDomain.darftsubDomainSuccessMsg);
   
    await this.page.click(this.backToReqPageBtn);

    return  successMsg;
}

    async selectJustification(){
        await this.page.click(this.justification);
        await this.page.waitForTimeout(1000);
        var optionsLocator = this.page.locator(this.justificationList);
        await optionsLocator.first().waitFor({ state: "visible", timeout: 5000 });
        await optionsLocator.first().click({ force: true });
        await this.page.keyboard.press("Tab");
    }

    async uploadFileForSubDomain(fileName){
        await this.uploadFile.uploadFile(fileName,this.chooseFileBtn);
        await this.page.click(this.uploadFileBtn);
    }

    async sendRequestToApproval(SubDomainData){
        await this.uploadFileForSubDomain(SubDomainData.getfile());
        await this.selectJustification();
        await this.page.waitForTimeout(3000);
        await this.page.click(this.sendRequestBtn);

        var getRequestNumber = await this.getRequestNumber(this.successPopUpMsg);
               // var popUpMsg = new PopUpPage(this.page);
                if (getRequestNumber)
                    {await this.popUpMsg.popUpMessage( this.closeSuccessPopup,this.confirmSendMeg,global.testConfig.createSubDomain.createSubDomainSuccessMsg); 
                    await this.page.click(this.closeSuccessPopup);
                        return getRequestNumber}
                else return false;
    }

    async getRequestNumber(messageLocator) {
        const messageText = await this.page.locator(messageLocator).textContent();
        if (messageText) {
            // Extract the full request number using regex
            const match = messageText.match(/ISR_Freq_\d{9}/); 
            if (match) {
                console.log(`Extracted Request Number: ${match[0]}`);
                return match[0]; // Return the request number
            }
        }
    }

    async checkSubDomainName(subDomainName){
        let requestRowInfo=[];
        let status;
        let requestStatus;

        requestRowInfo = await this.search.searchOnUniqueRow(this.searchField, subDomainName);
        if (requestRowInfo && requestRowInfo.length > 0) {
            status = requestRowInfo[1].tdLocator;
            requestStatus = status.locator("span");
            await requestStatus.waitFor({ state: "visible" });
            var actual = await requestStatus.textContent();
        }
        if(actual==subDomainName){
            return true;
        }
    }

    async checkSubDomainDraftData(SubDomainData){
        const justificationName=global.testConfig.createSubDomain.subDomainJustification;
        var expectedJustification = "//*[contains(text(), '" + justificationName + "')]";

      const justificationStatus= await this.page.waitForSelector(expectedJustification, { visible: true });  
      const fileStatus= await this.uploadFile.checkUploadedFile(SubDomainData.getfile());
      const addedSubdomainStatus= await this.checkSubDomainName(SubDomainData.getsubDomainArabicName()[i])

      if(justificationStatus && fileStatus && addedSubdomainStatus){
        return true;
      }else{
        return false;
      }

    }

   


}