const fs = require('fs');
const Hospital = require('./Hospital');

class Employee {
  constructor(obj) {
    this.id       = obj.id || 0;
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

    let hospital = JSON.parse(Hospital.readFile());

    let lastId = Hospital.getEmployeeLastId();

    this.id = lastId + 1;

    hospital[0].employees.push(this);

    fs.writeFileSync('hospital.json', JSON.stringify(hospital, null, '\t'));

  }

  static destroy(employeeId) {

    let hospital = JSON.parse(Hospital.readFile());

    for (let i = 0; i < hospital[0].employees.length; i++) {

      if (hospital[0].employees[i].id === employeeId) {

        hospital[0].employees.splice(i, 1);
        break;

      }

    }

    fs.writeFileSync('hospital.json', JSON.stringify(hospital, null, '\t'));

  }
}

module.exports = Employee;
