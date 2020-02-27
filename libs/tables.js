const cTable = require('console.table')

const tables = {
  dispDept (values) {
    console.table(values);
  },
  dispRole(values) {
    console.table(values);
  },
  dispEmployee(values) {
    console.table(values);
  }
}

module.exports = tables
