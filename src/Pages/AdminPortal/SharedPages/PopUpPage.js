/**
 * Manages interactions with pop-up messages, including handling confirmation messages
 * and filling input fields within pop-ups.
 * @class
 */
export class PopUpPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Handles a popup message and performs an action if the message matches the partial text.
   * @param {string} messageLocator - Selector for the popup message element.
   * @param {string} actionButton - Selector for the button to be clicked on matching the message.
   * @param {string} partialMessage - The expected substring to match in the popup message.
   * @returns {Promise<boolean>} - Returns true if the action was performed successfully.
   */
  async popUpMessage(messageLocator, actionButton, partialMessage) {
    const fullMessage = await this.page.textContent(messageLocator);
    if (fullMessage.includes(partialMessage)) {
      await this.page.click(actionButton);
      await this.page
        .locator(actionButton)
        .waitFor({ state: "detached", timeout: 30000 });
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
    const textAreaLocator = this.page.locator(inputMsgLocator);
    await textAreaLocator.fill(inputMsg);
    await this.page.click(actionButton);
    await this.page
      .locator(actionButton)
      .waitFor({ state: "visible", timeout: 30000 });
  }//detached
}
module.exports = { PopUpPage };
