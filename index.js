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

// Filter Command
program
  .command('filter')
  .description('Filter content ideas by type, status, or tag')
  .option('-t, --type <type>', 'Filter by content type')
  .option('-s, --status <status>', 'Filter by status')
  .option('-g, --tag <tag>', 'Filter by tag')
  .action(require('./src/commands/filter'));

program
  .command('update <id>')
  .description('Update a content idea by ID')
  .action(require('./src/commands/update'));

program
  .command('delete <id>')
  .description('Delete a content idea by ID')
  .action(require('./src/commands/delete'));

  program
  .command('calendar')
  .description('View content ideas organized by due date')
  .action(require('./src/commands/calendar'));

  program
  .command('help')
  .description('Display help information')
  .action(require('./src/commands/help'));

program
  .command('setup')
  .description('Configure Content Commander settings')
  .action(require('./src/commands/setup'));

program
  .command('images <keyword>')
  .description('Search for images related to a keyword')
  .action(require('./src/commands/images'));

program
  .command('outline <id>')
  .description('Generate an outline for a content idea')
  .action(require('./src/commands/outline'));

program
  .command('view-outline <id>')
  .description('View a saved outline for a content idea')
  .option('-o, --outline-id <outlineId>', 'Specific outline ID to view')
  .action(require('./src/commands/view-outline'));

  program
  .command('export <id>')
  .description('Export a content idea to a file')
  .option('-f, --format <format>', 'Export format (markdown, html, text)')
  .option('-o, --outline-id <outlineId>', 'Specific outline ID to use')
  .action(require('./src/commands/export'));

// Parse arguments
program.parse(process.argv);

// Show help if no arguments provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}