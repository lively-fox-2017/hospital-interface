let fs = require('fs')
let patientDbJson = fs.readFileSync('patientDb.json','utf8')
let patientDb = JSON.parse(patientDbJson);
// console.log(patientDb);

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
    this.no_of_patients = no_of_patients
  }
  static listPatients(){
    let patientArr = [];
    for(var i = 0; i < patientDb.length; i++){
      patientArr.push(`Patient ID: ${i+1}, Patient Name: ${patientDb[i].patient_name}, Patient Diagnose With: ${patientDb[i].patient_diagnose}`);
    }
    return patientArr.join('\n')
  }
  static viewPatientRecord(){
    let patientRecArr = [];
    for(var i = 0; i < patientDb.length; i++){
      patientRecArr.push(patientDb[i])
    }
    return patientRecArr
  }
  createPatient(){
    
  }
}
module.exports = Patient
