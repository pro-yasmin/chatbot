export class PopUpPage {
  constructor(page) {
    this.page = page;
  }

  async popUpMessage(messageLocator, actionButton, partialMessage) {
    const fullMessage = await this.page.textContent(messageLocator);
    if (fullMessage.includes(partialMessage)) {
      await this.page.click(actionButton);
    }
    return true;
  }

  async inputPopUpMessage(inputMsgLocator, actionButton, inputMsg) {
    const textAreaLocator = this.page.locator(inputMsgLocator);
    await textAreaLocator.fill(inputMsg);
    const actionBtnLocator = this.page.locator(actionButton);
    await actionBtnLocator.click();
  }
}
module.exports = { PopUpPage };
