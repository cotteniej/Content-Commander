require('dotenv').config();
const chalk = require('chalk');

// Wrapper for environment variables
function getEnv(key, defaultValue = null, isRequired = false) {
const value = process.env[key] || defaultValue;

  if (isRequired && !value) {
    console.error(chalk.red(`Error: Required environment variable ${key} is not set.`));
    console.log(`Please set it in your .env file or as an environment variable.`);
    console.log(`Run: content-commander setup`);
  }
  
  return value;
}

// Validate required environment variables
function validateEnv() {
  const provider = getEnv('DEFAULT_AI_PROVIDER', 'openai');
  
  if (provider === 'openai') {
    getEnv('OPENAI_API_KEY', null, true);
  } else if (provider === 'anthropic') {
    getEnv('ANTHROPIC_API_KEY', null, true);
  }
}

module.exports = {
  getEnv,
  validateEnv,
  
  // OpenAI
  openaiApiKey: () => getEnv('OPENAI_API_KEY'),
  
  // Anthropic
  anthropicApiKey: () => getEnv('ANTHROPIC_API_KEY'),
  
  // Unsplash
  unsplashAccessKey: () => getEnv('UNSPLASH_ACCESS_KEY'),
  
  // Default settings
  defaultAiProvider: () => getEnv('DEFAULT_AI_PROVIDER', 'openai')
};