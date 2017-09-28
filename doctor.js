"use strict"
const Employee = require('./employee.js');

class Doctor extends Employee {
	constructor(id, name, username, password) {
		super(id, name, 'doctor', username, password);
	}
}

module.exports = Doctor;