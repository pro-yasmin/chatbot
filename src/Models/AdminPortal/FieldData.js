import Constants from '../../Utils/Constants.js';

const {Utils }= require('../../Utils/utils.js');

export class FieldData {

  constructor() {
    this.utils = Utils;
    this.fieldArabicName = null;
    this.fieldEnglishName = null;
    this.arabicFieldDescription = null;
    this.englishFieldDescription = null;
    this.fieldType = null;
    this.fieldId = null;  
    this.glossaryParentName = null ;
    this.glossaryFieldNature = null;
    this.glossaryFieldSource = null;
    this.glossaryAxonStatus = null;

  }

// Getter and Setter for FieldType
getFieldType() {
    if (this.fieldType == null) {
        this.fieldType =Constants.COMPLEX_FIELD
        // global.testConfig.createField.fieldArabicName +" "+ this.utils.generateRandomArabicString(5)+" "+"أوتو";
    }
    return this.fieldType;
    }
setFieldType(value) {
      this.fieldType = value;
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

    // Getter and Setter for Field ID Number
    getCreatedFieldId() {
        return this.fieldId;
    }
    // Setter for FieldID
    setCreatedFieldId(Value) {
        this.fieldId = Value;
    }

    // Getter and Setter for Glossary Parent Name
     getGlossaryParentName() {
        if (this.glossaryParentName == null) {
            this.glossaryParentName =global.testConfig.createField.glossaryParentBeforeApprove;
        }
        return this.glossaryParentName;
    }
    // Setter for Glossary Parent Name
    setGlossaryParentName(Value) {
        this.glossaryParentName = Value;
    }
    
    // Getter and Setter for Glossary Field Nature
     getGlossaryFieldNature() {
        if (this.glossaryFieldNature == null) {
            this.glossaryFieldNature =global.testConfig.createField.glossaryFieldEmptyValue;
        }
        return this.glossaryFieldNature;
    }
    // Setter for Glossary Field Nature
    setGlossaryFieldNature(Value) {
        this.glossaryFieldNature = Value;
    }

    // Getter and Setter for Glossary Field Source
    getGlossaryFieldSource() {
        if (this.glossaryFieldSource == null) {
            this.glossaryFieldSource =global.testConfig.createField.glossaryFieldEmptyValue;
        }
        return this.glossaryFieldSource;
    }
    // Setter for Glossary Field Source
    setGlossaryFieldSource(Value) {
        this.glossaryFieldSource = Value;
    }
    
    // Getter and Setter for Glossary Axon Status
    getGlossaryAxonStatus() {
        if (this.glossaryAxonStatus == null) {
            this.glossaryAxonStatus =global.testConfig.createField.glossaryFieldAxsonStatus;
        }
        return this.glossaryAxonStatus;
    }
    // Setter for Glossary Axon Status
    setGlossaryAxonStatus(Value) {
        this.glossaryAxonStatus = Value;
    }
    

}


module.exports = { FieldData };