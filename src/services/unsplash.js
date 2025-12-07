const axios = require('axios');
const chalk = require('chalk');
const configUtil = require('../config');
const handleApiError = require('./apiErrorHandler');
const withRetry = require('./apiRetry');

class UnsplashService {
  constructor() {
    this.baseUrl = 'https://api.unsplash.com';
    this.accessKey = 
  require('../env').unsplashAccessKey() || 
  configUtil.get('apis.unsplash.accessKey', '');
  }

  async searchPhotos(query, page = 1, perPage = 5) {
  if (!this.accessKey) {
    console.log(chalk.yellow('\nUnsplash API key not configured.'));
    console.log('Run the setup command to add your API key: content-commander setup');
    console.log('You can get a free API key at: https://unsplash.com/developers\n');
    return { results: [] };
  }

  try {
    return await withRetry(async () => {
      const response = await axios.get(`${this.baseUrl}/search/photos`, {
        params: {
          query,
          page,
          per_page: perPage
        },
        headers: {
          Authorization: `Client-ID ${this.accessKey}`
        }
      });

      return response.data;
    }, { name: 'Unsplash' });
  } catch (error) {
    handleApiError(error, 'Unsplash');
    return { results: [] };
  }
}
}

module.exports = new UnsplashService();