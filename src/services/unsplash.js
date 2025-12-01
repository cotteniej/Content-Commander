const axios = require('axios');
const chalk = require('chalk');
const configUtil = require('../config');

class UnsplashService {
  constructor() {
    this.baseUrl = 'https://api.unsplash.com';
    this.accessKey = configUtil.get('apis.unsplash.accessKey', '');
  }

  async searchPhotos(query, page = 1, perPage = 5) {
    if (!this.accessKey) {
      console.log(chalk.yellow('\nUnsplash API key not configured.'));
      console.log('Run the setup command to add your API key: content-commander setup');
      console.log('You can get a free API key at: https://unsplash.com/developers\\n');
      return { results: [] };
    }

    try {
      // Log the query to help debug
      console.log(chalk.dim(`Making request with query: "${query}"`));
      
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
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.error(chalk.red('Error: Invalid Unsplash API key or unauthorized access.'));
          console.log('Run the setup command to update your API key: content-commander setup');
        } else if (error.response.status === 403) {
          console.error(chalk.red('Error: Rate limit exceeded for Unsplash API.'));
          console.log('Please try again later.');
        } else {
          console.error(chalk.red(`Error: ${error.response.status} - ${error.response.data.errors?.[0] || 'Unknown error'}`));
        }
      } else {
        console.error(chalk.red('Error searching Unsplash:'), error.message);
      }

      return { results: [] };
    }
  }
}

module.exports = new UnsplashService();