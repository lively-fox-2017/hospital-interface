const fs = require('fs');
const Hospital = require('./Hospital');

class Patient {
  constructor(obj) {
    this.id        = obj.id || 0;
    this.name      = obj.name;
    this.diagnosis = obj.diagnosis;
  }

  static fetch(properties = []) {

    let patients = Hospital.fetchPatients();
    let fetchResult = [];

    if (properties.length) {

      for (let i = 0; i < patients.length; i++) {

        let patient = {};

        for (let j = 0; j < properties.length; j++) {

          patient[properties[j]] = patients[i][properties[j]];

        }

        fetchResult.push(patient);

      }

    }

    return fetchResult;

  }

  static find(property, value) {

    let patients = Hospital.fetchPatients();
    let findResult = [];

    for (let i = 0; i < patients.length; i++) {

      if (patients[i][property] === value) {

        findResult.push(patients[i]);

      }

    }

    return findResult;

  }

  save() {

    let hospital = JSON.parse(Hospital.readFile());

    let lastId = Hospital.getPatientLastId();

    this.id = lastId + 1;

    hospital[0].patients.push(this);

    fs.writeFileSync('hospital.json', JSON.stringify(hospital, null, '\t'));

  }

  static destroy(patientId) {

    let hospital = JSON.parse(Hospital.readFile());

    for (let i = 0; i < hospital[0].patients.length; i++) {

      if (hospital[0].patients[i].id === patientId) {

        hospital[0].patients.splice(i, 1);
        break;

      }

    }

    fs.writeFileSync('hospital.json', JSON.stringify(hospital, null, '\t'));

  }
}

module.exports = Patient;
