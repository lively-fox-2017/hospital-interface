
class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
}
let patient1 = new Patient(1, 'Budi', 'Jantung')
let patient2 = new Patient(2, 'Badu', 'Stroke')
let patient3 = new Patient(3, 'Tono', 'Tipes')
module.exports = Patient,patient1,patient2,patient3
