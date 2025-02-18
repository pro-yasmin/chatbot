

export class FieldLibraryUpdateRequestsPage {
    constructor(page) {
        this.page = page;
        this.fieldLibraryUpdateRequestButton = '//button[contains(text(),"طلب تحديث مكتبة الحقول")]';
       
    }

    async navigateToFieldRequestsPage() {
        await this.page.waitForSelector(this.fieldLibraryUpdateRequestButton, {state: "visible",timeout: 5000,});
        await this.page.click(this.fieldLibraryUpdateRequestButton);
    }

    
}
module.exports = { FieldLibraryUpdateRequestsPage };