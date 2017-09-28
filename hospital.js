const readline = require('readline');
const Employee = require('./employee')
const Patient = require('./patient')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const Table = require('cli-table')

class Hospital {
  constructor(param) {
    this.name = param['name']
    this.employees = param['employees']
    this.patients = param['patients']
    this.location = param['location']
    this.user = ''
  }

  home() {
    console.log(`Welcome to ${this.name}\n${this.location}`);
    console.log('===========================');
    this.login()
  }

  login() {
    rl.question('Insert your username:\n', (answer) => {
      if (answer == 'admin') {
        this.user = 'admin'
        this.password()
      } else if (answer == 'doctor') {
        this.user = 'doctor'
        this.password()
      } else if (answer == 'ob') {
        this.user = 'ob'
        this.password()
      } else if (answer == 'quit') {
        rl.close()
      } else {
        this.home()
      }
    })
  }

  password() {
    rl.question('Insert your password:\n', (answer) => {
      if (answer === 'admin' && this.user === 'admin') {
        this.adminOptions()
      } else if (answer === 'doctor' && this.user === 'doctor') {
        this.doctorOptions()
      } else if (answer === 'ob' && this.user === 'ob') {
        this.obOptions()
      } else {
        this.login()
      }
    })
  }

  adminOptions() {
    rl.question('[1]Staf data lists\n[2]Patients data list\n[3]Logout\n', (command) => {
      if (command === '1') {
        this.stafdataList()
      } else if (command === '2') {
        this.doctorOptions()
      } else if (command === '3') {
        this.home()
      } else {
        this.adminOptions()
      }
    })
  }

  stafdataList() {
    rl.question('What will you do?\n[1]Staf Lists\n[2]Add Staf\n[3]DeleteStaf\n[4]Back\n\n', (command) => {
      if (command === '1') {
        let table = new Table({
          head:['ID', 'Name', 'Position', 'Username', 'Password'],
          colwidth:[10,100,100,100,100]
        })
        employeeArr.forEach((a) => {
          table.push([a.id, a.name, a.position, a.username, a.password])
        })
        console.log(table.toString())
        console.log('')
        this.stafdataList();
      } else if (command === '2') {
        this.addStaf()
      } else if (command === '3') {
        this.deleteStaf()
      } else if (command === '4') {
        this.adminOptions()
      }
    })
  }

  addStaf() {
    rl.question('Please add your staf\n (id;name;position;username;password)\n', (data) => {
      let staf = new Employee()
      staf.staf = data
      employeeArr.push(staf)
      this.stafdataList()
    })
    rl.prompt()
  }

  deleteStaf() {
    rl.question('Who would you delete?\n', (data) => {
      let id = parseInt(data)
      if (this.user != employeeArr[id-1].username) {
        employeeArr.splice((id - 1), 1)
        this.adminOptions()
      } else {
        console.log('Masukkan id yang tepat')
        this.deleteStaf()
      }
    })
  }

  doctorOptions() {
    rl.question('What will you do?\n[1]Patients data lists\n[2]Add Patients List\n[3]Delete Patients Lists\n[4]Logout\n\n', (target) => {
      if (target === '1') {
        let table = new Table({
          head: ['ID', 'Name', 'Diagnosis'],
          colwidth: [10, 100, 100]
        })
        patientsArr.forEach((a) => {
          table.push([a.id, a.name, a.diagnosis])
        })
        console.log(table.toString())
        console.log('')
        this.doctorOptions()
      } else if (target === '2') {
        this.addPatients()
      } else if (target === '3') {
        this.deletePatients()
      } else if (target === '4') {
        this.home()
      }
    })
  }

  addPatients() {
    rl.question('Please add your patients\n(Format: id;name;diagnose)\n\n', (data) => {
      let newPatient = new Patient()
      newPatient.patient = data
      patientsArr.push(newPatient)
      this.doctorOptions()
    })
    rl.prompt()
  }

  deletePatients() {
    rl.question('Who would you delete?\n', (targetid) => {
      patientsArr.splice(Number(targetid - 1), 1)
      this.doctorOptions()
    })
  }

  obOptions() {
    console.log('What should I do?\nI must go now\n\n');
    this.home()
  }
}

let patient1 = new Patient
let patient2 = new Patient
let patient3 = new Patient
patient1.patient = '1;yosa;demam'
patient2.patient = '2;hilman;batuk'
patient3.patient = '3;huli;bersin'
let patientsArr = [patient1, patient2, patient3]

let staf1 = new Employee
let staf2 = new Employee
let staf3 = new Employee
staf1.staf = '1;Husni;Admin;admin;admin'
staf2.staf = '2;Ello;Doctor;doctor;doctor'
staf3.staf = '3;Cicak;OB;ob;ob'
let employeeArr = [staf1, staf2, staf3]

let rs = {
  name: 'RS Merah Putih',
  employees: employeeArr,
  patients: patientsArr,
  location: 'Jalan Merana Merona no 13'
};

let rumahsakit = new Hospital(rs)
rumahsakit.home()

module.exports = Hospital
