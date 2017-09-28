const fs = require('fs');

class Employee {
  constructor(attribute) {
    this.id = attribute['id']
    this.name = attribute['name']
    this.position = attribute['position']
    this.username = attribute['username']
    this.password = attribute['password']
    this.createdBy = attribute['createdBy'];
  }
}

module.exports = Employee;
