const config = require('config');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

// Get configuration value
function get(key, defaultValue = null) {
  try {
    return config.has(key) ? config.get(key) : defaultValue;
  } catch (error) {
    console.error(chalk.red(`Error getting configuration value for ${key}:`), error.message);
    return defaultValue;
  }
}

// Update configuration
async function update(key, value) {
  try {
    // Get current config
    const configFile = path.resolve('config/local.json');
    let localConfig = {};
    
    // Read existing config if present
    if (await fs.pathExists(configFile)) {
      localConfig = await fs.readJson(configFile);
    }
    
    // Set nested property in object
    const parts = key.split('.');
    let current = localConfig;
    
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }
    
    current[parts[parts.length - 1]] = value;
    
    // Write updated config
    await fs.writeJson(configFile, localConfig, { spaces: 2 });
    return true;
  } catch (error) {
    console.error(chalk.red(`Error updating configuration value for ${key}:`), error.message);
    return false;
  }
}

module.exports = {
  get,
  update
};