const { PopUpPage } = require('../SharedPages/PopUpPage');

export class SocialRecordCopiesPage {
    constructor(page) {
        this.page = page;
        this.popUpMsg = new PopUpPage(this.page);
        this.createdArVersionName = null;
        this.createdEnVersionName = null;
        this.createdActivationDate = null;
        this.createdactivationDateForApplicant = null;
        this.createdactivationDateForPrograms = null;

        this.ArVersionNameField = '//input[@name="data[schemaNameAr]"]';
        this.EnVersionNameField = '//input[@name="data[schemaNameEn]"]';
        this.activationDateForApplicant = '//input[@name="data[activatedAtForApplicant]"]//following::input[1]';
        this.activationDateForPrograms = '//input[@name="data[activatedAtForProgram]"]//following::input[1]';
        this.activationDate = '//input[@name="data[activatedAt]"]//following::input[1]';
        this.todayDate = '//div[contains(@class, "open")]//span[@class="flatpickr-day today"]';
        this.nextMonthBtn = '//div[contains(@class, "open")]//span[@class="flatpickr-next-month"]';
        this.firstDayOfNextMonth = '(//div[contains(@class, "open")]//span[@class="flatpickr-day"])[1]';
        this.futureDate = '//div[contains(@class, "open")]//span[@class="flatpickr-day today"]/following-sibling::span[12]';
        this.saveSchemeDataButton = '//button[contains(@class, "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary")]';
        this.addNewRegistryFieldsButton = '//div[contains(@class, "MuiGrid-root MuiGrid-item MuiGrid")]//button';
        this.attachmentsAndJustificationsRecordTab = '//button[@data-testid="tab-2"]';
        this.justificationDdl = '//div[@class="choices form-group formio-choices"]';
        this.justificationFirstOption = '//div[@data-id="1"]';
        this.sendUpdatesForApprovalButton = '(//button[contains(@class, "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary")])[2]';
        this.addedFieldArName = '//div[contains(@class, "uiGrid-root MuiGrid-container MuiGrid-spacing")]//span[contains(@class, "MuiTypography-root MuiTypography-p-md-bold")]';
        this.addedFieldTag = '//div[contains(@class, "uiGrid-root MuiGrid-container MuiGrid-spacing")]//span[contains(@class, "MuiTypography-root MuiTypography-p-sm muirtl")]';
        this.existFieldsTable = '//tbody[@data-testid="table-body"]';

        //popup
        this.popUpOkButton = '//button[@data-testid="modal-primary-button"]';

    }

    /**
   * Fills the New Schema Data with the information provided in the socialRecordCopiesData object.
   * @param {Object} socialRecordCopiesData - The data object containing New Schema information.
   * @returns {Promise<void>} A promise that resolves when the social Record Copies Data definition information has been filled.
   */
    async fillNewSchemaData(socialRecordCopiesData) {
        console.log("Start filling New Schema Data");
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector(this.ArVersionNameField, { state: "visible", timeout: 20000 });
        this.createdArVersionName = socialRecordCopiesData.getVersionArabicName();
        this.createdEnVersionName = socialRecordCopiesData.getVersionEnglishName();
        await this.page.waitForTimeout(5000);
        await this.page.fill(this.ArVersionNameField, this.createdArVersionName);
        await this.page.fill(this.EnVersionNameField, this.createdEnVersionName);
        await this.page.waitForTimeout(1000);
        console.log('activation date should be selected')
        //await this.page.click(this.activationDate);
        await (await this.page.$(this.activationDate))?.click();
        console.log('today  date should be appeared')
        await this.page.waitForSelector(this.todayDate, { state: "visible", timeout: 60000 });
        //await this.page.waitForTimeout(5000);
        await (await this.page.$(this.todayDate))?.click();
        // await this.page.click(this.todayDate);
        console.log('today  date should be selected')
       // await this.page.waitForTimeout(5000);
       await this.page.mouse.wheel(0, 1000);
       console.log('activationDateForApplicant date should be selected')
       await (await this.page.$(this.activationDateForApplicant))?.click();
       await this.page.waitForTimeout(3000);
       await (await this.page.$(this.activationDateForApplicant))?.click();
        //await this.page.click(this.activationDateForApplicant, { delay: 5000 });
        console.log('next month  should be appeared')
        await this.page.click(this.nextMonthBtn);
        console.log('next month  should be selected')
       // await this.page.waitForTimeout(5000);
        await this.page.click(this.firstDayOfNextMonth);
        console.log('firstDayOfNextMonth should be selected')
        //await this.page.waitForTimeout(5000);
        console.log('activationDateForPrograms should be appeared')
        await this.page.click(this.activationDateForPrograms);
        console.log('activationDateForPrograms should be selected')
        //await this.page.waitForTimeout(5000);
        console.log('next month2  should be appeared')
        await this.page.click(this.nextMonthBtn);
        console.log('next month2  should be selected')
        //await this.page.waitForTimeout(5000);
        await this.page.click(this.firstDayOfNextMonth);
        console.log('firstDayOfNextMonth2 should be selected')
        //await this.page.waitForTimeout(3000);
        console.log('firstDayOfNextMonth2 should be selected')

        socialRecordCopiesData.setVersionArabicName(this.createdArVersionName);
        socialRecordCopiesData.setVersionEnglishName(this.createdEnVersionName);
        socialRecordCopiesData.setActivationDate(this.createdActivationDate);
        await this.page.click(this.saveSchemeDataButton);
        console.log("End filling New Schema Data");
    }

