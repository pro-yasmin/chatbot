const { PopUpPage }= require('../SharedPages/PopUpPage');


export class StreamPage {
    constructor(page) {
        this.page = page;
        this.streamArabicName ='//input[@name="nameAr"]';
        this.streamEnglishName= '//input[@name="nameEn"]';
        this.streamArabicDescription ='//textarea[@name="arabicDescription"]';
        this.streamEnglishDescription = '//textarea[@name="englishDescription"]';
        this.arabicStreamGoal = '//textarea[@name="goalAr"]';
        this.englishStreamGoal = '//textarea[@name="goalEn"]';
        this.arabicGoal = '//textarea[@name="streamGoals.0.nameAr"]';
        this.englishGoal = '//textarea[@name="streamGoals.0.nameEn"]';
        this.streamDefinitionButton ='//button[@type="submit"]';
        this.successPopupTitle= '//span[@id="modal-modal-title"]';
        this.errorMessage='//span[contains(text(),"يجب إدخال قيم صحيحة في الحقول المطلوبة")]';
        this.backToAllStreamPageButton = '//button[contains(text(),"العودة إلى قائمة المسارات")]';  
         }

      
      async createNewStream (streamData) {
         
        var popUpMsg = new PopUpPage(this.page);
  

        var createdStreamEnName = streamData.getstreamEnglishName();
        var createdStreamArName = streamData.getstreamArabicName();

          await this.page.waitForSelector(this.streamArabicName, { state: 'visible',timeout: 5000 });
          await this.page.fill(this.streamArabicName,createdStreamArName);
          await this.page.fill(this.streamEnglishName, createdStreamEnName);
          await this.page.fill(this.streamEnglishName,streamData.getstreamEnglishName());
          await this.page.fill(this.streamArabicDescription,streamData.getstreamArabicDescription());
          await this.page.fill(this.streamEnglishDescription,streamData.getstreamEnglishDescription());
          await this.page.fill(this.arabicStreamGoal,streamData.getarabicStreamGoal());
          await this.page.fill(this.englishStreamGoal,streamData.getenglishStreamGoal());
          await this.page.fill(this.arabicGoal,streamData.getarabicGoal());
          await this.page.fill(this.englishGoal,streamData.getenglishGoal());
          
          await this.page.waitForSelector(this.streamDefinitionButton, { state: 'visible' });
          await this.page.click(this.streamDefinitionButton);

          streamData.setstreamEnglishName(createdStreamEnName);
          streamData.setstreamArabicName(createdStreamArName);

          var result =await popUpMsg.popUpMessage( this.successPopupTitle , this.backToAllStreamPageButton,global.testConfig.createStream.streamSuccessMsg);
          return result;



  }
}
module.exports = { StreamPage };
