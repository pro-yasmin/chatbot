const { StreamsPage } = require("./ProgramsManagement/Streams/StreamsPage");

export class ApplicantLoginPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigates to the Applicant portal .
   * @param {string} baseUrl - The URL of the Applicant portal.
   * @returns {Promise<void>} - Completes the navigation and language setup.
   */
  async gotoApplicantStreams(baseUrl) {
    await this.page.goto(baseUrl);
    await this.page.waitForTimeout(30000);

    var streamsPage = new StreamsPage(this.page);
    var navigationStreams = await streamsPage.verifyStreams();
    return navigationStreams;  
  }
 
}
module.exports = { ApplicantLoginPage };