    async clickAddNewRegistryFieldsButton() {
        await this.page.waitForSelector(this.addNewRegistryFieldsButton, { state: "visible", timeout: 60000 });
        await this.page.click(this.addNewRegistryFieldsButton);
    }
    async validateNewFieldAdded(socialRecordCopiesData) {
        var expectedFieldArName = socialRecordCopiesData.getFieldArName();
        var expectedFieldTag = global.testConfig.SocialRecordCopies.newAddedFieldTag;
        await this.page.waitForTimeout(1000);
        var actualFieldArName = await this.page.$eval(this.addedFieldArName, element => element.textContent);
        var actualFieldTag = await this.page.$eval(this.addedFieldTag, element => element.textContent);

        if (actualFieldArName === expectedFieldArName &&
            actualFieldTag === expectedFieldTag) {
            console.log("New Field data matched expectations Successfully");
            return true;
        }
        return false;
    }
    async navigateToAttachmentsAndJustificationsRecordTab() {
        await this.page.waitForSelector(this.attachmentsAndJustificationsRecordTab, { state: "visible", timeout: 60000 });
        await this.page.click(this.attachmentsAndJustificationsRecordTab);
    }
    async addJustification() {
        await this.navigateToAttachmentsAndJustificationsRecordTab();

        await this.page.click(this.justificationDdl);
        await this.page.waitForSelector(this.justificationFirstOption, { state: "visible", timeout: 60000 });
        await this.page.click(this.justificationFirstOption);
        await this.page.waitForSelector(this.sendUpdatesForApprovalButton, { state: "visible", timeout: 60000 });
        await this.page.click(this.sendUpdatesForApprovalButton);
        var popUpResult = await this.popUpMsg.popUpMessage(this.popUpOkButton, global.testConfig.SocialRecordCopies.schemaUpdateSuccessMsg);
        return popUpResult;
    }

    /**
 * Extracts text from the <span> inside the second <td> of each row in a table.
 *
 * @param {string} tableLocator - The locator for the table body.
 * @returns {Promise<string[]>} - An array of extracted text values.
 */
    async getExistingFieldsData(socialRecordCopiesData) {
        const rows = await this.page.locator(`${this.existFieldsTable}//tr`);
        const rowCount = await rows.count();
        const actualFieldsCount = await rows.count()+1;
        let textValues = [];

        for (let i = 0; i < rowCount; i++) {
            const text = await rows.nth(i).locator('td:nth-child(2) span').innerText();
            console.log("Existing Fields Arabic Names:");
            console.log(`Row ${i + 1}: ${text}`);
            textValues.push(text);
        }
        socialRecordCopiesData.setRowCount(actualFieldsCount);
        console.log("Existing Fields Rows Count = " + actualFieldsCount);
        socialRecordCopiesData.setExistingFieldsArName(textValues);
        return true;
    }




}
module.exports = { SocialRecordCopiesPage };