
let Patient = require('./patient');
let Employee = require('./employee')

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
  }

  welcome() {

    console.log('Welcome to ' + this.name + '\n ' + this.location)
    console.log('-----------------------------')
    rl.question('Please enter your username? \n', (answerUsername) => {
      if (answerUsername === this.getData(answerUsername).username) {
        rl.question('Please enter your password? \n', (answerPassword) => {
          if (answerPassword === this.getData(answerUsername).password) {
            console.log("-----------------------------");
            console.log("Welcome, " + answerUsername + '. Your access level is : ' + this.getData(answerUsername).position + '\n-----------------------------' + '\nWhat would you like to do? \n' + 'Options : \n')
            if (this.getData(answerUsername).position == 'Dokter') {
              this.dataMenuDokter()
            } else if (this.getData(answerUsername).position == 'Admin') {
              this.dataMenuAdmin()
            } else if (this.getData(answerUsername).position == 'Resepsionis') {
              this.dataMenuResepsionis();
            } else {
              this.dataMenuOB();
            }
          } else {
            this.welcome();
          }

        });
      } else {
        this.welcome();
      }

    });

  }

  getData(nama) {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].username == nama) {
        return this.employees[i]
      }
    }
    return false
  }

  dataMenuDokter() {

    rl.question('1. list_patients \n' + '2. view_records <patient_id> \n' + '3. add_patient <id> <nama> <diagnosa>\n' + '4. remove_patient <patient_id> \n' + '5. log_out \n', (answer) => {
      let jawaban = answer.split(" ");
      console.log('------------------')
      switch (jawaban[0]) {
        case 'list_patients':
          this.listPatients();
          break;
        case 'view_records':
          this.viewPatients(jawaban[1])
          break;
        case 'remove_patient':
          this.removePatient(jawaban[1])
          break;
        case 'add_patient':
          this.addPatients(jawaban[1], jawaban[2], jawaban.splice(3).join(' '))
          break;
        case 'log_out':
          rl.close();
          break;
        default:
          console.log('Salah memasukkan menu!\n')
          break;
      }

      if (jawaban[0] != 'log_out') {
        console.log('------------------')
        this.dataMenuDokter();
      }
    });

  }
  dataMenuAdmin() {
    rl.question('1. list_employee \n' + '2. view_employee <employee_username> \n' + '3. add_employee <nama> <position>  <username> <password>\n' + '4. remove_employee <employee_username> \n' + '5. list_patients \n' + '6. view_patient <patient_id> \n' + '7. add_patient <id> <nama> <diagnosa> \n' + '8. remove_patient <id> \n' + '9. log_out \n', (answer) => {
      let jawaban = answer.split(" ");
      console.log('------------------')
      switch (jawaban[0]) {
        case 'list_patients':
          this.listPatients();
          break;
        case 'view_patient':
          this.viewPatients(jawaban[1])
          break;
        case 'remove_employee':
          this.removeEmployee(jawaban[1])
          break;
        case 'remove_patient':
          this.removePatient(jawaban[1])
          break;
        case 'add_patient':
          this.addPatients(jawaban[1], jawaban[2], jawaban.splice(3).join(' '))
          break;
        case 'list_employee':
          this.listEmployees()
          break;
        case 'add_employee':
          this.addEmployee(jawaban[1], jawaban[2], jawaban[3], jawaban[4])
          break;
        case 'view_employee':
          this.viewEmployees(jawaban[1])
          break;
        case 'log_out':
          rl.close();
          break;
        default:
          console.log('Salah memasukkan menu!\n')
          break;
      }
      if (jawaban[0] != 'log_out') {
        console.log('------------------')
        this.dataMenuAdmin();
      }
    });
  }
  dataMenuResepsionis() {
    rl.question('1. list_patients \n' + '2. view_patient <patient_id> \n' + '3. log_out \n', (answer) => {
      let jawaban = answer.split(" ");
      console.log('------------------')
      switch (jawaban[0]) {
        case 'list_patients':
          this.listPatients()
          break;
        case 'view_patient':
          this.viewPatients(jawaban[1])
          break;
        case 'log_out':
          rl.close();
          break;
        default:
          console.log('Salah memasukkan menu!\n')
          break;
      }
      if (jawaban[0] != 'log_out') {
        console.log('------------------')
        this.dataMenuResepsionis();
      }
    })
  }
  dataMenuOB() {
    rl.question('1. log_out \n', (answer) => {
      let jawaban = answer.split(" ");
      console.log('------------------')
      switch (jawaban[0]) {
        case 'log_out':
          rl.close();
          break;
        default:
          console.log('Salah memasukkan menu!\n')
          break;
      }

      if (jawaban[0] != 'log_out') {
        this.dataMenuOB();
      }
    });
  }

  listPatients() {
    for (let i = 0; i < this.patients.length; i++) {
      console.log(`${this.patients[i].name} :` + `${this.patients[i].diagnosis}`)
    }
  }
  listEmployees() {
    for (let i = 0; i < this.employees.length; i++) {
      console.log(`${this.employees[i].name} :` + `${this.employees[i].position}`)
    }
  }
  viewPatients(idPatient) {
    for (let i = 0; i < this.patients.length; i++) {
      if (this.patients[i].id == idPatient) {
        console.log(`${this.patients[i].name} : ` + `${this.patients[i].diagnosis}`)
      }
    }

  }
  viewEmployees(nama) {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].username == nama) {
        console.log(`${this.employees[i].name} : ` + `${this.employees[i].position}`)
      }
    }
  }
  addPatients(id, nama, diagnosa) {
    this.patients.push(new Patient(id, nama, diagnosa))
    console.log('Data saved! \n')
    for (let i = 0; i < this.patients.length; i++) {
      console.log(`${this.patients[i].id}. `, `${this.patients[i].name} : `, `${this.patients[i].diagnosis}`)
    }

  }

  addEmployee(nama, posisi, username, password) {
    this.employees.push(new Employee(nama, posisi, username, password));
    console.log('Data saved! \n')
    for (let i = 0; i < this.employees.length; i++) {
      console.log(`${this.employees[i].name} : `, `${this.employees[i].position}`)
    }
  }
  removeEmployee(username) {
    let indexEmployee;
    for (let i = 0; i < this.employees.length; i++) {

      if (this.employees[i].username == username) {
        console.log('Employee named ' + this.employees[i].name + ' was removed');
        this.employees.splice(i, 1);

      }
    }
    for (let j = 0; j < this.employees.length; j++) {
      console.log(`${this.employees[j].name} : `, `${this.employees[j].position}`)
    }

  }

  removePatient(id) {
    for (let i = 0; i < this.patients.length; i++) {
      if (this.patients[i].id == id) {
        console.log('Patient named ' + this.patients[i].name + ' was removed');
        this.patients.splice(i, 1);
      }
    }

  }
}

let arrEmployee = []
var employee1 = new Employee('Anita', 'Admin', 'anita', 'anita')
arrEmployee.push(employee1)
var employee2 = new Employee('Bagas', 'Dokter', 'bagas', 'bagas')
arrEmployee.push(employee2)
var employee3 = new Employee('Agus', 'OB', 'agus', 'agus')
arrEmployee.push(employee3)
var employee3 = new Employee('Amanda', 'Resepsionis', 'amanda', 'amanda')
arrEmployee.push(employee3)

let arrPatient = []
var patient1 = new Patient('1', 'Cinta', 'Sakit perut')
arrPatient.push(patient1)
var patient2 = new Patient('2', 'Karina', 'Sakit kepala')
arrPatient.push(patient2)

let hospital = new Hospital('Lively Hospital', 'Jl. Melati 3', arrEmployee, arrPatient);
hospital.welcome();
