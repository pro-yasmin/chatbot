const { Utils } = require('../../Utils/utils.js');

export class LookupData {

    constructor(page) {
        this.page = page;
        this.utils = Utils;
        this.lookupArabicName = null;
        this.lookupEnglishName = null;
        this.lookupDescriptionArabicName = null;
        this.lookupDescriptionEnglishName = null;
        this.nameInArabic = null;
        this.nameInEnglish = null;
        this.code = null;
        this.nameArabic = null;
        this.nameEnglish = null;
        this.codeLookup = null;
        this.lookupId = null;
    }

    // Getter and Setter for lookupArabicName
    getLookupArabicName() {
        if (this.lookupArabicName == null) {
            this.lookupArabicName = this.utils.generateRandomArabicString(5) + " " + "أوتو";
        }
        return this.lookupArabicName;
    }
    setLookupArabicName(value) {
        this.lookupArabicName = value;
    }

    // Getter and Setter for lookupEnglishName
    getLookupEnglishName() {
        if (this.lookupEnglishName == null) {
            this.lookupEnglishName = this.utils.generateRandomEnglishString(5) + "Auto";
        }
        return this.lookupEnglishName;
    }
    setLookupEnglishName(value) {
        this.lookupEnglishName = value;
    }

    // Getter and Setter for lookupDescriptionArabicName
    getLookupDescriptionArabicName() {
        if (this.lookupDescriptionArabicName == null) {
            this.lookupDescriptionArabicName = this.utils.generateRandomArabicString(10);
        }
        return this.lookupDescriptionArabicName;
    }
    setLookupDescriptionArabicName(value) {
        this.lookupDescriptionArabicName = value;
    }

    // Getter and Setter for lookupDescriptionEnglishName
    getLookupDescriptionEnglishName() {
        if (this.lookupDescriptionEnglishName == null) {
            this.lookupDescriptionEnglishName = this.utils.generateRandomEnglishString(10);
        }
        return this.lookupDescriptionEnglishName;
    }
    setLookupDescriptionEnglishName(value) {
        this.lookupDescriptionEnglishName = value;
    }

    // Getter and Setter for nameInArabic
    getNameInArabic() {
        if (this.nameInArabic == null) {
            this.nameInArabic = this.utils.generateRandomArabicString(8);
        }
        return this.nameInArabic;
    }
    setNameInArabic(value) {
        this.nameInArabic = value;
    }

    // Getter and Setter for nameInEnglish
    getNameInEnglish() {
        if (this.nameInEnglish == null) {
            this.nameInEnglish = this.utils.generateRandomEnglishString(7);
        }
        return this.nameInEnglish;
    }
    setNameInEnglish(value) {
        this.nameInEnglish = value;
    }

    // Getter and Setter for code
    getCode() {
        if (this.code == null) {
            this.code = this.utils.generateRandomNumber(6);
        }
        return this.code;
    }
    setCode(value) {
        this.code = value;
    }

    // Getter and Setter for nameArabic
    getNameArabic() {
        if (this.nameArabic == null) {
            this.nameArabic = this.utils.generateRandomArabicString(6);
        }
        return this.nameArabic;
    }
    setNameArabic(value) {
        this.nameArabic = value;
    }

    // Getter and Setter for nameEnglish
    getNameEnglish() {
        if (this.nameEnglish == null) {
            this.nameEnglish = this.utils.generateRandomEnglishString(6);
        }
        return this.nameEnglish;
    }
    setNameEnglish(value) {
        this.nameEnglish = value;
    }

    // Getter and Setter for codeLookup
    getCodeLookup() {
        if (this.codeLookup == null) {
            this.codeLookup = this.utils.generateRandomNumber(6);
        }
        return this.codeLookup;
    }
    setCodeLookup(value) {
        this.codeLookup = value;
    }

    // Getter and Setter for lookup ID Number
    getCreatedLookupId() {
        return this.lookupId;
    }

    // Setter for lookup ID Number
    setCreatedLookupId(Value) {
        this.lookupId = Value;
    }
}

module.exports = { LookupData };