import { LookupData } from "../../../Models/AdminPortal/LookupData";

const { SearchPage } = require("../SharedPages/SearchPage");

const { expect } = require('@playwright/test');

export class LookupsManagmentPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);
        this.addButton = '//button[contains(text(),"إنشاء قائمة مرجعية")]';
        this.viewLookUpButton = '(//button[@class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium muirtl-rrlqo"])[1]';
        this.lookupStatus = '(//span[@class="MuiChip-label MuiChip-labelMedium muirtl-11lqbxm"])[1]';
        this.lookupTable = "//table//tbody";
        this.editLookupButton = '(//button[@class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium muirtl-rrlqo"])[2]';

    }


    // Click on Add Button
    async clickAddButton() {
        await this.page.waitForTimeout(2000);
        await this.page.waitForSelector(this.addButton, { visible: true });
        await this.page.click(this.addButton);
    }

    /**
     * Clicks the "View" button for a specific lookup entry in the lookup table.
     *
     * @param {Object} lookupData - The data object containing information about the lookup entry.
     * @param {Function} lookupData.getCreatedLookupId - A function that returns the ID of the created lookup entry.
     * @returns {Promise<void>} - A promise that resolves when the action is completed.
     */
    async clickViewLookUpButton(lookupData) {
        let lookupRow = [];
        lookupRow = await this.search.getRowInTableWithSpecificText(this.lookupTable, lookupData.getCreatedLookupId());
        var actionlocator = "div >> button:nth-of-type(1)";
        await this.search.clickRowAction(lookupRow, actionlocator);
    }

    /**
     * Clicks the edit button for a specific lookup entry in the lookup table.
     *
     * @param {Object} lookupData - The data object containing information about the lookup entry.
     * @param {Function} lookupData.getCreatedLookupId - A function that returns the ID of the created lookup entry.
     * @returns {Promise<void>} - A promise that resolves when the edit button has been clicked.
     */
    async clickEditLookupButton(lookupData) {
        let lookupRow = [];
        lookupRow = await this.search.getRowInTableWithSpecificText(this.lookupTable, lookupData.getCreatedLookupId());
        var actionlocator = "div >> button:nth-of-type(2)";
        await this.search.clickRowAction(lookupRow, actionlocator);
    }

    /**
     * Checks if a new lookup has been added successfully by verifying the Arabic name, English name, and status.
     * 
     * @param {Object} lookupData - The data of the lookup to be checked.
     * @param {Function} lookupData.getLookupArabicName - Function to get the Arabic name of the lookup.
     * @param {Function} lookupData.getLookupEnglishName - Function to get the English name of the lookup.
     * @param {Function} lookupData.setCreatedLookupId - Function to set the created lookup ID.
     * 
     * @returns {Promise<boolean>} - Returns true if the lookup names and status match the expected values, otherwise false.
     */
    async checkNewLookupAdded(lookupData) {
        let arabicTd;
        let englishTd;
        let statusTd;
        let lookupArabicName;
        let lookupEnglishName;
        let lookupStatus;
        let lookupRow = [];
        lookupRow = await this.search.getRowInTableWithSpecificText(this.lookupTable, lookupData.getLookupEnglishName());

        if (lookupRow && lookupRow.length > 0) {
            arabicTd = lookupRow[1].tdLocator;
            lookupArabicName = arabicTd.locator("span");
            await lookupArabicName.waitFor({ state: "visible" });
            var actualLookupArabicName = await lookupArabicName.textContent();

            console.log("Actual Arabic Name: ", actualLookupArabicName);
            console.log("Expected Arabic Name: ", lookupData.getLookupArabicName());

            englishTd = lookupRow[2].tdLocator;
            lookupEnglishName = englishTd.locator("span");
            await lookupEnglishName.waitFor({ state: "visible" });
            var actualLookupEnglishName = await lookupEnglishName.textContent();

            console.log("Actual English Name: ", actualLookupEnglishName);
            console.log("Expected English Name: ", lookupData.getLookupEnglishName());

            statusTd = lookupRow[9].tdLocator;
            lookupStatus = statusTd.locator("span");
            await lookupStatus.waitFor({ state: "visible" });
            var actualLookupStatus = await lookupStatus.textContent();

            console.log("Status: ", actualLookupStatus);
        }

        if (
            actualLookupArabicName === lookupData.getLookupArabicName() &&
            actualLookupEnglishName === lookupData.getLookupEnglishName() &&
            actualLookupStatus === global.testConfig.lookUps.lookUpStatusActive
        ) {
            console.log("Lookup names matched successfully.");
            let lookupId = await lookupRow[0].tdLocator.textContent();
            lookupData.setCreatedLookupId(lookupId);
            console.log("Created Lookup ID set in LookupData: " + lookupData.getCreatedLookupId());
            return true;
        }
        return false;

    }
}
module.exports = { LookupsManagmentPage };
