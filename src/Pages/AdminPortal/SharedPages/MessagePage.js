export class MessagePage {
    constructor(page) {
        this.page = page; 
    }

    async checkMessage(messageLocator, messageTitle , actionButton) {

        await this.page.waitForSelector(messageLocator, { state: 'visible', timeout: 5000 });
        var messageText = await this.page.textContent(messageLocator);
        if (messageTitle === messageText.trim()) {
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
