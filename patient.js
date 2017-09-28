const Hospital = require('./hospital')

// /* import data employee */
let fs = require('fs')
let dataPatient = JSON.parse(fs.readFileSync('data_patient.json'))
//console.log(dataPatient)

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }


}


//Patient.searchById(search_id)

module.exports = Patient