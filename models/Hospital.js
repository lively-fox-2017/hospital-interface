const fs = require('fs');

class Hospital {
  constructor(obj) {
    this._name = obj.name;
    this._employees = obj.employees;
    this._patients = obj.patients;
    this._location = obj.location;
  }

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

    return '- list_employees\n- list_patients\n- view_employee <employee_id>\n- view_patient <patient_id>\n- remove_employee <employee_id>\n- remove_patient <patient_id>';

  }

  static getAdminCommands() {
    return [
      'list_employees', 'list_patients',
      'view_employee', 'view_patient',
      'remove_employee', 'remove_patient'
    ];
  }

  static listEmployees() {
    let employees = Hospital.fetch(['employees']);

    return employees;
  }

  static readFile() {

    return fs.readFileSync('hospital.json', 'utf8');

  }

  static fetchEmployees() {

    let hospital = this.readFile();

    return JSON.parse(hospital)[0].employees;

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
}

module.exports = Hospital
