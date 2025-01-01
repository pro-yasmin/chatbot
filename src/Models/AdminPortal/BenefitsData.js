const { Utils } = require('../../Utils/utils.js');

export class BenefitsData {

  constructor(page) {
    this.page = page;
    this.utils = Utils;
    this.arabicBenefitName = null;
    this.englishBenefitName = null;
    this.benefitsGFSBudget = null;
    this.benefitEstimatedValue = null;
  }
  
  // Getter and Setter for Arabic Benefit Name
  getArabicBenefitName() {
    if (this.arabicBenefitName == null) {
      this.arabicBenefitName = global.testConfig.createBenefits.arabicBenefitName + this.utils.generateRandomArabicString(5) + " " + "أوتو";
    }
    return this.arabicBenefitName;
  }
  setArabicBenefitName(value) {
    this.arabicBenefitName = value;
  }

  // Getter and Setter for English Benefit Name
  getEnglishBenefitName() {
    if (this.englishBenefitName == null) {
      this.englishBenefitName = global.testConfig.createBenefits.englishBenefitName + this.utils.generateRandomEnglishString(5) + " " + "Auto";
    }
    return this.englishBenefitName;
  }
  setEnglishBenefitName(value) {
    this.englishBenefitName = value;
  }

  // Getter and Setter for benefits GFS Budget
  getgetbenefitsGFSBudget() {
    if (this.benefitsGFSBudget == null) {
      this.benefitsGFSBudget = this.utils.generateRandomNumber(2) + " " + "Auto";
    }
    return this.benefitsGFSBudget;
  }
  setbenefitsGFSBudget(value) {
    this.benefitsGFSBudget = value;
  }

  // Getter and Setter for benefit Estimated Value
  getbenefitEstimatedValue() {
    if (this.benefitEstimatedValue == null) {
      this.benefitEstimatedValue = global.testConfig.createBenefits.benefitEstimatedValue + this.utils.generateRandomArabicString(5) + " " + "أوتو";
    }
    return this.benefitEstimatedValue;
  }
  setbenefitEstimatedValue(value) {
    this.benefitEstimatedValue = value;
  }

  // Getter and Setter for Entity
  getentity() {
    if (this.entity == null) {
      this.entity = global.testConfig.createBenefits.entity + this.utils.generateRandomArabicString(5) + " " + "أوتو";
    }
    return this.entity;
  }
  setentity(value) {
    this.entity = value;
  }

  // Getter and Setter for Random Benefit ID
  getCreatedBenefitId() {
    return this.benefitId;
  }
  setCreatedBenefitId(value) {
    this.benefitId = value;
  }
}
