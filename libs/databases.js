const db = require('../config/db')

const databases = {
  getDept (cb) {
    db.query('SELECT * FROM departments', (err, items) => {
      if (err) throw err
      cb(items)
    })
  },
  getRole (cb) {
    db.query('SELECT * FROM roles', (err, items) => {
      if (err) throw err
      cb(items)
    })
  },
  getEmployee (cb) {
    db.query('SELECT * FROM employees', (err, items) => {
      if (err) throw err
      cb(items)
    })
  },
  getDeptId (item, cb) {
    db.query('SELECT * FROM departments WHERE ?', { name: item }, (err, items) => {
      if (err) throw err
      cb(items[0].id)
    })
  },
  getRoleId (item, cb) {
    db.query('SELECT * FROM roles WHERE ?', { name: item }, (err, items) => {
      if (err) throw err
      console.log('items', items)
      cb(items[0].id)
    })
  },
  getEmployeeId (item, cb) {
    db.query('SELECT * FROM employees WHERE ?', { first_name: item.split(' ')[0], last_name: item.split(' ')[1] }, (err, items) => {
      if (err) throw err
      cb(items[0].id)
    })
  },
  addDept (item, cb) {
    db.query('INSERT INTO departments SET ?', item, err => {
      if (err) throw err
      cb()
    })
  },
  addRole (item, cb) {
    db.query('INSERT INTO roles SET ?', item, err => {
      if (err) throw err
      cb()
    })
  },
  addEmployee (item, cb) {
    db.query('INSERT INTO employees SET ?', item, err => {
      if (err) throw err
      cb()
    })
  },
  updateDept (updates, id, cb) {
    db.query('UPDATE departments SET ? WHERE ?', updates, { itemid: id }, err => {
      if (err) throw err
      cb()
    })
  },
  updateRole (updates, id, cb) {
    db.query('UPDATE roles SET ? WHERE ?', updates, { itemid: id }, err => {
      if (err) throw err
      cb()
    })
  },
  updateEmployee (updates, id, cb) {
    db.query('UPDATE employees SET ? WHERE ?', updates, { itemid: id }, err => {
      if (err) throw err
      cb()
    })
  },
  deleteDept (id, cb) {
    db.query('DELETE FROM departments WHERE ?', { itemid: id }, err => {
      if (err) throw err
      cb()
    })
  },
  deleteRole (id, cb) {
    db.query('DELETE FROM roles WHERE ?', { itemid: id }, err => {
      if (err) throw err
      cb()
    })
  },
  deleteEmployee (id, cb) {
    db.query('DELETE FROM employees WHERE ?', { itemid: id }, err => {
      if (err) throw err
      cb()
    })
  }
}

module.exports = databases
