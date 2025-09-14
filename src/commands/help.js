const chalk = require('chalk');

module.exports = () => {
  console.log(chalk.bold('\nContent Commander Help\n'));
  console.log('Available commands:\n');
  
  console.log(chalk.cyan('content-commander add'));
  console.log('Add a new content idea\n');
  
  console.log(chalk.cyan('content-commander list'));
  console.log('List all content ideas\n');
  
  console.log(chalk.cyan('content-commander search <keyword>'));
  console.log('Search for content ideas by keyword\n');
  
  console.log(chalk.cyan('content-commander filter [options]'));
  console.log('Filter content ideas by type, status, or tag');
  console.log('Options:');
  console.log('  -t, --type <type>     Filter by content type');
  console.log('  -s, --status <status> Filter by status');
  console.log('  -g, --tag <tag>       Filter by tag\n');
  
  console.log(chalk.cyan('content-commander update <id>'));
  console.log('Update a content idea by ID\n');
  
  console.log(chalk.cyan('content-commander delete <id>'));
  console.log('Delete a content idea by ID\n');
  
  console.log(chalk.cyan('content-commander calendar'));
  console.log('View content ideas organized by due date\n');
  
  console.log(chalk.cyan('content-commander help'));
  console.log('Display this help information\n');
  
  console.log('Examples:\n');
  console.log('content-commander add');
  console.log('content-commander search "blog post"');
  console.log('content-commander filter --type "Blog Post" --status "Planning"');
  console.log('content-commander update 1677602792348');
};