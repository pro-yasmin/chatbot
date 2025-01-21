const { StreamManagementPage } = require("./StreamManagementPage");

/**
 * Represents the Stream Details page and provides methods for interacting
 * with the stream details, such as navigating to and creating main programs.
 * @class
 */
export class StreamDetailsPage {
  constructor(page) {
    this.page = page;

    // Selectors for stream details elements
    this.mainProgramTab = '//button[@id="tab-1"]';
    this.createMainProgramBtn = '//button[@type="button" and contains(text(),"تعريف برنامج رئيسي")]';
  }

  
  /**
 * Navigates to the "Main Program" tab and clicks the "Create Main Program" button.
 * @returns {Promise<void>} - Completes the action of initiating main program creation.
 */
  async InsideCreateMainProgram(streamNumber) {
    
     var streamManagementPage = new StreamManagementPage(this.page);
      await streamManagementPage.openViewStreamDetailsPage(streamNumber);
      await this.page.click(this.mainProgramTab);
      await this.page.waitForSelector(this.createMainProgramBtn, {state: "visible"});
      await this.page.waitForTimeout(1000);
      await this.page.click(this.createMainProgramBtn);
      await this.page.waitForTimeout(1000);
      console.log("Clicked the Create Main program button");  
      }

  }

module.exports = { StreamDetailsPage };
