const Employee = require('./Employee');
const Patient = require('./Patient');

class Doctor extends Employee {
  constructor(attribute) {
    super(attribute);
  }
}

module.exports = Doctor;
