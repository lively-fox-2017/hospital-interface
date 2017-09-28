const fs = require('fs');
const Admin = require('./admin');
const Doctor = require('./doctor');
const OfficeBoy = require('./officeboy');
const Receptionist = require('./receptionist');
const Patient = require('./patient');

class Hospital {
  constructor(name, location, employeesFile, patientsFile) {
    this.name = name
    this.patientsFile = patientsFile;
    this.location = location
    this.employeesFile = employeesFile;
    this.employees = [];
    this.patients = [];
    this.parseEmployee();
    this.parsePatient();
  }

  credentialCheck(username, password) {
    let result = this.employees.filter((employee) => {
      return employee.username === username && employee.password === password;
    });
    return (result.length > 0) ? result[0] : false;
  }

  getLastIncrementedId(file) {
    let employees = JSON.parse(fs.readFileSync(file, 'utf8'));
    return (employees.length > 0) ? employees[employees.length - 1]['id'] + 1 : 1;
  }


  writeData(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 4), 'utf8');
    console.log('Data Berhasil Diubah');
  }

  parseEmployee() {
    let data = JSON.parse(fs.readFileSync(this.employeesFile, 'utf8'));
    data.forEach((employee) => {
      let element;
      switch (employee['position']) {
        case 'doctor':
          element = new Doctor(employee);
          break;
        case 'admin':
          element = new Admin(employee);
          break;
        case 'officeboy':
          element = new OfficeBoy(employee);
          break;
        case 'receptionist':
          element = new Receptionist(employee);
          break;
      }
      this.employees.push(element);
    });
  }

  parsePatient() {
    let data = JSON.parse(fs.readFileSync(this.patientsFile, 'utf8'));
    data.forEach((patient) => {
      let element = new Patient(patient);
      this.patients.push(element);
    });
  }

  getElementById(searchIn, id) {
    switch (searchIn) {
      case 'employees':
        return this.employees.filter((employee) => employee['id'] == id)[0];
        break;
      case 'patients':
        return this.patients.filter((patient) => patient['id'] == id)[0];
        break;
    }
  }

  addEmployee(employeeCreator, newEmployeeData) {
    let newEmployee;
    let data = {
      'id': this.getLastIncrementedId(this.employeesFile),
      'name': newEmployeeData['name'],
      'position': newEmployeeData['position'],
      'username': newEmployeeData['username'],
      'password': newEmployeeData['password'],
      'createdBy': employeeCreator.id
    }
    if (newEmployeeData['position'] === 'admin')
      newEmployee = new Admin(data);
    else if (newEmployeeData['position'] === 'doctor')
      newEmployee = new Doctor(data);
    else if (newEmployeeData['position'] === 'officeboy')
      newEmployee = new OfficeBoy(data);
    else if (newEmployeeData['position'] === 'receptionist')
      newEmployee = new Receptionist(data);
    this.employees.push(newEmployee);
    this.writeData(this.employeesFile, this.employees);
  }

  addRecordPatient(creator, patientData) {
    let data = {
      'id': this.getLastIncrementedId(this.patientsFile),
      'name': patientData['name'],
      'diagnosis': patientData['diagnosis'],
      'doctor': creator.id,
    }
    let newPatient = new Patient(data);
    this.patients.push(newPatient);
    this.writeData(this.patientsFile, this.patients);
  }

  deleteEmployee(deletedId) {
    let deletedEmployee = this.employees.filter((employee) => {
      return employee['id'] == deletedId;
    });
    this.employees = this.employees.filter((employee) => {
      return employee['id'] != deletedId;
    });
    this.writeData(this.employeesFile, this.employees);
    return deletedEmployee;
  }

  deleteRecordPatient(deletedId) {
    let deletedRecord = this.patients.filter((patient) => {
      return patient['id'] == deletedId;
    });
    this.patients = this.patients.filter((patient) => {
      return patient['id'] != deletedId;
    });
    this.writeData(this.patientsFile, this.patients);
    return deletedRecord;
  }
}

module.exports = Hospital
