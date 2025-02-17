const { Utils } = require('../../Utils/utils.js');

export class SocialRecordCopiesData {

    constructor() {
        this.utils = Utils;
        this.ArVersionName = null;
        this.EnVersionName = null;
        this.activationDate = null;
        this.activationDateForApplicant = null;
        this.activationDateForPrograms = null;
        this.fieldArName = null;
    }

    // Getter and Setter for Version Arabic Name
    getVersionArabicName() {
        if (this.ArVersionName == null) {
            this.ArVersionName = global.testConfig.SocialRecordCopies.ArVersionName + this.utils.generateRandomArabicString(3) + " " + "أوتو";
        }
        return this.ArVersionName;
    }
    setVersionArabicName(value) {
        this.ArVersionName = value;
    }

    // Getter and Setter for Version English Name
    getVersionEnglishName() {
        if (this.EnVersionName == null) {
            this.EnVersionName = global.testConfig.SocialRecordCopies.EnVersionName  + " " +this.utils.generateRandomEnglishString(3) + " " + "Auto";
        }
        return this.EnVersionName;
    }
    setVersionEnglishName(value) {
        this.EnVersionName = value;
    }

    // Getter and Setter for activation Date
    getActivationDate() {
        if (this.activationDate == null) {
            this.activationDate = this.utils.getCurrentDate();
        }
        return this.activationDate;
    }
    setActivationDate(value) {
        this.activationDate = value;
    }

    // Getter and Setter for activation Date for Applicant
    getActivationDateForApplicant() {
        if (this.activationDateForApplicant == null) {
            this.activationDateForApplicant = this.utils.getDateAfterDays(2);
        }
        return this.activationDateForApplicant;
    }
    setActivationDateForApplicant(value) {
        this.activationDateForApplicant = value;
    }

    // Getter and Setter for activation Date for Programs
    getActivationDateForPrograms() {
        if (this.activationDateForPrograms == null) {
            this.activationDateForPrograms = this.utils.getDateAfterDays(3);
        }
        return this.activationDateForPrograms;
    }
    setActivationDateForPrograms(value) {
        this.activationDateForPrograms = value;
    }

    // Getter and Setter for Field Arabic Name
    getFieldArName() {
        if (this.fieldArName == null) {
            return false;
        }
        return this.fieldArName;
    }
    setFieldArName(value) {
        this.fieldArName = value;
    }

}

module.exports = { SocialRecordCopiesData };