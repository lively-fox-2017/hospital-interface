class Patient {
  constructor(attribute) {
    this.id = attribute['id']
    this.name = attribute['name']
    this.diagnosis = attribute['diagnosis']
    this.doctor = attribute['doctor']
  }
}

module.exports = Patient
