const { GlossaryPage } = require("./GlossaryPage");

export class ApplicantHomePage {
  //Page Construtor
  constructor(page) {
    this.page = page;
  
}

async verifyLogin() {
  await this.page.waitForSelector(this.welcomeWord, { state: "visible",timeout: 5000});
  return await this.page.locator(this.welcomeWord).isVisible();
}
}

module.exports = { AxonHomePage };
