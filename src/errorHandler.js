const chalk = require('chalk');

module.exports = {
  handleError: (error, context) => {
    if (error.code === 'ENOENT') {
      console.error(chalk.red('Error: File not found.'), 
        'Make sure you\'ve added content ideas first.');
    } else if (error.code === 'EACCES') {
      console.error(chalk.red('Error: Permission denied.'), 
        'You don\'t have permission to access this file.');
    } else if (error.code === 'EISDIR') {
      console.error(chalk.red('Error: Expected a file but found a directory.'));
    } else if (error.code === 'ENOTDIR') {
      console.error(chalk.red('Error: Expected a directory but found a file.'));
    } else if (error.name === 'SyntaxError' && context === 'json') {
      console.error(chalk.red('Error: Invalid JSON file.'), 
        'The data file may be corrupted. You might need to delete it and start fresh.');
    } else {
      console.error(chalk.red(`Error in ${context || 'operation'}:`), error.message);
    }
    
    console.log('\\nFor help, run: content-commander help');
  }
};