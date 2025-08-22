#!/usr/bin/env node
const { program } = require('commander');
const chalk = require('chalk');

// define program version and description
program
  .version('0.1.0')
  .description('Content Commander - Manage your content ideas from the command line');

// add a simple test command
program
  .command('hello')
  .description('Prints a test message')
  .action(() => {
    console.log(chalk.green('Hello from Content Commander!'));
  });

program
  .command('add')
  .description('Add a new content idea')
  .action(async () => {
    const inquirer = require('inquirer');
    const fs = require('fs-extra');
    const path = require('path');

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

    const dataPath = path.join(process.cwd(), 'data', 'ideas.json');
    let ideas = [];

    try {
      await fs.ensureDir(path.dirname(dataPath));
      
      if (await fs.pathExists(dataPath)) {
        try {
          const fileData = await fs.readFile(dataPath, 'utf8');
          // Only try to parse if the file isn't empty
          if (fileData.trim()) {
            ideas = JSON.parse(fileData);
          }
        } catch (error) {
          console.log(chalk.yellow('Warning: Could not read existing data file, creating a new one.'));
          ideas = [];
        }
      }
      
      // Ensure ideas is an array
      if (!Array.isArray(ideas)) {
        ideas = [];
      }
    } catch (error) {
      console.error(chalk.red('Error creating data directory:'), error);
      ideas = [];
    }

    ideas.push({
      id: Date.now().toString(),
      ...answers,
      createdAt: new Date().toISOString()
    });

    try {
      await fs.writeJson(dataPath, ideas, { spaces: 2 });
      console.log(chalk.green('✓ Content idea added successfully!'));
    } catch (error) {
      console.error(chalk.red('Error saving content idea:'), error);
    }
  });

program
  .command('list')
  .description('List all content ideas')
  .action(require('./src/commands/list'));

// Parse arguments
program.parse(process.argv);

// Show help if no arguments provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}