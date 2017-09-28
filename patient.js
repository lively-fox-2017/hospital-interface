class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }


}

let ArrPas = []
let pasien1 = new Patient('1', 'Ryan', 'Batuk');
let pasien2 = new Patient('2', 'Icha', 'Pusing');
let pasien3 = new Patient('3', 'Windy', 'Pilek')
ArrPas.push(pasien1)
ArrPas.push(pasien2)
ArrPas.push(pasien3)
let Pasien = ArrPas

module.exports = Patient
