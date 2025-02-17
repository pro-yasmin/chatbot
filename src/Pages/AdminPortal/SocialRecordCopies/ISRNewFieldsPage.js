const { PopUpPage } = require('../SharedPages/PopUpPage');
const { SocialRecordCopiesPage } = require("../SocialRecordCopies/SocialRecordCopiesPage");

export class ISRNewFieldsPage {
    constructor(page) {
        this.page = page;
        this.popUpMsg = new PopUpPage(this.page);
        this.socialRecordCopiesPage = new SocialRecordCopiesPage(this.page);

        this.fieldListFirstOption = '(//input[@type="radio"])[1]';
        this.fieldArName = '//tbody[@data-testid="table-body"]//tr[1]//td[2]//span';
        this.proceedButton = '//button[@data-testid="next-button"]';

        //popup
        this.popUpOkButton = '//button[@data-testid="modal-primary-button"]';
    }

   
    async addNewRegistryFields(socialRecordCopiesData) {
        console.log("start Adding New Registry Fields");
        await this.socialRecordCopiesPage.clickAddNewRegistryFieldsButton();
        await this.page.waitForSelector(this.fieldListFirstOption, { state: "visible", timeout: 60000});
        await this.page.click(this.fieldListFirstOption);
        await this.getFieldArNameText(socialRecordCopiesData);
        await this.page.waitForSelector(this.proceedButton, { state: "visible", timeout: 60000});
        await this.page.click(this.proceedButton);
        await this.page.waitForSelector(this.proceedButton, { state: "visible", timeout: 60000});
        await this.page.click(this.proceedButton);
        await this.page.waitForSelector(this.proceedButton, { state: "visible", timeout: 60000});
        await this.page.click(this.proceedButton);
        var popupResult = await this.popUpMsg.popUpMessage(this.popUpOkButton, global.testConfig.SocialRecordCopies.ISRaddNewFieldSuccessMsg);
        console.log("Add New Registry Fields completed");
        return popupResult;
    }
    async getFieldArNameText(socialRecordCopiesData){
        var fieldArNameText = await this.page.$eval(this.fieldArName, element => element.textContent);
        socialRecordCopiesData.setFieldArName(fieldArNameText);
    }




}
module.exports = { ISRNewFieldsPage };