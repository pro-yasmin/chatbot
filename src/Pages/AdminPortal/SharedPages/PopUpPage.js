export class PopUpPage {
  constructor(page) {
    this.page = page;
    this.messageLocator = '//span[@id="modal-modal-title"]';
  }

  async popUpMessage(actionButton, partialMessage) {
    const fullMessage = await this.page.textContent(this.messageLocator);
    if (fullMessage.includes(partialMessage)) {
      await this.page.click(actionButton);
      await this.page.locator(actionButton).waitFor({ state: 'detached' ,timeout: 30000 });
    }
    return true;
  }

  async inputPopUpMessage(inputMsgLocator, actionButton, inputMsg) {
    const textAreaLocator = this.page.locator(inputMsgLocator);
    await textAreaLocator.fill(inputMsg);
    await this.page.click(actionButton);
    await this.page.locator(actionButton).waitFor({ state: 'detached' ,timeout: 30000 });
  }
}
module.exports = { PopUpPage };
