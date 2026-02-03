/**
 * Represents the homepage of the application and provides methods for navigating
 * to various sections and performing common actions like logout and user verification.
 * @class
 */

export class HomePage {
  //Page Construtor
  constructor(page) {
    this.page = page;
    this.chatRoot=this.page.locator('//html');
    this.welcomeMsg = '//h1//span';

    this.input=this.page.locator('[id="chat-input"]');
    this.sendButton='//button[@type="submit"]';

    this.response=this.page.locator('//div[@id="response-content-container"]');
    this.userMessages = this.page.locator("//div[@id='user-content-container']");

  }

  /**
   * Checks if the user's avatar is visible, indicating a successful login.
   * @returns {Promise<boolean>} - Returns true if the avatar is visible.
   */
  async checkAvatarIsExist() {
    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector(this.welcomeMsg, {
      state: "visible",
      timeout: 300000,
    });
    return await this.page.locator(this.welcomeMsg).isVisible();
  }

  async sendMessage(message) {
    const before = await this.response.count().catch(() => 0);

    await this.input.fill(message);
    await this.page.click(this.sendButton);

    // wait for new bot response OR fallback
   await this.page.waitForFunction(
  ({ before }) => document.querySelectorAll('#response-content-container').length > before,
  { before },
  { timeout: 30000 }
);

  }
  async lastBotMessageText() {
    const last = this.response.last();
    await expect(last).toBeVisible();
    return (await last.innerText()).trim();
  }

   async inputShouldBeCleared() {
    await expect(this.input).toHaveValue("");
  }

  async directionShouldBe(dir) {
    // checks dir attribute if exists, else computed style
    const attr = await this.chatRoot.getAttribute("dir");
    if (attr) return expect(attr.toLowerCase()).toBe(dir);

    const computed = await this.chatRoot.evaluate(el => getComputedStyle(el).direction);
    expect(computed).toBe(dir);
  }



   

 



  

  

  
    
}

module.exports = { HomePage };
