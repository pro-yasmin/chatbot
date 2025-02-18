

export class FieldRequestsPage {
    constructor(page) {
        this.page = page;
        this.defineNewFieldButton = '//button[contains(text(),"تعريف حقل جديد")]';
        this.complexFieldButton = '//li//div//span[contains(text(),"حقل مركب")]';
            
    }

    async navigateToFieldPage() {
        await this.page.waitForSelector(this.defineNewFieldButton, {state: "visible",timeout: 5000,});
        await this.page.click(this.defineNewFieldButton); 

        await this.page.waitForSelector(this.complexFieldButton, {state: "visible",timeout: 5000,});
        await this.page.click(this.complexFieldButton);
    }

    
}
module.exports = {  FieldRequestsPage };