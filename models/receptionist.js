const Employee = require('./Employee');

class Receptionist extends Employee {
  constructor(attribute) {
    super(attribute);
  }
}

module.exports = Receptionist;
