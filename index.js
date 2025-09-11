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
  .action(require('./src/commands/add'));

program
  .command('list')
  .description('List all content ideas')
  .action(require('./src/commands/list'));

  // Search Command
program
  .command('search <keyword>') // required argument, not optional
  .description('Search for content ideas by keyword')
  .action(require('./src/commands/search'));

// Parse arguments
program.parse(process.argv);

// Show help if no arguments provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}