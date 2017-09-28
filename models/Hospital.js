const fs = require('fs');

class Hospital {

  static setLoggedIn(employee) {

    let hospital = JSON.parse(this.readFile());

    hospital[1] = {loggedIn: {employee}};

    fs.writeFileSync('hospital.json', JSON.stringify(hospital, null, '\t'));

  }

  static getLoggedIn() {

    let hospital = JSON.parse(this.readFile());

    return hospital[1].loggedIn.employee[0];

  }

  static getAdminMenu() {

    return '- list_employees\n- list_patients\n- view_employee <employee_id>\n- view_patient <patient_id>\n- add_employee\n- add_patient\n- remove_employee <employee_id>\n- remove_patient <patient_id>\n- logout';

  }

  static getDoctorMenu() {

    return 'list_patients\n- view_patient <patient_id>\n- add_patient\n- remove_patient <patient_id>\n- logout';

  }

  static getOBMenu() {
    return '- logout';
  }

  static getAdminCommands() {

    return [
      'list_employees', 'list_patients',
      'view_employee', 'view_patient',
      'add_employee', 'add_patient',
      'remove_employee', 'remove_patient',
      'logout'
    ];

  }

  static getDoctorCommands() {

    return [
      'list_patients', 'view_patient',
      'add_patient', 'remove_patient',
      'logout'
    ];

  }

  static getOBCommands() {

    return ['logout'];

  }

  static listEmployees() {
    let employees = Hospital.fetch(['employees']);

    return employees[0];
  }

  static listPatients() {
    let patients = Hospital.fetch(['patients']);

    return patients[0];
  }

  static readFile() {

    return fs.readFileSync('hospital.json', 'utf8');

  }

  static fetchEmployees() {

    let hospital = this.readFile();

    return JSON.parse(hospital)[0].employees;

  }

  static fetchPatients() {

    let hospital = this.readFile();

    return JSON.parse(hospital)[0].patients;

  }

  static fetch(properties = []) {

    let hospital = JSON.parse(this.readFile())[0];
    let fetchResult = [];

    if (properties.length) {

      for (let i = 0; i < properties.length; i++) {

        fetchResult.push(hospital[properties[i]]);

      }

    }

    return fetchResult;

  }

  static getEmployeeLastId() {

    let employees = JSON.parse(this.readFile())[0].employees;

    if (employees.length)
      return employees[employees.length - 1].id;

    return 0;

  }

  static getPatientLastId() {

    let patients = JSON.parse(this.readFile())[0].patients;

    if (patients.length)
      return patients[patients.length - 1].id;

    return 0;

  }
}

module.exports = Hospital