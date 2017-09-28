let fs = require('fs')
let employeeDbJson = fs.readFileSync('employeeDb.json','utf8')
let employeeDb = JSON.parse(employeeDbJson);
// let Hospital = require('./hospital')

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }
  static listEmployees(){
    let employeeArrList = [];
    for(var i = 0; i < employeeDb.length; i++){
      employeeArrList.push(`${i+1}. Employee Name: ${employeeDb[i].employee_name}, Employee Position: ${employeeDb[i].employee_position}`);
    }
    return employeeArrList.join('\n')
  }
  static viewEmployeeRecord(){
    let employeeRecArr = [];
    for(var i = 0; i < employeeDb.length; i++){
      employeeRecArr.push(employeeDb[i]);
    }
    return employeeRecArr
  }
  static employeeAuth(){
    let employeeArr = [];
    for(var i = 0; i < employeeDb.length; i++){
      // console.log(employeeDb[i]);
      employeeArr.push(employeeDb[i]);
    }
    // console.log(employeeArr[0])
    return employeeArr
  }
}

// let employee = new Employee();
// employee.employeeAuth();
module.exports = Employee
