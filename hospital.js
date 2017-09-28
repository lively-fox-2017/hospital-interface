'use strict'
const fs = require('fs');
const Employee = require('./employee.js');
const Patient = require('./patient');
//const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = this.getEmployeesFromFile();
    this.patients = this.getPatientsFromFile();
    this.location = location
  }

  getEmployeesFromFile(){
    let result = [];
    let objData = JSON.parse(fs.readFileSync('employee.json','utf8'));
    for( let i in objData){
      result.push(new Employee(objData[i].name, objData[i].position, objData[i].username, objData[i].password));
    }
    return result;
  }

  getPatientsFromFile(){
    let result = [];
    let objData = JSON.parse(fs.readFileSync('patient.json','utf8'));
    for( let i in objData){
      result.push(new Patient(objData[i].id, objData[i].name, objData[i].diagnosis));
    }
    return result;
  }

  getPateintById(id){
    for(let i in this.patients){
      if(this.patients[i].id == id){
        return this.patients[i];
      }
    }
    return {};
  }

  getEmployeeById(username){
    for(let i in this.employees){
      if(this.employees[i].username == username){
        return this.employees[i];
      }
    }
    return {};
  }

  checkCredential(userName, password){
    for(let i in this.employees){
      if(this.employees[i].hasOwnProperty('username')){
        if(userName == this.employees[i].username &&
           password == this.employees[i].password){
          return this.employees[i];
        }
      }
    }
    return {};
  }

  employeeToString(employee){
    let counter = 0;
    let string = '|-----------NAMA-------|-----POSITION-----|-----USERNAME------|--PASSWORD-------\n';

    for (let i in employee){
      if(employee[i].hasOwnProperty('position')){
        string+=`${employee[i].name} | ${employee[i].position} | ${employee[i].username} | ${employee[i].password}\n`;
      }else{
        string+=`${employee[i]} `;
        counter++;
      }
    }
    if(counter>0){
      string+='\n'
    }

    string+= '|----------------------------------------------------------------------\n'
    return string;
  }

  patientToString(patient){
    let counter = 0;
    let string = '|-----ID----|-----------NAMA-------------|---------DIAGNOSIS-----------\n';

    for (let i in patient){
      if(patient[i].hasOwnProperty('id')){
        string+=`|${patient[i].id} | ${patient[i].name} | ${patient[i].diagnosis}\n`;
      }else{
        string+=`|${patient[i]}  `;
        counter++;
      }
    }
    if(counter>0){
      string+='\n'
    }

    string+= '|----------------------------------------------------------------------\n'
    return string;
  }

  addEmployee(nama, posisi, username, password){
    if(!this.getEmployeeById(username).hasOwnProperty('username')){
      this.employees.push(new Employee(nama, posisi, username, password));
      this.save('employee.json', JSON.stringify(this.employees));
      return true
    }
    return false;
  }

  removeEmployee(username){
    for(let i=0; i<this.employees.length; i++){
      if(this.employees[i].hasOwnProperty('username')){
        if(this.employees[i].username== username){
          this.employees.splice(i,1);
          this.save('employee.json', JSON.stringify(this.employees));
          return true;
        }
      }
    }
    return false;
  }

  addPatient(id, nama, diagnosis){
    if(!this.getPateintById(id).hasOwnProperty('id')){
      this.patients.push(new Patient(id, nama, diagnosis));
      this.save('patient.json', JSON.stringify(this.patients));
      return true
    }
    return false;
  }

  removePatient(id){
    for(let i=0; i<this.patients.length; i++){
      if(this.patients[i].hasOwnProperty('id')){
        if(this.patients[i].id== id){
          this.patients.splice(i,1);
          this.save('patient.json', JSON.stringify(this.patients));
          return true;
        }
      }
    }
    return false;
  }

  save(file,data){
    fs.writeFile(file,data);
  }

}
module.exports = Hospital;
