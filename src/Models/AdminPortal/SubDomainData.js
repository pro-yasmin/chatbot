import Constants from '../../Utils/Constants.js';

const {Utils }= require('../../Utils/utils.js');

export class SubDomainData {

    constructor() {
      this.utils = Utils;
      this.subDomainArabicName= null;
      this.subDomainEnglishName= null;
      this.acceptChildType= null;
      this.assignedDomain= null;
      this.subDomainDescription= null;
    }

 // Getter and Setter for subDomainArabicName
 getsubDomainArabicName() {
    if (this.subDomainArabicName == null) {
        this.subDomainArabicName =global.testConfig.createSubDomain.subDomainArabicName +" "+ this.utils.generateRandomArabicString(5)+" "+"أوتو";
    }
    return this.subDomainArabicName;
    }
setsubDomainArabicName(value) {
      this.subDomainArabicName = value;
    }

    // Getter and Setter for subDomainEnglishName
 getsubDomainEnglishName() {
    if (this.subDomainEnglishName == null) {
        this.subDomainEnglishName =global.testConfig.createSubDomain.subDomainEnglishName +" "+ this.utils.generateRandomEnglishString(5)+" "+"Auto";
    }
    return this.subDomainEnglishName;
    }
setsubDomainEnglishName(value) {
      this.subDomainEnglishName = value;
    }

    // Getter and Setter for assignedDomain
 getassignedDomain() {
    if (this.assignedDomain == null) {
        this.assignedDomain =global.testConfig.createSubDomain.assignedDomain;
    }
    return this.assignedDomain;
    }
setassignedDomain(value) {
      this.assignedDomain = value;
    }

// Getter and Setter for acceptChildType
getacceptChildType() {
    if (this.acceptChildType == null) {
        this.acceptChildType =Constants.SUBDOMAIN_CHILD_FIELD;
    }
    return this.acceptChildType;
    }
setacceptChildType(value) {
      this.acceptChildType = value;
    }


// Getter and Setter for subDomainDescription
getsubDomainDescription() {
    if (this.subDomainDescription == null) {
        this.subDomainDescription =global.testConfig.createSubDomain.subDomainDescription;
    }
    return this.subDomainDescription;
    }
setsubDomainDescription(value) {
      this.subDomainDescription = value;
    }

}
  