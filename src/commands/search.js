const chalk = require('chalk');
const { getIdeas } = require('../utils');

module.exports = async (keyword) => {
  if (!keyword) {
    console.log(chalk.yellow('Please provide a search keyword.'));
    console.log('Example: content-commander search "blog"');
    return;
  }

  try {
    const ideas = await getIdeas();
    
    if (ideas.length === 0) {
      console.log(chalk.yellow('No content ideas found. Add some with the "add" command!'));
      return;
    }
    
    const searchTerm = keyword.toLowerCase();
    const results = ideas.filter(idea => {
      return (
        idea.title.toLowerCase().includes(searchTerm) ||
        idea.description.toLowerCase().includes(searchTerm) ||
        idea.type.toLowerCase().includes(searchTerm)
      );
    });
    
    if (results.length === 0) {
      console.log(chalk.yellow(`No content ideas found matching "${keyword}".`));
      return;
    }
    
    console.log(chalk.bold(`Found ${results.length} content ideas matching "${keyword}":\n`));
    
    results.forEach((idea) => {
      console.log(chalk.cyan('--------------------------------------'));
      console.log(chalk.bold(`Title: ${idea.title}`));
      console.log(`Description: ${idea.description}`);
      console.log(`Type: ${idea.type}`);
      console.log(`ID: ${idea.id}`);
      console.log(`Created: ${new Date(idea.createdAt).toLocaleString()}`);
      console.log(chalk.cyan('--------------------------------------') + '\n');
    });
  } catch (error) {
    console.error(chalk.red('Error searching content ideas:'), error.message);
  }
};