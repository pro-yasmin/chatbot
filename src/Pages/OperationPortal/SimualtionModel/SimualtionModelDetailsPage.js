export class SimualtionModelDetailsPage {
    constructor(page) {
        this.page = page;

        //tabs
        this.dataSourceTab = '//button[@id="tab-1"]';
        this.conditionsTab = '//button[@id="tab-2"]';
        this.variablesTab = '//button[@id="tab-3"]';
        this.modelRecordTab = '//button[@id="tab-4"]';


        //tab1
        this.headlinePage = '(//span[contains(text(),"بيانات نموذج المحاكاة")])[2]';
        this.simulationModelArNameField = '(//span[contains(@class, "MuiTypography-root MuiTypography-p-md-bold")])[9]';
        this.simulationModelEnNameField = '(//span[contains(@class, "MuiTypography-root MuiTypography-p-md-bold")])[10]';
        this.tabOneAttachment = '(//div[contains(@class, "MuiStack-root")])[23]';

        //tab2
        this.tabTwoAttachment = '(//div[contains(@class, "MuiStack-root")])[19]';

        //tab3
        this.tabThreeAttachment = '(//div[contains(@class, "MuiStack-root")])[19]';

        //tab4
        this.variablesGrid = '(//div[contains(@class, "MuiBox-root")])[15]';

        //tab5
        this.statusField = '(//span[contains(@class, "MuiTypography-root MuiTypography-p-md-bold")])[13]';
        this.activateStatusField = '(//span[contains(@class, "MuiTypography-root MuiTypography-p-md-bold")])[14]';

    }

    /**
   * Validates that the Simulation Model page is opened and verifies the content of various fields.
   * @returns {Promise<boolean>} - Returns true if the validation is successful.
   */
    async validateSimulationModelDetails(simulationModelData) {
        await this.page.waitForSelector(this.headlinePage, { visible: true });

        const simulationModelArNameFieldText = await this.page.innerText(this.simulationModelArNameField);
        console.log("Simulation Model Arabic Name: ", simulationModelArNameFieldText);
        const simulationModelEnNameFieldText = await this.page.innerText(this.simulationModelEnNameField);
        console.log("Simulation Model English Name: ", simulationModelEnNameFieldText);

        if (
            simulationModelArNameFieldText === simulationModelData.getSimulationModelArName() &&
            simulationModelEnNameFieldText === simulationModelData.getSimulationModelEnName() &&
            await this.page.$(this.tabOneAttachment) !== null
        ) {
            console.log("Tab One Verifed");
            await this.page.click(this.dataSourceTab);
            if (await this.page.$(this.tabTwoAttachment) !== null) {
                console.log("Tab Two Verified");
                await this.page.click(this.conditionsTab);
                if (await this.page.$(this.tabThreeAttachment) !== null) {
                    console.log("Tab Three Verified");
                    await this.page.click(this.variablesTab);
                    if (await this.page.$(this.variablesGrid) !== null) {
                        console.log("Tab Four Verified");
                        await this.page.click(this.modelRecordTab)
                        const actualStatusValue = await this.page.innerText(this.statusField);
                        const actualActivateStatusValue = await this.page.innerText(this.activateStatusField);
                        if
                            (
                            actualStatusValue === global.testConfig.SimulationModels.simulationModelStatusCreated &&
                            actualActivateStatusValue === global.testConfig.SimulationModels.acivationStatusDisabled
                        ) {
                            console.log("Tab Five Verified");
                            return true;
                        }
                    }
                }
            }
        } else {
            console.log("Simulation Model Information Not Matched");
            return false;
        }
    }
}
module.exports = { SimualtionModelDetailsPage };