const inquirer = require('inquirer');
const chalk = require('chalk');
const { getIdeas, saveIdeas } = require('../utils');

module.exports = async (id) => {
  if (!id) {
    console.log(chalk.yellow('Please provide an idea ID to update.'));
    console.log('Example: content-commander update 1677602792348');
    return;
  }

  try {
    const ideas = await getIdeas();
    const ideaIndex = ideas.findIndex(idea => idea.id === id);
    
    if (ideaIndex === -1) {
      console.log(chalk.yellow(`No content idea found with ID: ${id}`));
      return;
    }
    
    const idea = ideas[ideaIndex];
    
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Title:',
        default: idea.title
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description:',
        default: idea.description
      },
      {
        type: 'list',
        name: 'type',
        message: 'Content type:',
        choices: ['Blog Post', 'Social Media', 'Newsletter', 'Video', 'Other'],
        default: idea.type
      },
      {
        type: 'list',
        name: 'status',
        message: 'Status:',
        choices: ['Planning', 'In Progress', 'Draft', 'Published', 'Archived'],
        default: idea.status
      },
      {
        type: 'input',
        name: 'tags',
        message: 'Tags (comma separated):',
        default: idea.tags ? idea.tags.join(', ') : '',
        filter: input => input.split(',').map(tag => tag.trim()).filter(tag => tag)
      }
    ]);
    
    // Update the idea with new values
    ideas[ideaIndex] = {
      ...idea,
      ...answers,
      updatedAt: new Date().toISOString()
    };
    
    await saveIdeas(ideas);
    console.log(chalk.green('✓ Content idea updated successfully!'));
  } catch (error) {
    console.error(chalk.red('Error updating content idea:'), error.message);
  }
};