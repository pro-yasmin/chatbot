const { Utils } = require('../../Utils/utils.js');

export class SubProgramsData {

  constructor(page) {
    this.page = page;
    this.utils = Utils;
    this.arabicSubProgramName = null;
    this.englishSubProgramName = null;
    this.GFS_Budget = null;
    this.conditionsOfAssistanceUnit = null;

  }

  // Getter and Setter for Arabic Sub Program Name
  getArabicSubProgramName() {
    if (this.arabicSubProgramName == null) {
      this.arabicSubProgramName = global.testConfig.createSubPrograms.arabicSubProgramName + this.utils.generateRandomArabicString(5)+" "+"أوتو";
    }
    return this.arabicSubProgramName;
  }
  setArabicSubProgramName(value) {
    this.arabicSubProgramName = value;
  }

  // Getter and Setter for English Sub Program Name
  getEnglishSubProgramName() {
    if (this.englishSubProgramName == null) {
      this.englishSubProgramName = global.testConfig.createSubPrograms.englishSubProgramName + this.utils.generateRandomEnglishString(5)+" "+"Auto";
    }
    return this.englishSubProgramName;
  }
  setEnglishSubProgramName(value) {
    this.englishSubProgramName  = value;
  }

  // Getter and Setter for Responsible Entity
  getGFSBudget()  {
    if (this.GFS_Budget == null) {
      this.GFS_Budget = this.utils.generateRandomNumber(2)+" "+"Auto";;
    }
    return this.GFS_Budget;
  }
  setGFSBudget(value) {
    this.GFS_Budget = value;
  }


  // Getter and Setter for Responsible Entity
  getConditionsOfAssistanceUnit()  {
    if (this.conditionsOfAssistanceUnit == null) {
      this.conditionsOfAssistanceUnit = global.testConfig.createSubPrograms.conditionsOfAssistanceUnit + this.utils.generateRandomArabicString(5)+" "+"أوتو";
    }
    return this.conditionsOfAssistanceUnit;
  }
  setConditionsOfAssistanceUnit(value) {
    this.conditionsOfAssistanceUnit = value;
  }


  // Getter and Setter for Random subProgram ID
  getCreatedSubProgramId() {
    return this.programId;
  }
  setCreatedSubProgramId(value) {
    this.programId = value;
  }
}
