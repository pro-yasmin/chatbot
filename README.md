Hybrid API & Mobile Test Automation Framework
This repository contains an end-to-end automation suite designed to validate the creation and consistency of data across a Chatbot application. The framework utilizes a "Shift-Left" approach by combining API requests for data seeding and Mobile UI verification for functional validation.

🚀 Overview
The primary goal of this framework is to ensure that data submitted via the backend API is correctly processed and displayed on the mobile interface. By using a Single Source of Truth (POJO), we maintain high data integrity between the API and UI layers.

Key Workflow

Data Ingestion: Read test data from a centralized JSON file.

POJO Mapping: De-serialize JSON data into a shared Java object (POJO).

API Execution: Submit a POST request to create an entity (e.g., a chatbot or user).

UI Validation: Launch the mobile application via Appium and verify that the created entity appears with the correct attributes.

🛠 Tech Stack
Language: Java 11+

API Testing: RestAssured

Mobile Testing: Appium (Android/iOS)

Data Handling: Jackson / Gson (for JSON-to-POJO mapping)

Test Runner: TestNG / JUnit

Build Tool: Maven

📂 Project Structure
Plaintext
chatbot/
├── src/
│   ├── main/java/
│   │   ├── models/            # Shared POJO classes (Single Source of Truth)
│   │   ├── api/               # API clients and Request/Response handlers
│   │   ├── pages/             # Mobile Page Objects (Appium)
│   │   └── utils/             # JSON Readers, Config Loaders, Listeners
│   └── test/java/
│       ├── tests/             # Hybrid Test Scripts (API + UI assertions)
│       └── base/              # Base Test setup for Driver and API instantiation
├── src/test/resources/
│   ├── testdata/              # JSON data files for requests
│   └── config.properties      # Environment and Capability configurations
├── pom.xml                    # Project dependencies
└── README.md
🔧 Core Implementation Logic
1. Shared POJO Model

The ChatbotModel.java acts as the contract for both layers.

Java
public class ChatbotModel {
    @JsonProperty("bot_name")
    private String botName;
    @JsonProperty("category")
    private String category;
    // Getters and Setters
}
2. The Hybrid Test Flow

The test script consumes the POJO to eliminate hardcoded strings.

Java
@Test
public void testBotCreationConsistency() {
    // 1. Load Data
    ChatbotModel expectedData = JsonUtils.load("bot_data.json", ChatbotModel.class);

    // 2. API Action
    apiClient.createBot(expectedData);

    // 3. UI Verification
    mobilePage.navigateToDashboard();
    ChatbotModel actualData = mobilePage.getBotDetails(expectedData.getBotName());
    
    Assert.assertEquals(actualData.getCategory(), expectedData.getCategory(), "Data Mismatch!");
}
⚙️ Setup & Execution
Prerequisites

Java JDK 11 or higher.

Node.js & Appium Server installed.

Android SDK / Xcode (for mobile emulators/simulators).

Maven installed.

Installation

Clone the repository:

Bash
git clone https://github.com/pro-yasmin/chatbot.git
Install dependencies:

Bash
mvn clean install
Running Tests

To run the full suite via Maven:

Bash
mvn test -DsuiteXmlFile=testng.xml
📊 Integration (DevSecOps)
This framework is designed to run within CloudBees/Jenkins pipelines. It supports:

Parallel Execution: Running API and UI checks simultaneously where applicable.

Reporting: Generates Allure/Extent reports for detailed failure analysis.

Data Clean-up: Automated @AfterMethod hooks to delete test data via API after UI verification.
