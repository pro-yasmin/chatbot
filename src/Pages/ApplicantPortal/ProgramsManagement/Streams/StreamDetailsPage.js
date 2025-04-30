export class StreamDetailsPage {
  constructor(page) {
    this.page = page;

    // Selectors for stream details elements
    this.mainProgramTab = '//button[@data-testid="tab-2"]';
    this.subProgramTab = '//button[@data-testid="tab-3"]';
    this.benefitsTab = '//button[@data-testid="tab-4"]';
    this.createMainProgramBtn = '//button[@data-testid="tooltip-button"]';
    this.searchInput = '//form[@data-testid="search-input"]';

    this.streamId = '//span[@data-testid="value_stream-serial-number"]';
    this.streamArabicName = '//span[@data-testid="value_stream-arabic-name"]';
    this.streamEnglishName = '//span[@data-testid="value_stream-english-name"]';
    this.streamArabicDescription = '//span[@data-testid="value_stream-arabic-description"]';
    this.streamEnglishDescription = '//span[@data-testid="value_stream-english-description"]';
    this.streamArabicGoal = '//span[@data-testid="value_stream-goal-ar"]';
    this.streamEnglishGoal = '//span[@data-testid="value_stream-goal-en"]';
    this.createdBy = '//span[@data-testid="value_stream-creator-name"]';
    this.enablementStatus = '//span[@data-testid="value_streams-management-stream-enablement-status"]';
  
  }

/**
   * Retrieves all stream details displayed on the UI dynamically.
   * @returns {Promise<object>} - Object containing all stream details.
   */
  async getUiStreamDetails() {
  return {
    streamId: (await this.page.locator(this.streamId).textContent()).trim(),
    streamArabicName: (await this.page.locator(this.streamArabicName).textContent()).trim(),
    streamEnglishName: (await this.page.locator(this.streamEnglishName).textContent()).trim(),
    streamArabicDescription: (await this.page.locator(this.streamArabicDescription).textContent()).trim(),
    streamEnglishDescription: (await this.page.locator(this.streamEnglishDescription).textContent()).trim(),
    streamArabicGoal: (await this.page.locator(this.streamArabicGoal).textContent()).trim(),
    streamEnglishGoal: (await this.page.locator(this.streamEnglishGoal).textContent()).trim(),

  };
}

/**
 * Retrieves all stream details displayed on the UI dynamically and compares them with the expected data.
 * @param {object} createdData - The expected stream details from `StreamData.js`.
 * @param {string} streamNumber - The expected stream ID.
 * @returns {Promise<boolean>} - Returns true if all details match, otherwise false.
 */
async compareStreamDetails(createdData, streamNumber) {
  const uiDetails = await this.getUiStreamDetails();

  const expectedDetails = {
    streamId: streamNumber,
    streamArabicName: createdData.getstreamArabicName(),
    streamEnglishName: createdData.getstreamEnglishName(),
    streamArabicDescription: createdData.getstreamArabicDescription(),
    streamEnglishDescription: createdData.getstreamEnglishDescription(),
    streamArabicGoal: createdData.getarabicGoal(),
    streamEnglishGoal: createdData.getenglishGoal(),
  };

  const allValid = Object.keys(expectedDetails).every(key => uiDetails[key] === expectedDetails[key]);

  return allValid;
}

}

module.exports = { StreamDetailsPage };
