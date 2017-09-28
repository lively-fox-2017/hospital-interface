"use strict"
const Employee = require('./employee.js');

class Ob extends Employee {
	constructor(id, name, username, password) {
		super(id, name, 'office boy', username, password);
	}
}

module.exports = Ob;