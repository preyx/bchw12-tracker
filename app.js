// const t = require('./libs/tables')
const p = require('./libs/prompts')
const d = require('./libs/databases')
const cTable = require('console.table')

const main = async _ => {
  // Update employee managers
  // View employees by manager
  // Delete departments, roles, and employees
  // View the total utilized budget of a department
  console.log(`
   ____           __                    ______             __
  / __/_ _  ___  / /__  __ _____ ___   /_  __/______ _____/ /_____ ____
 / _//  ' \\/ _ \\/ / _ \\/ // / -_) -_)   / / / __/ _ \`/ __/  '_/ -_) __/
/___/_/_/_/ .__/_/\\___/\\_, /\\__/\\__/   /_/ /_/  \\_,_/\\__/_/\\_\\\\__/_/
         /_/          /___/
`)
  while (true) {
    switch (await p.menu()) {
      case 'View Departments':
        d.getDept(items => console.table(items))
        break
      case 'View Roles':
        d.getRole(items => console.table(items))
        break
      case 'View Employees':
        d.getEmployee(items => console.table(items))
        break
      case 'Add Department':
        d.addDept({ name: await p.addDept() }, _ => console.log('Department added!'))
        // console.log('Not implemented yet!')
        break
      case 'Add Role':
        let item = await p.addRole()
        // d.getDeptId(items => console.log(items))
        d.getDeptId(d.getDept(items => p.addRole2(items)), deptId => item.department_id = deptId)
        d.addRole(item, _ => console.log('Role Added!'))
        console.log('Not implemented yet!')
        break
      case 'Add Employee':
        console.log('Not implemented yet!')
        break
      case 'Update Employee Role':
        console.log('Not implemented yet!')
        break
      case 'Exit':
        process.exit()
    }
  }
}

main()
