const Doctor = require('./doctor.js');
const Patient = require('./patient.js');
const Admin = require('./admin.js');
const Ob = require('./ob.js');

class Hospital {
  constructor(name, location) {
    this.name = name
    this.employees = []
    this.patients = []
    this.location = location
  }
  addDoctor(id, name, username, password) {
    var newDoctor = new Doctor(id, name, username, password);
    if(this.findEmployee(newDoctor.id) === ""){
      this.employees.push(newDoctor);
      return true;
    }
    return false;
  }
  addAdmin(id, name, username, password) {
    var newAdmin = new Admin(id, name, username, password);
    if(this.findEmployee(newAdmin.id) === ""){
      this.employees.push(newAdmin);
      return true;
    }
    return false;
  }
  addOb(id, name, username, password) {
    var newOb = new Ob(id, name, username, password);
    if(this.findEmployee(newOb.id) === ""){
      this.employees.push(newOb);
      return true;
    }
    return false;
  }
  addPatient(id, name, diagnosis) {
    var newPatient = new Patient(id, name, diagnosis);
    if(this.findPatient(newPatient.id) === ""){
      this.patients.push(newPatient);
      return true;
    }
    return false;
  }
  removePatient(id) {
    for (var i = 0; i < this.patients.length; i++) {
      if (this.patients[i].id === id.trim()) {
        this.patients.splice(i,1);
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

  }
}

module.exports = Hospital
