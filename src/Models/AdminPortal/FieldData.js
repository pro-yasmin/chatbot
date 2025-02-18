const {Utils }= require('../../Utils/utils.js');

export class FieldData {

  constructor() {
    this.utils = Utils;
    this.fieldArabicName = null;
    this.fieldEnglishName = null;
    this.arabicFieldDescription = null;
    this.englishFieldDescription = null;
   

  }

  // Getter and Setter for FieldArabicName
  getArabicFieldName() {
      if (this.fieldArabicName == null) {
          this.fieldArabicName =global.testConfig.createField.fieldArabicName +" "+ this.utils.generateRandomArabicString(5)+" "+"أوتو";
      }
      return this.fieldArabicName;
      }
  setArabicFieldName(value) {
        this.fieldArabicName = value;
      }

      // Getter and Setter for FieldEnglishName
    getEnglishFieldName() {
        if (this.fieldEnglishName == null) {
            this.fieldEnglishName =global.testConfig.createField.fieldEnglishName +" "+ this.utils.generateRandomEnglishString(5)+" "+"Auto";
        }
        return this.fieldEnglishName;
        }
    setEnglishFieldName(value) {
        this.fieldEnglishName = value;
        }

    // Getter and Setter for ArabicFieldDescription
    getArabicFieldDescription() {
        if (this.arabicFieldDescription == null) {
            this.arabicFieldDescription = global.testConfig.createField.arabicFieldDescription + this.utils.generateRandomArabicString(10);
        }
        return this.arabicFieldDescription;
        }
    setArabicFieldDescription(value) {
        this.arabicFieldDescription = value;
        }

    // Getter and Setter for EnglishFieldDescription
    getEnglishFieldDescription() {
        if (this.englishFieldDescription == null) {
            this.englishFieldDescription = global.testConfig.createField.englishFieldDescription + this.utils.generateRandomEnglishString(10);
        }
        return this.englishFieldDescription;
        }
    setEnglishFieldDescription(value) {
        this.englishFieldDescription = value;
        }




    }


module.exports = { FieldData };