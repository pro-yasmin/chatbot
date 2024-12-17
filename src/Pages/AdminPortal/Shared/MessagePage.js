export class MessagePage {
    constructor(page) {
        this.page = page; 
    }

    async Message(fixedMessage, messageTitle, actionButton) {

        await this.page.waitForSelector(messageTitle, { state: 'visible', timeout: 5000 });
        var messageText = await this.page.locator(messageTitle).innerText();

        
        if (fixedMessage === messageText.trim()) {
            console.log('Message matched, clicking the button...');
            await this.page.click(actionButton);
            return true;
        } else {
            console.log('Message did not match.');
            return false;
                }
    }

}

module.exports = { MessagePage };
