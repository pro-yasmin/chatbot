/**
 * Represents the Main Program Details page and provides methods for interacting
 * with the main program details, such as managing or editing program-related data.
 * @class
 */
export class MainProgramDetailsPage {
  constructor(page) {
    this.page = page;

    // Selectors for main program details elements
    this.subProgramTab = '//button[@id="tab-1"]';
    this.createSubProgramBtn = '//div[@class="MuiStack-root muirtl-nra7hi"]//button[@type="button" and contains(text(),"تعريف برنامج فرعي")]';
  }

 /**
 * Navigates to the "Sub Programs" tab and clicks the "Define Sub Program" button.
 * @returns {Promise<void>} - Completes the action of initiating Sub program creation.
 */
  async InsideCreateSubProgram() {
    await this.page.click(this.subProgramTab);
    await this.page.waitForSelector(this.createSubProgramBtn, {state: "visible"});
    await this.page.waitForTimeout(1000);
    await this.page.click(this.createSubProgramBtn);
    await this.page.waitForTimeout(1000);
    console.log("Clicked the Create Sub program button");  
    }
}

module.exports = { MainProgramDetailsPage };
