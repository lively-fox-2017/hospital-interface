const Employee = require('./employee');

class Admin extends Employee {
  constructor(attribute) {
    super(attribute);
  }
}

module.exports = Admin;
