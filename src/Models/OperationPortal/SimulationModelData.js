const { Utils } = require('../../Utils/utils.js');

export class SimulationModelData {

    constructor() {
        this.utils = Utils;
        //tab1
        this.simulationModelArName = null;
        this.simulationModelEnName = null;
        this.simulationModelDescription = null;
        this.variableOneArName = null;
        this.variableOneEnName = null;
        this.variableOneDescription = null;
        this.defaultValueOne = null;

        this.variableTwoArName = null;
        this.variableTwoEnName = null;
        this.variableTwoDescription = null;
        this.defaultValueTwo = null;

        this.variableThreeArName = null;
        this.variableThreeEnName = null;
        this.variableThreeDescription = null;
        this.simulationModelId = null;
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
    getVariableOneArName() {
        if (this.variableOneArName == null) {
            this.variableOneArName = global.testConfig.SimulationModels.variableOneArName;
        }
        return this.variableOneArName;
    }
    setVariableOneArName(value) {
        this.variableOneArName = value;
    }
    getVariableTwoArName() {
        if (this.variableTwoArName == null) {
            this.variableTwoArName = global.testConfig.SimulationModels.variableTwoArName;
        }
        return this.variableTwoArName;
    }
    setVariableTwoArName(value) {
        this.variableTwoArName = value;
    }
    getVariableThreeArName() {
        if (this.variableThreeArName == null) {
            this.variableThreeArName = global.testConfig.SimulationModels.variableThreeArName;
        }
        return this.variableThreeArName;
    }
    setVariableThreeArName(value) {
        this.variableThreeArName = value;
    }

    // Getter and Setter for variable English Name
    getVariableOneEnName() {
        if (this.variableOneEnName == null) {
            this.variableOneEnName = global.testConfig.SimulationModels.variableOneEnName;
        }
        return this.variableOneEnName;
    }
    setVariableOneEnName(value) {
        this.variableOneEnName = value;
    }
    getVariableTwoEnName() {
        if (this.variableTwoEnName == null) {
            this.variableTwoEnName = global.testConfig.SimulationModels.variableTwoEnName;
        }
        return this.variableTwoEnName;
    }
    setVariableTwoEnName(value) {
        this.variableTwoEnName = value;
    }
    getVariableThreeEnName() {
        if (this.variableThreeEnName == null) {
            this.variableThreeEnName = global.testConfig.SimulationModels.variableThreeEnName;
        }
        return this.variableThreeEnName;
    }
    setVariableThreeEnName(value) {
        this.variableThreeEnName = value;
    }

    // Getter and Setter for variable Description
    getVariableOneDescription() {
        if (this.variableOneDescription == null) {
            this.variableOneDescription = global.testConfig.SimulationModels.variableOneDescription + " " + this.utils.generateRandomArabicString(3) + " " + "أوتو";
        }
        return this.variableOneDescription;
    }
    setVariableOneDescription(value) {
        this.variableOneDescription = value;
    }
    getVariableTwoDescription() {
        if (this.variableTwoDescription == null) {
            this.variableTwoDescription = global.testConfig.SimulationModels.variableTwoDescription + " " + this.utils.generateRandomArabicString(3) + " " + "أوتو";
        }
        return this.variableTwoDescription;
    }
    setVariableTwoDescription(value) {
        this.variableTwoDescription = value;
    }
    getVariableThreeDescription() {
        if (this.variableThreeDescription == null) {
            this.variableThreeDescription = global.testConfig.SimulationModels.variableThreeDescription + " " + this.utils.generateRandomArabicString(3) + " " + "أوتو";
        }
        return this.variableThreeDescription;
    }
    setVariableThreeDescription(value) {
        this.variableThreeDescription = value;
    }

    // Getter and Setter for default Value
    getDefaultValueOne() {
        if (this.defaultValueOne == null) {
            this.defaultValueOne = global.testConfig.SimulationModels.defaultValueText;
        }
        return this.defaultValueOne;
    }
    setDefaultValueOne(value) {
        this.defaultValueOne = value;
    }
    getDefaultValueTwo() {
        if (this.defaultValueTwo == null) {
            this.defaultValueTwo = global.testConfig.SimulationModels.defaultValueNumeric;
        }
        return this.defaultValueTwo;
    }
    setDefaultValueTwo(value) {
        this.defaultValueTwo = value;
    }

    // Getter and Setter for Simulation Model ID Number
    getCreatedSimulationModelId() {
        return this.simulationModelId;
    }

    setCreatedSimulationModelId(Value) {
        this.simulationModelId = Value;
    }

}

module.exports = { SimulationModelData };