const prompt = require('inquirer').createPromptModule()
const cTable = require('console.table')
const db = require('./config/db')

let choice = ''

const menu = async _ => {
  const answer = await prompt({
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit']
  })
  choice = answer.menu
  return answer.menu
}

const printTable = async target => {
  try {
    const qr = `SELECT * FROM ${target}`
    await new Promise((resolve, reject) => {
      db.query(qr, (err, items) => {
        if (err) return reject(err)
        console.table(items)
        resolve(items)
      })
    })
  } catch (e) { console.log(e) }
}

const addDept = async _ => {
  const item = await prompt({
    type: 'input',
    name: 'name',
    message: 'What is the name of the new department?'
  })
  try {
    await new Promise((resolve, reject) => {
      db.query('INSERT INTO departments SET ?', item, err => {
        if (err) return reject(err)
        console.log('Added department!')
        resolve(true)
      })
    })
  } catch (e) { console.log(e) }
}

const addRole = async _ => {
  const answerOne = await prompt([{
    type: 'input',
    name: 'title',
    message: 'What is the name of the new role?'
  }, {
    type: 'number',
    name: 'salary',
    message: 'What is the salary?'
  }])
  try {
    await new Promise((resolve, reject) => {
      db.query('SELECT * FROM departments', async (err, items) => {
        if (err) return reject(err)
        let itemArray = []
        items.forEach(element => {
          itemArray.push(element.name)
        })
        const answerTwo = await prompt({
          type: 'list',
          name: 'dept',
          choices: itemArray,
          message: 'Which department?'
        })
        items.forEach(element => {
          if (element.name === answerTwo.dept) answerOne.department_id = element.id
        })
        try {
          await new Promise((resolve, reject) => {
            db.query('INSERT INTO roles SET ?', answerOne, err => {
              if (err) return reject(err)
              console.log('Added role!')
              resolve(true)
            })
          })
        } catch (e) { console.log(e) }
      })
      resolve(true)
    })
  } catch (e) { console.log(e) }
  // db.query('SELECT * FROM departments', async (err, items) => {
  //   if (err) throw err
  //   // console.table(items)
  //   let itemArray = []
  //   items.forEach(element => {
  //     itemArray.push(element.name)
  //   })
  //   const answerTwo = await prompt({
  //     type: 'list',
  //     name: 'dept',
  //     choices: itemArray,
  //     message: 'Which department?'
  //   })
  //   items.forEach(element => {
  //     if (element.name === answerTwo.dept) answerOne.department_id = element.id
  //   })
  //   db.query('INSERT INTO roles SET ?', answerOne, err => {
  //     if (err) throw err
  //     console.log('Added Role!')
  //   })
  // })
}

const addEmployee = async _ => {
  const answerOne = await prompt([{
    type: 'input',
    name: 'first_name',
    message: 'What is the first name of the new employee?'
  }, {
    type: 'input',
    name: 'last_name',
    message: 'What is the last name of the new employee?'
  }])
  db.query('SELECT * FROM roles', async (err, items) => {
    if (err) throw err
    let itemArray = []
    items.forEach(element => {
      itemArray.push(element.title)
    })
    const answerTwo = await prompt({
      type: 'list',
      name: 'role',
      choices: itemArray,
      message: 'Which role?'
    })
    items.forEach(element => {
      if (element.title === answerTwo.role) answerOne.role_id = element.id
    })
    db.query('SELECT * FROM employees', async (err, items) => {
      if (err) throw err
      let itemArrayTwo = []
      items.forEach(element => {
        itemArrayTwo.push(`${element.first_name} ${element.last_name}`)
      })
      itemArrayTwo.push('Nobody')
      const answerThree = await prompt({
        type: 'list',
        name: 'manager',
        choices: itemArrayTwo,
        message: 'Who is the manager?'
      })
      if (answerThree.manager === 'Nobody') {
        answerOne.manager_id = null
      } else {
        items.forEach(element => {
          if (`${element.first_name} ${element.last_name}` === answerThree.manager) answerOne.manager_id = element.id
        })
      }
      db.query('INSERT INTO roles SET ?', answerOne, err => {
        if (err) throw err
        console.log('Added Employee!')
      })
    })
  })
}

const updateEmployee = async _ => {
  db.query('SELECT * FROM employees', async (err, items) => {
    if (err) throw err
    let roleid = null
    let employeeid = null
    let itemArrayOne = []
    items.forEach(element => {
      itemArrayOne.push(`${element.first_name} ${element.last_name}`)
    })
    const answerOne = await prompt({
      type: 'list',
      name: 'name',
      choices: itemArrayOne,
      message: 'Who is the employee to update?'
    })
    items.forEach(element => {
      if (`${element.first_name} ${element.last_name}` === answerOne.name) employeeid = element.id
    })
    db.query('SELECT * FROM roles', async (err, items) => {
      if (err) throw err
      let itemArrayTwo = []
      items.forEach(element => {
        itemArrayTwo.push(element.title)
      })
      const answerTwo = await prompt({
        type: 'list',
        name: 'role',
        choices: itemArrayTwo,
        message: 'Which role?'
      })
      items.forEach(element => {
        if (element.title === answerTwo.role) roleid.role_id = element.id
      })
      db.query('UPDATE employees SET ? WHERE ?', roleid, { itemid: employeeid }, err => {
        if (err) throw err
        console.log('Updated role!')
      })
    })
  })
}

; (async () => {
  console.log(`
   ____           __                    ______             __
  / __/_ _  ___  / /__  __ _____ ___   /_  __/______ _____/ /_____ ____
 / _//  ' \\/ _ \\/ / _ \\/ // / -_) -_)   / / / __/ _ \`/ __/  '_/ -_) __/
/___/_/_/_/ .__/_/\\___/\\_, /\\__/\\__/   /_/ /_/  \\_,_/\\__/_/\\_\\\\__/_/
         /_/          /___/
`)
  while (await menu() !== 'Exit') {
    if (choice === 'View Departments') {
      await printTable('departments')
    } else if (choice === 'View Roles') {
      await printTable('roles')
    } else if (choice === 'View Employees') {
      await printTable('employees')
    } else if (choice === 'Add Department') {
      await addDept()
    } else if (choice === 'Add Role') {
      await addRole()
    } else if (choice === 'Add Employee') {
      await addEmployee()
    } else if (choice === 'Update Employee Role') {
      await updateEmployee()
    }
  }
  process.exit()
})()
