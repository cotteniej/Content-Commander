const inquirer = require('inquirer');
const chalk = require('chalk');
const { getIdeas, saveIdeas } = require('../utils');

module.exports = async () => {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your content idea?',
      validate: input => input.length > 0
    },
    {
      type: 'input',
      name: 'description',
      message: 'Describe your content idea:',
      validate: input => input.length > 0
    },
    {
      type: 'list',
      name: 'type',
      message: 'What type of content is this?',
      choices: ['Blog Post', 'Social Media', 'Newsletter', 'Video', 'Other']
    }
  ]);

  const ideas = await getIdeas();

  ideas.push({
    id: Date.now().toString(),
    ...answers,
    createdAt: new Date().toISOString()
  });

  try {
    await saveIdeas(ideas);
    console.log(chalk.green('✓ Content idea added successfully!'));
  } catch (error) {
    console.error(chalk.red('Error saving content idea:'), error);
  }
};