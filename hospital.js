let fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>',
});

const Employee = require('./employee');
const Patient = require('./patient');

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name;
    this.employees = employees;
    this.patients = patients;
    this.location = location;
  }

  login() {
    rl.question('--Welcome to ' + this.name + ' Hospital-- \n' + '------' + this.location + '------\n' + 'Please enter your Username:\n', (name) => {
      rl.question('Please enter password: \n> ', (password) => {
        for (let i = 0; i < this.employees.length; i++) {
          if (this.employees[i].name === name && this.employees[i].password === password) {
            if (this.employees[i].position === 'dokter') {
              doctorName = this.employees[i].name
              return hospital.doctorMenu();
            }
            if (this.employees[i].position === 'admin') {
              adminName = this.employees[i].name
              return hospital.adminMenu();
            }
            if (this.employees[i].position === 'OB') {
              return hospital.obMenu();
            }
            if (this.employees[i].position === 'pasien') {
              return hospital.patientMenu();
            }
            return hospital.inputSalah();
          }
        }
      })
    })
  }

  obMenu() {
    console.log('> -------------------------\n> Welcome ' + 'OB' + ' Your access level is: USER\n> -------------------------');
    rl.question('What would you like to do? \n> 1. play game \n> FOR EXIT (press ctrl + c) \n> ', (answer) => {
      if (answer === '1') {
        console.log('kerja dulu donk');
      } else {
        console.log('Please input number only press 0 for back');
        return hospital.login();
      }
    })
  }

  patientMenu() {
    console.log('> ----------------------------------------\n> Welcome, Your access level is: USER\n> ----------------------------------------');
    console.log('1. view_record <patient_id> ');
    console.log('FOR EXIT (press ctrl + c)');
    rl.question('What would you like to do?  ', (answer) => {
      if (answer === '1') {
        console.log('view_record pasien');
        return hospital.get_patient();
      } else {
        console.log('Please input number only');
      }
    })
  }

  adminMenu() {
    console.log('> ----------------------------------------\n> Welcome ' + adminName + ' Your access level is: ADMIN\n> ----------------------------------------');
    console.log('1. list_employee');
    console.log('2. list_patient');
    console.log('3. view_record <employee_id> ');
    console.log('4. view_record <patient_id> ');
    console.log('5. add_record <employee_id> ');
    console.log('6. add_record <patient_id> ');
    console.log('7. remove_record employee');
    console.log('8. remove_record patient');
    console.log('9. add_user for patient');
    console.log('FOR EXIT (press ctrl + c)');

    rl.question('What would you like to do?  ', (answer) => {
      if (answer === '1') {
        console.log('tampil data karyawan');
        return hospital.list_employee();
      } else if (answer === '2') {
        console.log('tampil data pasien \n');
        return hospital.list_patients();
      } else if (answer === '3') {
        console.log('view_record karyawan');
        return hospital.get_employee();
      } else if (answer === '4') {
        console.log('view_record pasien');
        return hospital.get_patient();
      } else if (answer === '5') {
        console.log('add_record karyawan');
        return hospital.add_employee();
      } else if (answer === '6') {
        console.log('add_record pasien');
        return hospital.add_patient();
      } else if (answer === '7') {
        console.log('remove_record');
        return hospital.remove_employee();
      } else if (answer === '8') {
        console.log('remove_record patient');
        return hospital.remove_patients();
      } else if (answer === '9') {
        console.log('add user');
        return hospital.add_user();
      } else {
        console.log('Please input number only');
      }
    })
  }

  doctorMenu() {
    console.log('> -------------------------\n> Welcome ' + doctorName + ' Your access level is: DOCTOR\n> -------------------------');
    rl.question('What would you like to do? \n 1. list_patients \n 2. view_record <patient_id> \n 3. add_record <patient_id> \n 4. remove_record \n FOR EXIT (press ctrl + c) \n> ', (answer) => {
      if (answer === '1') {
        console.log('tampil data pasien \n');
        return hospital.list_patients();
      } else if (answer === '2') {
        console.log('view_record');
        return hospital.get_patient();
      } else if (answer === '3') {
        console.log('add_record');
        return hospital.add_patient();
      } else if (answer === '4') {
        console.log('remove_record');
        return hospital.remove_patients();
      } else {
        console.log('Please input number only, press 0 for back');
        return hospital.login();
      }
    })
  }

  list_employee() {
    let content = fs.readFileSync('dataemployees.json', 'utf8');
    let objContent = JSON.parse(content);
    // console.log(this.employees);
    console.log(objContent);
    rl.question('What would you like to do? press 0 for back ', (answer) => {
      if (answer === '0') {
        return hospital.adminMenu();
      }
    })
  }

  list_patients() {
    let content2 = fs.readFileSync('datapatient.json');
    let objContent2 = JSON.parse(content2);
    // console.log(this.patients);
    console.log(objContent2);
    rl.question('What would you like to do? press 0 for back ', (answer) => {
      if (answer === '0') {
        return hospital.doctorMenu();
      }
    })
  }

  get_patient() {
    let content2 = fs.readFileSync('datapatient.json');
    let objContent2 = JSON.parse(content2);
    rl.question('input nama / id yang mau dilihat, ', (answer) => {
      for (var i=0; i<objContent2.length; i++){
        if (objContent2[i].name == answer || objContent2[i].id == answer){
          console.log(objContent2[i]);
          rl.question('What would you like to do? press 0 for back ', (answer) => {
            if (answer === '0') {
              return hospital.doctorMenu();
            }
          })
        }
      }
    })
  }

  get_employee() {
    let content = fs.readFileSync('dataemployees.json', 'utf8');
    let objContent = JSON.parse(content);
    rl.question('input nama yang mau dilihat, ', (answer) => {
      for (var i=0; i<objContent.length; i++){
        if (objContent[i].name == answer){
          console.log(objContent[i]);
          rl.question('What would you like to do? press 0 for back ', (answer) => {
            if (answer === '0') {
              return hospital.doctorMenu();
            }
          })
        }
      }
    })
  }

  remove_employee() {
    let space = [];
    let content2 = fs.readFileSync('datapatient.json');
    let objContent2 = JSON.parse(content2);
    // console.log(this.employees);
    console.log(objContent);
    rl.question('masukan nama yang mau dihapus, ', (answer) => {
      for (var i = 0; i < this.employees.length; i++) {
        if (answer != this.employees[i].name) {
          space.push(this.employees[i]);
          let simpan = JSON.stringify(space);
          fs.writeFile('dataemployees.json', simpan, (err, tersimpan) => {
            if (err) {
              console.log('data tidak tersimpan');
            } else {
              return hospital.adminMenu();
            }
          })
        }
      }
    })
  }

  remove_patients() {
    let tampung = [];
    console.log(this.patients);
    rl.question('pilih id yang mau dihapus, ', (answer) => {
      for (var i = 0; i < this.patients.length; i++){
        if (answer != this.patients[i].id) {
          tampung.push(this.patients[i]);
          let simpan = JSON.stringify(tampung);
          // console.log(simpan);
          fs.writeFile('datapatient.json', simpan, (err, tersimpan) => {
            if (err) {
              console.log('data tidak tersimpan');
            } else {
              return hospital.doctorMenu();
            }
          })
        }
      }
    })
  }

  add_user() {
    rl.question('Please add user name:\n', (name) => {
      rl.question('Please add user position: \n> ', (position) => {
        rl.question('Please add user username: \n> ', (username) => {
          rl.question('Please add user password: \n> ', (password) => {
            let inputUser = new Employee(name, position, username, password);
            this.employees.push(inputUser);
            let save = JSON.stringify(this.employees);
            fs.writeFile('dataemployees.json', save, (err, tersimpan) => {
              if (err) {
                console.log('data tidak tersimpan');
              } else {
                return hospital.login();
              }
            })
          })
        })
      })
    })
  }

  add_employee() {
    rl.question('Please add employee name:\n', (name) => {
      rl.question('Please add employee position: \n> ', (position) => {
        rl.question('Please add employee username: \n> ', (username) => {
          rl.question('Please add employee password: \n> ', (password) => {
            let inputEmployee = new Employee(name, position, username, password);
            this.employees.push(inputEmployee);
            let save = JSON.stringify(this.employees);
            fs.writeFile('dataemployees.json', save, (err, tersimpan) => {
              if (err) {
                console.log('data tidak tersimpan');
              } else {
                return hospital.adminMenu();
              }
            })
          })
        })
      })
    })
  }

  add_patient() {
    rl.question('Please add patient ID:\n', (id) => {
      rl.question('Please add patient Name: \n> ', (name) => {
        rl.question('Please add patient Diagnosis: \n> ', (diagnosis) => {
          let inputPatient = new Patient(id, name, diagnosis);
          this.patients.push(inputPatient);
          let simpan = JSON.stringify(this.patients);
          // console.log(simpan);
          fs.writeFile('datapatient.json', simpan, (err, tersimpan) => {
            if (err) {
              console.log('data tidak tersimpan');
            } else {
              return hospital.doctorMenu();
            }
          })
        })
      })
    })
  }

  inputSalah() {
    console.log('username dan password salah, FOR EXIT (press ctrl + c)');
  }
}
let content = fs.readFileSync('dataemployees.json', 'utf8');
let objContent = JSON.parse(content);
let arr_employees = [];
let employee1 = new Employee('ian', 'admin', 'admin', 'admin');
arr_employees.push(employee1)
let employee2 = new Employee('ryan', 'dokter', 'dokter', 'dokter');
arr_employees.push(employee2)
let employee3 = new Employee('OB', 'OB', 'OB', 'OB');
arr_employees.push(employee3);
// fs.writeFile('dataemployees.json', JSON.stringify(arr_employees), 'utf-8');
// console.log(arr_employees);



rl.on('close', () => {
  console.log('Have a great day!');
  process.exit(0);
});


let content2 = fs.readFileSync('datapatient.json');
let objContent2 = JSON.parse(content2);
let arr_patient = [];
let patient1 = new Patient('001', 'Sukma', 'Pusing');
arr_patient.push(patient1);
let patient2 = new Patient('002', 'Melati', 'Vertigo');
arr_patient.push(patient2);
// fs.writeFile('datapatient.json', JSON.stringify(arr_patient), 'utf-8');
// console.log(arr_patient);
let hospital = new Hospital('ABC', 'Jakarta Selatan', arr_employees, arr_patient);
let doctorName;
let adminName;
let obName;

hospital.login();

module.exports = Hospital;
