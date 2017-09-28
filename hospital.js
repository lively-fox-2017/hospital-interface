const Employee = require('./employee.js')
const Patient = require('./patient.js')

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
  }

  Interface() {
    console.log(`Welcome to ${this.name} hospital`)
    console.log(`=================================`)
    console.log(`Location : ${this.location}`)
    console.log(`=================================`)
    console.log(`We currently have ${this.patients} patients \n`)
    this.Login()
  }
  Login(nama) {
    // readline.setPrompt(`Welcome to Hospital \n`)
    readline.prompt()
      readline.question('Input your username \n',(nama) => {
        if(nama.length < 1 ) {
          console.log('nama salah')
          this.Login(nama)
        } else {
          if(employee.find(o => o.name === nama).name === nama) {
            this.Password(nama)
          } 
        }
          
      })
  }

  Password(nama) {
    readline.prompt()
    readline.question('Input your password \n', (inputPass) => {
      if(employee.find(o => o.name === nama).password === inputPass) {
        // console.log('Halo')
        this.options(nama)
      }
    })
  }

  options(nama) {
    if(employee.find(o => o.name === nama).position === 'Admin') {
      this.optionAdmin(nama)
    } else if (employee.find(o => o.name === nama).position  === 'Dokter') {
      this.optionDokter()
    } else if (employee.find(o => o.name === nama).position  === 'Office Boy') {
      this.optionDokter()
    }
  }

  optionAdmin(nama) {
    console.log(`What would you like to do : `)
    console.log(`[1]Add Employee`)
    console.log(`[2]Remove Employee`)
    console.log(`[3]List Employees`)
    console.log(`[4]List patients`)
    console.log(`[5]Add patient`)
    console.log(`[6]Remove Patient`)
    console.log(`[7]Log Out`)
    readline.question('Input your choice \n', (choice) => {
      if(choice === '1') {
        this.addEmployee(nama)
      }
      if(choice === '2') {
        this.removeEmployee(nama)
      
      }
      if(choice === '3') {
        console.log(employee)
        this.optionAdmin(nama)
      }
      if(choice === '4') {
        console.log(patients)
        this.optionAdmin(nama)
      }
      if(choice === '5') {
        this.addPatient(nama)
        // this.optionAdmin()
      }
      if(choice === '6') {
        this.removePatient(nama)
      }
      if(choice === '7') {
        console.log('Goodbye')
        this.Interface()
      }
    })
  }
  
  optionDokter(nama) {
    console.log(`[1]Add Patient`)
    console.log(`[2]List patients`)
    console.log(`[3]Remove Patient`)
    console.log(`[4]Log Out`)
    readline.question('Input your choice \n', (choice) => {
      if(choice === '2') {
        console.log(patients)
        this.optionDokter(nama)
      }
      if(choice === '1') {
        this.addPatient(nama)
      }
      if(choice === '3') {
        this.removePatient(nama)
      }
      if(choice === '4') {
        console.log('Goodbye')
        this.Interface()
      }
    }) 
  }

  optionOb() {
    console.log(`BALIK KERJA`)
    this.Interface()
  }

  addPatient(nama) {
    // let index = patients.find(o => o.name === nama).id
    readline.question('Input your new patient \n', (inputPass) => {
     let split = inputPass.split(',')
     let pasien = new Patient(split[0],split[1],split[2])
     patients.push(pasien)
     this.options(nama)
    })
  }

  addEmployee() {
    // let index = patients.find(o => o.name === nama).id
    readline.question('Input your new employee \norder of input : Name, position, username, password \n', (inputPass) => {
     let split = inputPass.split(',')
     let staff = new Employee(split[0],split[1],split[2],split[3])
     employee.push(staff)
     this.options(nama)
    })
  }

  removeEmployee(nama) {
    console.log(employee)
    readline.question('Who do you want to remove : ', (choice) => {
      let index = employee.findIndex(o => o.name === choice)
      employee.splice(index,1)
      this.options(nama)
    })
  }

  removePatient(nama) {
    console.log(patients)
    readline.question('Who do you want to remove : ', (choice) => {
      let index = patients.findIndex(o => o.id === choice)
      patients.splice(index,1)
      this.options(nama)
    })
  }
}

// class Patient {
//   constructor(id, name, diagnosis) {
//     this.id = id
//     this.name = name
//     this.diagnosis = diagnosis
//   }
// }

// class Employee {
//   constructor(name, position, username, password) {
//     this.name = name
//     this.position = position
//     this.username = username
//     this.password = password
//   }

// }


let jeni = new Patient('001', 'Jeni', 'Jiwa')
let yeni = new Patient('002','Yeni','Sekarat')
let beni = new Patient('003', 'Beni', 'Gendut')
let patients = [jeni,yeni,beni]


let jason = new Employee('jason', 'Admin', 'jason', '123')
let gason = new Employee('gason', 'Dokter', 'gason', '123')
let yason = new Employee('yason', 'Office Boy', 'yason', '123')
let employee = [jason,gason,yason]

let hospital = new Hospital('Gatou', 'Dimana-mana', employee.length, patients.length)

const rl = require('readline');

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});

hospital.Interface()
