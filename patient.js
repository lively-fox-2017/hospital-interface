let fs = require('fs')
let dataPatients = JSON.parse(fs.readFileSync('patients.json', 'utf8'))

class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  static add(id, name, diagnosis) {
    dataPatients.push(new Patient(id, name, diagnosis))
    let data = JSON.stringify(dataPatients)
    fs.writeFileSync('patients.json', data, 'utf8')
  }

  static del(id) {
    for (var i = 0; i < dataPatients.length; i++) {
      if(id == dataPatients[i].id){
        dataPatients.splice(i, 1)
      }
    }
    let dataDel = JSON.stringify(dataPatients);
    fs.writeFileSync('patients.json', dataDel, 'utf8')
  }

  static showList(){
    let temp = [`id | name`]
    for (var i = 0; i < dataPatients.length; i++) {
      temp.push(`${dataPatients[i].id} | ${dataPatients[i].name}`)
    }
    return temp.join('\n')
  }

  static showRecord(input){
    for (var i = 0; i < dataPatients.length; i++) {
      if(input == dataPatients[i].id){
        return `id | name | diagnosis \n${dataPatients[i].id} | ${dataPatients[i].name} | ${dataPatients[i].diagnosis}`;
      }
    }
  }
}

console.log(Patient.del());

exports.class = Patient
exports.data = dataPatients
