/*const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

module.exports = async () => {
  const env = process.env.ENV || 'uat'; // Default to "testing" environment
  const envPath = path.resolve(__dirname, 'configs', `.env.${env}`);
  dotenv.config({ path: envPath });

  const jsonConfigPath = path.resolve(__dirname, 'configs', `config-${env}.json`);
  let jsonConfig = {};
  if (fs.existsSync(jsonConfigPath)) {
    jsonConfig = JSON.parse(fs.readFileSync(jsonConfigPath, 'utf-8'));
  }

  const combinedConfig = {
    ...process.env,
    ...jsonConfig,
  };

  const globalConfigPath = path.resolve(__dirname, 'configs', 'global-config.json');
  fs.writeFileSync(globalConfigPath, JSON.stringify(combinedConfig, null, 2));

  console.log('Global setup complete. Combined configuration saved.');
};*/
/*const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Function to load the environment variables and JSON configuration
const loadConfig = (env) => {
  // Load the environment variables from the .env file
  const envPath = path.resolve(__dirname, 'configs', `.env.${env}`);
  dotenv.config({ path: envPath });

  // Load the JSON configuration
  const jsonPath = path.resolve(__dirname, 'configs', `config-${env}.json`);
  const jsonConfig = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

  // Combine process.env and JSON config
  return { ...process.env, ...jsonConfig };
};

// Global setup function
async function globalSetup() {
  const environment = process.env.ENV || 'testing'; // Default to testing if no ENV is set
  const combinedConfig = loadConfig(environment);

  // Store the combined configuration in a global variable
  global.testConfig = combinedConfig;

  console.log('Global configuration loaded:', global.testConfig);
}

module.exports = globalSetup;*/
// global-setup.js
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Function to load environment variables and JSON files
const loadConfig = (env) => {
  const envPath = path.resolve(__dirname, 'configs', `.env.${env}`);
  dotenv.config({ path: envPath });

  const jsonPath = path.resolve(__dirname, 'configs', `config-${env}.json`);
  const jsonConfig = fs.existsSync(jsonPath) ? JSON.parse(fs.readFileSync(jsonPath, 'utf-8')) : {};

  return {
    ...process.env, // Load all environment variables
    ...jsonConfig, // Merge with JSON config
  };
};

// Global setup to combine configs and save to config.json
async function globalSetup() {
  const environment = process.env.ENV || 'testing'; // Default to 'testing'
  const combinedConfig = loadConfig(environment);

  const configPath = path.resolve(__dirname,'configs', 'AllConfigs.json');
  fs.writeFileSync(configPath, JSON.stringify(combinedConfig, null, 2)); // Save combined config to file

  //console.log('Global configuration written to config.json');
}

module.exports = globalSetup;


