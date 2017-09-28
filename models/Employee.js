const fs = require('fs');
const Hospital = require('./Hospital');

class Employee {
  constructor(obj) {
    this.id       = obj.id;
    this.name     = obj.name;
    this.level    = obj.level;
    this.username = obj.username;
    this.password = obj.password;
  }

  static fetch(properties = []) {

    let employees = Hospital.fetchEmployees();
    let fetchResult = [];

    if (properties.length) {

      for (let i = 0; i < employees.length; i++) {

        let employee = {};

        for (let j = 0; j < properties.length; j++) {

          employee[properties[j]] = employees[i][properties[j]];

        }

        fetchResult.push(employee);

      }

    }

    return fetchResult;

  }

  static find(property, value) {

    let employees = Hospital.fetchEmployees();
    let findResult = [];

    for (let i = 0; i < employees.length; i++) {

      if (employees[i][property] === value) {

        findResult.push(employees[i]);

      }

    }

    return findResult;

  }

  save() {

  }

  destroy(employeeId) {

  }
}

module.exports = Employee;
