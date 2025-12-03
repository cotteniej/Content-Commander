const chalk = require('chalk');

async function withRetry(fn, options = {}) {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    retryOn = [408, 429, 500, 502, 503, 504],
    name = 'API'
  } = options;
  
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Check if error is retryable
      const status = error.response?.status;
      const isRetryable = retryOn.includes(status) || !status;
      
      if (!isRetryable || attempt === maxRetries) {
        throw error;
      }
      
      console.log(chalk.yellow(`${name} request failed. Retrying (${attempt}/${maxRetries})...`));
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
    }
  }
  
  throw lastError;
}

module.exports = withRetry;