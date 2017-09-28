const Employee = require('./employee.js');

class Doctor extends Employee {
  constructor(id, name, username, password) {
    super(id, name,username,password);
    this.position = "Doctor";
  }
}

module.exports = Doctor;
