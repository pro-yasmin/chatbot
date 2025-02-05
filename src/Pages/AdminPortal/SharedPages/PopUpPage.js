/**
 * Manages interactions with pop-up messages, including handling confirmation messages
 * and filling input fields within pop-ups.
 * @class
 */
export class PopUpPage {
  constructor(page) {
    this.page = page;
    this.messageLocator = '//span[@id="modal-modal-title"]';//data-testid="modal-title"
  }

  async popUpMessage(actionButton, partialMessage) {
    await this.page.waitForSelector(actionButton, { visible: true, timeout: 30000 });
   // await this.page.locator(actionButton).waitFor({ state: "visible", timeout: 30000 });
    var fullMessage = await this.page.textContent(this.messageLocator);
    if (fullMessage.includes(partialMessage)) {
      await this.page.click(actionButton);
     // await this.page.waitForSelector(actionButton, { visible: false });
    await this.page.locator(actionButton).waitFor({ state: "detached" , timeout: 30000});
      
    }
    return true;
  }

  /**
   * Fills input text in a popup and submits it.
   * @param {string} inputMsgLocator - Selector for the input field within the popup.
   * @param {string} actionButton - Selector for the button to submit the input.
   * @param {string} inputMsg - The text to input into the field.
   * @returns {Promise<void>} - Completes the action and waits for the popup to close.
   */
  async inputPopUpMessage(inputMsgLocator, actionButton, inputMsg) {
    await this.page.waitForTimeout(2000);
    const textAreaLocator = this.page.locator(inputMsgLocator);
    await textAreaLocator.waitFor({ state: "visible", timeout: 30000 });
    await textAreaLocator.fill(inputMsg);
    await this.page.click(actionButton);
    await this.page.waitForTimeout(3000);
  }
}
module.exports = { PopUpPage };
