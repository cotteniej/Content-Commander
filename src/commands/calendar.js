const chalk = require('chalk');
const { getIdeas } = require('../utils');

module.exports = async () => {
  try {
    const ideas = await getIdeas();
    
    if (ideas.length === 0) {
      console.log(chalk.yellow('No content ideas found. Add some with the "add" command!'));
      return;
    }
    
    // Filter ideas with due dates
    const ideasWithDueDates = ideas.filter(idea => idea.dueDate);
    
    if (ideasWithDueDates.length === 0) {
      console.log(chalk.yellow('No content ideas with due dates found.'));
      console.log('Add due dates to your content ideas with the "update" command.');
      return;
    }
    
    // Sort ideas by due date
    ideasWithDueDates.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    
    // Group ideas by month
    const groupedByMonth = {};
    
    ideasWithDueDates.forEach(idea => {
      const [year, month, day] = idea.dueDate.split('-');
      const date = new Date(year, month - 1, day); // month is 0-based
      if (isNaN(date.getTime())) return; // Skip invalid dates
      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      
      if (!groupedByMonth[monthYear]) {
        groupedByMonth[monthYear] = [];
      }
      
      groupedByMonth[monthYear].push({
        ...idea,
        formattedDate: date.toLocaleString('default', { day: 'numeric' })
      });
    });
    
    console.log(chalk.bold('Content Calendar:'));
    console.log(chalk.cyan('===============================') + '\n');
    
    // Display ideas by month
    Object.keys(groupedByMonth).forEach(monthYear => {
      console.log(chalk.bold.green(monthYear));
      console.log(chalk.cyan('--------------------------------------'));
      
      groupedByMonth[monthYear].forEach(idea => {
        console.log(`${chalk.bold(idea.formattedDate)}: ${idea.title} (${idea.type})`);
        console.log(`   ID: ${idea.id} | Status: ${idea.status || 'Not set'}`);
      });
      
      console.log('\n');
    });
  } catch (error) {
    console.error(chalk.red('Error displaying calendar:'), error.message);
  }
};