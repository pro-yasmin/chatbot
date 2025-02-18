const { Utils } = require('../../Utils/utils.js');

export class SimulationModelData {

    constructor() {
        this.utils = Utils;
        //tab1
        this.simulationModelArName = null;
        this.simulationModelEnName = null;
        this.simulationModelDescription = null;
        this.variableArName = null;
        this.variableEnName = null;
        this.variableDescription = null;
        this.defaultValue = null;
    }

    // Getter and Setter for Simulation Model Arabic Name
    getSimulationModelArName() {
        if (this.simulationModelArName == null) {
            this.simulationModelArName = global.testConfig.SimulationModels.simulationModelArName + this.utils.generateRandomArabicString(3) + " " + "أوتو";
        }
        return this.simulationModelArName;
    }
    setSimulationModelArName(value) {
        this.simulationModelArName = value;
    }

    // Getter and Setter for Simulation Model English Name
    getSimulationModelEnName() {
        if (this.simulationModelEnName == null) {
            this.simulationModelEnName = global.testConfig.SimulationModels.simulationModelEnName + " " + this.utils.generateRandomEnglishString(3) + " " + "Auto";
        }
        return this.simulationModelEnName;
    }
    setSimulationModelEnName(value) {
        this.simulationModelEnName = value;
    }

    // Getter and Setter for Simulation Model Description
    getSimulationModelDescription() {
        if (this.simulationModelDescription == null) {
            this.simulationModelDescription = global.testConfig.SimulationModels.simulationModelDescription + " " + this.utils.generateRandomArabicString(3) + " " + "أوتو";
        }
        return this.simulationModelDescription;
    }
    setSimulationModelDescription(value) {
        this.simulationModelDescription = value;
    }

    // Getter and Setter for variable Arabic Name
    getVariableArName() {
        if (this.variableArName == null) {
            this.variableArName = global.testConfig.SimulationModels.variableArName;
        }
        return this.variableArName;
    }
    setVariableArName(value) {
        this.variableArName = value;
    }

    // Getter and Setter for variable English Name
    getVariableEnName() {
        if (this.variableEnName == null) {
            this.variableEnName = global.testConfig.SimulationModels.variableEnName;
        }
        return this.variableEnName;
    }
    setVariableEnName(value) {
        this.variableEnName = value;
    }

    // Getter and Setter for variable Description
    getVariableDescription() {
        if (this.variableDescription == null) {
            this.variableDescription = global.testConfig.SimulationModels.variableDescription + " " + this.utils.generateRandomArabicString(3) + " " + "أوتو";
        }
        return this.variableDescription;
    }
    setVariableDescription(value) {
        this.variableDescription = value;
    }

    // Getter and Setter for default Value
    getDefaultValue() {
        if (this.defaultValue == null) {
            this.defaultValue = global.testConfig.SimulationModels.defaultValue;
        }
        return this.defaultValue;
    }
    setDefaultValue(value) {
        this.defaultValue = value;
    }

}

module.exports = { SimulationModelData };