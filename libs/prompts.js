const prompt = require('inquirer').createPromptModule()

const prompts = {
  async menu () {
    const answer = await prompt({
      type: 'list',
      name: 'menu',
      message: 'What would you like to do?',
      choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit']
    })
    return answer.menu
  },
  async addDept () {
    const answer = await prompt({
      type: 'input',
      name: 'dept',
      message: 'What is the name of the new department?'
    })
    return answer.dept
  },
  async addRole () {
    const answer = await prompt([{
      type: 'input',
      name: 'title',
      message: 'What is the name of the new role?'
    }, {
      type: 'number',
      name: 'salary',
      message: 'What is the salary?'
    }])
    return answer
  },
  async addRole2 (depts) {
    const answer = await prompt([{
      type: 'input',
      name: 'dept',
      message: 'What is the name of the department?'
    }])
    return answer.dept
  }
}

module.exports = prompts
