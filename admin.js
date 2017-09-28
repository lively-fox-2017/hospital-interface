const Employee = require('./employee.js');

class Admin extends Employee {
  constructor(id, name, username, password) {
    super(id, name,username,password);
    this.position = "Admin";
  }
}

module.exports = Admin;
