import Constants from '../../../Utils/Constants';

export class LiferayStreamsPage {
  
  constructor(page) {
    this.page = page;

    // Selectors for stream page
    this.streamWord = '//h1[normalize-space()="Streams"]';
    this.streamSearchInput = '//input[@placeholder="Search"]';
    this.searchBtn = '//button[@aria-label="Search" and @type="submit"]';
    this.streamEnLocator = "div[class='dnd-tbody'] div:nth-child(2)";
    this.viewBtn= '//div[@class="dnd-td item-actions"]//a[@title="View"]';
    
    this.uploadIconBtn = '//div[@data-field-name="streamLogo"]//button[@type="button"][normalize-space()="Select File"]';
    this.uploadCoverBtn = '//div[@data-field-name="streamCoverMedia"]//button[@type="button"][normalize-space()="Select File"]';
    this.uploaderLocator= '//button[normalize-space()="Add"]';
    this.dragButton = '//div[@class="dropzone"]//input[@type="file"]';

  }

  

  async verifyStreams() {
    await this.page.waitForSelector(this.streamSearchInput, { state: "visible",timeout: 5000});
    return await this.page.locator(this.streamSearchInput).isVisible();
  }


  async openStreamDetials(streamName) {

    await this.page.fill(this.streamSearchInput, streamName);
    await this.page.click(this.searchBtn);
    await this.page.waitForTimeout(2000);
    var actualStreamEnName = (await this.page.locator(this.streamEnLocator).textContent())?.trim();
    if (actualStreamEnName === streamName) {
      await this.page.click(this.viewBtn);
      console.log("Streams Detials Page in Liferay open Successfully");
      return true;
      }
    return false;
  }


 async uploadImage(fileName, uploadButton, verifyFileUploaded) {

  await this.page.click(uploadButton);
  await this.page.waitForTimeout(5000);
  await this.page.setInputFiles(this.dragButton, global.testConfig.UPLOAD_PATH + fileName);
  await this.page.waitForTimeout(3000);
  await this.page.click(uploaderLocator);

    if (verifyFileUploaded === Constants.VERIFY_FILE_UPLOADED) {
      var expectedFileName = "//button[contains(text(), ' " + fileName + " ')] ";
      await this.page.waitForSelector(expectedFileName, { visible: true });
      return true;
    } 
    return false;
  }

  async addStreamImages() {
    var iconImage = global.testConfig.Liferay.iconImage;
    var coverImage = global.testConfig.Liferay.coverImage;
    var addIcon = await this.uploadImage(iconImage ,this.uploadIconBtn , Constants.VERIFY_FILE_UPLOADED); 
    console.log("Icon Image uploaded Successfully");
    var addCover= await this.uploadImage(coverImage ,this.uploadCoverBtn , Constants.VERIFY_FILE_UPLOADED);
    console.log("Cover Image uploaded Successfully");
    if(addIcon && addCover){
       return true;
        }
      return false; 
    }



  }
module.exports = { LiferayStreamsPage };
