const { ApplicantStreamsPage } = require("./ProgramsManagement/Streams/ApplicantStreamsPage");
const { ApplicantMainProgramsPage } = require("./ProgramsManagement/MainPrograms/ApplicantMainProgramsPage");


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

    var applicantStreamsPage = new ApplicantStreamsPage(this.page);
    var navigationStreams = await applicantStreamsPage.verifyStreams();
    return navigationStreams;  
  }


  /**
   * Navigates to the Applicant Main Programs page.
   * @param {string} baseUrl - The URL of the Applicant portal for Main Programs.
   * @returns {Promise<boolean>} - True if navigation to main programs page was successful.
   */
  async gotoApplicantMainPrograms(baseUrl) {
    await this.page.goto(baseUrl);
    await this.page.waitForTimeout(30000);

    var applicantMainProgramsPage = new ApplicantMainProgramsPage(this.page);
    var navigationSuccess = await applicantMainProgramsPage.verifyMainPrograms();
    return navigationSuccess;
  }
 
}
module.exports = { ApplicantLoginPage };
