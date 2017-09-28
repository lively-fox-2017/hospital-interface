class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }

  set patient(arraydata) {
    let data = arraydata.split(';');
    this.id = data[0]
    this.name = data[1]
    this.diagnosis = data[2]
  }
}

module.exports = Patient
