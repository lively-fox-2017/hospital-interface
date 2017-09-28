"use strict"
const Employee = require('./employee.js');

class Admin extends Employee {
	constructor(id, name, username, password) {
		super(id, name, 'admin', username, password);
	}
}

module.exports = Admin;