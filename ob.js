const Employee = require('./employee.js');

class Ob extends Employee {
  constructor(id, name, username, password) {
    super(id, name,username,password);
    this.position = "Ob";
  }
}

module.exports = Ob
