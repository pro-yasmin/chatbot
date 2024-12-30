
const { PopUpPage } = require("../SharedPages/PopUpPage");

export class TaskDetailsPage {
  constructor(page) {
    this.page = page;
    this.myStreamDataTab='//button[@id="tab-0"]';
    this.myNotesTab='//button[@id="tab-1"]';
    this.enablementStatus ='(//label[contains(text(),"حالة الإتاحة")]//following::span)[1]';
    this.addNoteBtn = '//button[contains(text(),"إضافة ملاحظة")]';
    this.noteOnTaskField = '//textarea[@name="message"]';
    this.acceptNoteOnTaskBtn = '//button[contains(@class, "MuiButton-containedPrimary") and contains(@class, "MuiButton-sizeMedium")]';
    this.ensureNoteMsgTitle ='//span[@id="modal-modal-title" and contains(text(), "إضافة الملاحظة")]';
    this.acceptEnsureNoteMsgBtn ='//button[contains(@class, "MuiButtonBase-root") and contains(text(), "نعم، أضافة")]';
    this.confirmNoteMsgTitle ='//div[@class="MuiStack-root muirtl-zwd3xv"]/span[@id="modal-modal-title"]';
    this.acceptConfirmNoteMsgBtn ='//button[contains(@class, "MuiButtonBase-root") and text()="العودة"]';
    this.addedNoteLocator='div.MuiStack-root.muirtl-1ofqig9 > span:nth-child(3)';
    this.acceptStreamBtn='//button[contains(@class, "MuiButton-containedPrimary") and contains(., "قبول المسار")]';
    this.acceptMainProgramBtn='//button[contains(text(),"قبول البرنامج الرئيسي")]';
    this.acceptSubProgramsBtn='//button[contains(text(),"قبول البرنامج الفرعي")]';
    this.acceptSubProgramsBtn='//button[contains(text(),"قبول البرنامج الفرعي")]';
    this.ensureAcceptTaskNotesField = '//textarea[@name="description"]';
    this.ensureAcceptTaskNotesBtn ='//button[@type="submit"]';
    this.confirmTaskMsgTitle='//span[@id="modal-modal-title"]';
    this.backToTasksBtn ='//div[contains(@class,"MuiDialogActions")]//button[@type="button"]';
   
  }


  async openTaskDataTab() {
     await this.page.click(this.myStreamDataTab);
     await this.page.waitForTimeout(5000);
  }

  async openNotesTab() {
     await this.page.click(this.myNotesTab);
  }

  async checkEnablementStatus(expectedStatus) {
    await this.openTaskDataTab();
    const statusElement = this.page.locator(this.enablementStatus);
    await statusElement.waitFor({ state: 'visible' });
    const actualStatus = await statusElement.textContent();
    if (actualStatus.trim() === expectedStatus.trim()) {
         console.log(`Enablement Status is as expected: "${actualStatus.trim()}".`);
         return true;
      }
      return false;
  }

 async checkNoteIsAdded(addedNote) {
    var displayedNote = this.page.locator('//*[contains(text(),"'+ addedNote +'")]');
    await displayedNote.waitFor({ state: 'visible'});     
    console.log(`The Note : "${addedNote}" is added Successfully`);
    return true;
    
  }

  async addNoteOnTask() {
    await this.openNotesTab();
    await this.page.waitForTimeout(2000);
    await this.page.click(this.addNoteBtn);
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.inputPopUpMessage(this.noteOnTaskField, this.acceptNoteOnTaskBtn,global.testConfig.taskDetails.note);
    await popUpMsg.popUpMessage(this.ensureNoteMsgTitle, this.acceptEnsureNoteMsgBtn ,global.testConfig.taskDetails.ensureNoteMsg);
    await popUpMsg.popUpMessage(this.confirmNoteMsgTitle, this.acceptConfirmNoteMsgBtn,global.testConfig.taskDetails.confirmNoteMsg);
    let result = await this.checkNoteIsAdded(global.testConfig.taskDetails.note);
    return result;
  }

  async acceptStream() {
    await this.openTaskDataTab();
    await this.page.click(this.acceptStreamBtn);
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.inputPopUpMessage(this.ensureAcceptTaskNotesField, this.ensureAcceptTaskNotesBtn,global.testConfig.taskDetails.addAcceptNote);
    // await this.page.waitForTimeout(2000);
    var result = await popUpMsg.popUpMessage(this.confirmTaskMsgTitle, this.backToTasksBtn,global.testConfig.taskDetails.confirmStreamMsg);
    if (result)
      console.log("The Stream Accepted Successfully.");
    return result;
  }

  async acceptMainProgram() {
    //check if will need to change or not 
    await this.openTaskDataTab();
    await this.page.click(this.acceptMainProgramBtn);
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.inputPopUpMessage(this.ensureAcceptTaskNotesField, this.ensureAcceptTaskNotesBtn,global.testConfig.taskDetails.addAcceptMainProgramNote);
    // await this.page.waitForTimeout(2000);
    var result = await popUpMsg.popUpMessage(this.confirmTaskMsgTitle, this.backToTasksBtn ,global.testConfig.taskDetails.confirmMainProgramMsg);
    if (result)
      console.log("The Main Program Accepted Successfully.");
    return result;
  }

  async acceptSubPrograms() {
    //check if will need to change or not 
    await this.openTaskDataTab();
    await this.page.click(this.acceptSubProgramsBtn);
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.inputPopUpMessage(this.ensureAcceptTaskNotesField, this.ensureAcceptTaskNotesBtn,global.testConfig.taskDetails.addAcceptSubProgramSNote);
    // await this.page.waitForTimeout(2000);
    var result = await popUpMsg.popUpMessage(this.confirmTaskMsgTitle, this.backToTasksBtn ,global.testConfig.taskDetails.confirmSubProgramsMsg);
    if (result)
      console.log("The SubProgram Accepted Successfully.");
    return result;
  }

  async acceptBenefits() {
    //check if will need to change or not 
    await this.openTaskDataTab();
    await this.page.click(this.acceptSubProgramsBtn);
    var popUpMsg = new PopUpPage(this.page);
    await popUpMsg.inputPopUpMessage(this.ensureAcceptTaskNotesField, this.ensureAcceptTaskNotesBtn,global.testConfig.taskDetails.addAcceptSubProgramSNote);
    // await this.page.waitForTimeout(2000);
    var result = await popUpMsg.popUpMessage(this.confirmTaskMsgTitle, this.backToTasksBtn ,global.testConfig.taskDetails.confirmSubProgramsMsg);
    if (result)
      console.log("The SubProgram Accepted Successfully.");
    return result;
  }




}
module.exports = { TaskDetailsPage };
