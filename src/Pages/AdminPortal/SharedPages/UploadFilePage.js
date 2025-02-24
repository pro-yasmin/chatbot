/**
 * Manages search-related actions for tables, including searching for rows by value or text,
 * retrieving row details, and performing actions on specific rows.
 * @class
 */
export class UploadFilePage {
  constructor(page) {
    this.page = page;
    this.tableSelector = "//table//tbody";
    this.uploaderLocator = '//input[@type="file"]';
  }

  async uploadFile(fileName, uploadButton) {
    await this.page.setInputFiles(this.uploaderLocator, global.testConfig.UPLOAD_PATH+fileName);
    await this.page.waitForSelector(uploadButton, { visible: true });
    await this.page.click(uploadButton);
    var expectedFileName = "//*[contains(text(), '" + fileName + "')]";
    await this.page.waitForSelector(expectedFileName, { visible: true });
  }
}
module.exports = { UploadFilePage };
