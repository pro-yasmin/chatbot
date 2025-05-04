const { SearchPage } = require("../../AdminPortal/SharedPages/SearchPage");

export class ISRListPreviewPage {
    constructor(page) {
        this.page = page;
        this.search = new SearchPage(this.page);

        this.nameFilter = '//input[@data-testid="text-input-name"]';
        this.idFilter = '//input[@data-testid="text-input-nationalId"]';
        this.mobileNumberFilter = '//input[@data-testid="text-input-phoneNumber"]';
        this.filterButton = `//button[contains(text(),"عرض النتائج")]`;
        this.threeDotsButton = `//button[@data-testid="three-dots-menu"]`;
        this.ibrListPreviewOption = `//span[@data-testid="three-dots-menu-item-1"]`;
        this.auListPreviewOption = `//span[@data-testid="three-dots-menu-item-2"]`;

        this.benefitCycleMonth = `//div[@id="mui-component-select-programCycleMonth"]`;
        this.monthOption = `//li[@data-testid="option-7"]`;
        this.benefitCycleYear = `//div[@id="mui-component-select-programCycleYear"]`;
        this.yearOption = `//li[@data-testid="option-55"]`;
        this.stream = `//div[@id="mui-component-select-stream"]`;
        this.streamOption = `//li[@data-value="Social Benefits"]`;
        this.mainProgram = `//div[@id="mui-component-select-mainProgram"]`;
        this.mainProgramOption = `//li[@data-value="citizenAccount"]`;
        this.subProgram = `//div[@id="mui-component-select-subProgram"]`;
        this.subProgramOption = `//li[@data-value="citizenAccount"]`;
        this.benefitResponsibilityEntity = `//div[@id="mui-component-select-benefitResponsibleEntity"]`;
        this.benefitResponsibilityEntityOption = `//li[@data-value="Execution"]`;
        this.benefit = `//div[@id="mui-component-select-benefit"]`;
        this.benefitOption = `//li[@data-value="citizenAccountBenefit"]`;

        this.showResultsButton = `//button[@data-testid="submit-button"]`;

        //filtered list preview Values
        this.benefitCycleMonthValue = `//div[@data-testid="select-box-programCycleMonth-selected-values-0"]//span`;
        this.benefitCycleYearValue = `//div[@data-testid="select-box-programCycleYear-selected-values-0"]//span`;
        this.subProgramValue = `//div[@id="mui-component-select-subProgram"]`;
        this.benefitResponsibilityEntityValue = `//div[@id="mui-component-select-benefitResponsibleEntity"]`;
        this.benefitValue = `//div[@id="mui-component-select-benefit"]`;


        this.benefitTd = `//tr//td[1]//span`;
        this.responsibleEntityTd = `//tr//td[2]//span`;
        this.benefitCycleDateTd = `//tr//td[3]//span`;
        this.subProgramTd = `//tr//td[4]//span`;
    }

    async getIsrByNationalId(nationalId) {
        await this.page.fill(this.idFilter, nationalId);
        await this.page.click(this.filterButton);
        let filterResult = await this.page.waitForSelector(this.threeDotsButton, { state: "visible", timeout: 50000 });
        if (filterResult) {
            console.log("Filter applied with National ID successfully.");
            return true;
        }
        else
            return false;
    }

    async openIBRListPreviewPage() {
        await this.page.click(this.threeDotsButton);
        await this.page.waitForSelector(this.ibrListPreviewOption, { state: "visible", timeout: 20000 });
        await this.page.click(this.ibrListPreviewOption);
        let result = await this.page.waitForSelector(this.showResultsButton, { state: "visible", timeout: 20000 })
        if (result) {
            console.log("IBR List Preview page opened successfully.");
            return true;
        }
        else
            return false;
    }

    async openAUListPreviewPage() {
        await this.page.click(this.threeDotsButton);
        await this.page.waitForSelector(this.auListPreviewOption, { state: "visible", timeout: 20000 });
        await this.page.click(this.auListPreviewOption);
        let result = await this.page.waitForSelector(this.showResultsButton, { state: "visible", timeout: 20000 })
        if (result) {
            console.log("AU List Preview page opened successfully.");
            return true;
        }
        else
            return false;
    }

