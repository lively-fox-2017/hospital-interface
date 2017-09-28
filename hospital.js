const Doctor = require('./doctor.js');
const Patient = require('./patient.js');
const Admin = require('./admin.js');
const Ob = require('./ob.js');
const fs = require('fs');

class Hospital {
  constructor() {
    this.name = ""
    this.employees = []
    this.patients = []
    this.location = ""
    this.fillData();
  }
  fillData() {
    var data = JSON.parse(fs.readFileSync('data.json','utf8'));
    this.name = data.name;
    this.employees = data.employees;
    this.patients = data.patients;
    this.location = data.location;
  }
  addDoctor(id, name, username, password) {
    var newDoctor = new Doctor(id, name, username, password);
    if(this.findEmployee(newDoctor.id) === ""){
      this.employees.push(newDoctor);
      this.save(JSON.stringify(this));
      return true;
    }
    return false;
  }
  addAdmin(id, name, username, password) {
    var newAdmin = new Admin(id, name, username, password);
    if(this.findEmployee(newAdmin.id) === ""){
      this.employees.push(newAdmin);
      this.save(JSON.stringify(this));
      return true;
    }
    return false;
  }
  addOb(id, name, username, password) {
    var newOb = new Ob(id, name, username, password);
    if(this.findEmployee(newOb.id) === ""){
      this.employees.push(newOb);
      this.save(JSON.stringify(this));
      return true;
    }
    return false;
  }
  addPatient(id, name, diagnosis) {
    var newPatient = new Patient(id, name, diagnosis);
    if(this.findPatient(newPatient.id) === ""){
      this.patients.push(newPatient);
      this.save(JSON.stringify(this));
      return true;
    }
    return false;
  }
  removePatient(id) {
    for (var i = 0; i < this.patients.length; i++) {
      if (this.patients[i].id === id.trim()) {
        this.patients.splice(i,1);
        this.save(JSON.stringify(this));
        return true;
        break;
      }
    }
    return false;
  }
  removeEmployee(id) {
    for (var i = 0; i < this.employees.length; i++) {
      if (this.employees[i].id === id.trim()) {
        this.employees.splice(i,1);
        this.save(JSON.stringify(this));
        return true;
        break;
      }
    }
    return false;
  }
  findPatient(id) {
    var patient = "";
    for (var i = 0; i < this.patients.length; i++) {
      if (this.patients[i].id === id.trim()) {
        patient = this.patients[i];
        break;
      }
    }
    return patient;
  }
  findEmployee(id) {
    var employee = "";
    for (var i = 0; i < this.employees.length; i++) {
      if (this.employees[i].id === id.trim()) {
        employee = this.employees[i];
        break;
      }
    }
    return employee;
  }
  showPatientList() {
    return this.patients;
  }
  showEmployeeList() {
    return this.employees;
  }
  save(data) {
    fs.writeFileSync('data.json', data);
  }
}

module.exports = Hospital
