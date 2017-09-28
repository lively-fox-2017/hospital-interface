"use strict"
const Employee = require('./employee.js');

class Receptionist extends Employee {
	constructor(id, name, username, password) {
		super(id, name, 'receptionist', username, password);
	}
}

module.exports = Receptionist;