    async filterListPreviewPage() {
        await this.page.click(this.benefitCycleMonth);
        await this.page.waitForSelector(this.monthOption, { state: "visible", timeout: 20000 });
        await this.page.click(this.monthOption);
        await this.page.click('body'); // Click outside to close the list
        console.log("Benefit Cycle Month selected successfully.");

        await this.page.click(this.benefitCycleYear);
        await this.page.waitForSelector(this.yearOption, { state: "visible", timeout: 20000 });
        await this.page.click(this.yearOption);
        await this.page.click('body'); // Click outside to close the list
        console.log("Benefit Cycle Year selected successfully.");

        await this.page.click(this.stream);
        await this.page.waitForSelector(this.streamOption, { state: "visible", timeout: 20000 });
        await this.page.click(this.streamOption);
        console.log("Stream selected successfully.");

        await this.page.click(this.mainProgram);
        await this.page.waitForSelector(this.mainProgramOption, { state: "visible", timeout: 20000 });
        await this.page.click(this.mainProgramOption);
        console.log("Main Program selected successfully.");

        await this.page.click(this.subProgram);
        await this.page.waitForSelector(this.subProgramOption, { state: "visible", timeout: 20000 });
        await this.page.click(this.subProgramOption);
        console.log("Sub Program selected successfully.");

        await this.page.click(this.benefitResponsibilityEntity);
        await this.page.waitForSelector(this.benefitResponsibilityEntityOption, { state: "visible", timeout: 20000 });
        await this.page.click(this.benefitResponsibilityEntityOption);
        console.log("Benefit Responsibility Entity selected successfully.");

        await this.page.click(this.benefit);
        await this.page.waitForSelector(this.benefitOption, { state: "visible", timeout: 20000 });
        await this.page.click(this.benefitOption);
        console.log("Benefit selected successfully.");

        await this.page.click(this.showResultsButton);
        let filterResult = await this.page.waitForSelector(this.threeDotsButton, { state: "visible", timeout: 20000 });
        if (filterResult) {
            console.log("Filter applied successfully.");
            return true;
        }
        else
            return false;
    }

    async getFilteredListPreviewValues() {
        const benefitCycleMonthText = await this.page.textContent(this.benefitCycleMonthValue);
        const benefitCycleMonthTextTrimmed = benefitCycleMonthText.split(' ')[1];
        console.log("Trimmed Benefit Cycle Month Value: ", benefitCycleMonthTextTrimmed);

        const benefitCycleYearText = await this.page.textContent(this.benefitCycleYearValue);
        const benefitCycleYearTextArabic = benefitCycleYearText.replace(/\d/g, (digit) => {
            return String.fromCharCode(0x0660 + parseInt(digit));
        });
        console.log("Benefit Cycle Year Value in Arabic: ", benefitCycleYearTextArabic);

        const subProgramText = await this.page.textContent(this.subProgramValue);
        console.log("Sub Program Value: ", subProgramText);

        const benefitResponsibilityEntityText = await this.page.textContent(this.benefitResponsibilityEntityValue);
        console.log("Benefit Responsibility Entity Value: ", benefitResponsibilityEntityText);

        const benefitText = await this.page.textContent(this.benefitValue);
        console.log("Benefit Value: ", benefitText);

        return {
            benefitCycleMonthTextTrimmed,
            benefitCycleYearTextArabic,
            subProgramText,
            benefitResponsibilityEntityText,
            benefitText
        };

    }

    async verifyISRListDetails() {
        let benefit;
        let responsibleEntity;
        let benefitCycleDate;
        let subProgram;
        let row = [];

        const filteredValues = await this.getFilteredListPreviewValues();
        row = await this.search.getRowInTableWithSpecificText(filteredValues.benefitText);

        if (row && row.length > 0) {
            benefit = await this.page.textContent(this.benefitTd);
            if (benefit === filteredValues.benefitText) {
                console.log("Benefit matches the filtered value.");
            } else {
                console.log("Benefit does not match the filtered value.");
                return false;
            }

            responsibleEntity = await this.page.textContent(this.responsibleEntityTd);
            if (responsibleEntity === filteredValues.benefitResponsibilityEntityText) {
                console.log("Responsible Entity matches the filtered value.");
            } else {
                console.log("Responsible Entity does not match the filtered value.");
                return false;
            }

            benefitCycleDate = await this.page.textContent(this.benefitCycleDateTd);
            const expectedCycleDate = `${filteredValues.benefitCycleMonthTextTrimmed} ${filteredValues.benefitCycleYearTextArabic}`;
            if (benefitCycleDate === expectedCycleDate) {
                console.log("Benefit Cycle Date matches the filtered value.");
            } else {
                console.log("Benefit Cycle Date does not match the filtered value.");
                return false;
            }

            subProgram = await this.page.textContent(this.subProgramTd);
            if (subProgram === filteredValues.subProgramText) {
                console.log("Sub Program matches the filtered value.");
            } else {
                console.log("Sub Program does not match the filtered value.");
                return false;
            }

            return true;
        } else {
            console.log("No row found with the filtered benefit text.");
        }
        return false;
    }

}


module.exports = { ISRListPreviewPage };