var Employee = require('./employee')
var Patient = require('./patient')
const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout})

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
    this.tampung = {}
  }

  menu() {
    console.log('< ************************************************************************ >');
    console.log(`< *                   WELCOME TO ${this.name} HOSPITAL                   * >`);
    console.log(`< *                Jln. ABC No.30 , ${this.location} Raya                * >`);
    console.log('< ************************************************************************ >');
    rl.question('Username: ', (username) => {
      rl.question('Password: ',(password) =>{
        for (var i = 0; i < this.employees.length; i++) {
          if(this.employees[i].username === username && this.employees[i].password === password){
            switch (this.employees[i].position) {
              case 'doctor':
                this.doctor()
                break;
              case 'administrator':
                this.adminroom()
                break;
              case 'officeboy':
                this.ob()
                break;
              default:
                break;
            }
          } else if (this.employees.username != username){
            return 'Username not valid !!';
          } else if (this.employees.password != password){
            return 'Password not valid !!';
          }
        }
      })
    })
  }

  adminroom() {
    console.log('< ***********************ADMINISTRATOR**************************** >');
    console.log(`1. List Patients `);
    console.log(`2. Detail Patients `);
    console.log(`3. Add Patients `);
    console.log(`4. Delete Patients `);
    console.log('------------------------------------------------------------------');
    console.log(`5. List Employees `);
    console.log(`6. Add Employees `);
    console.log(`7. Delete Employees `);
    console.log(`8. Exit `);
    console.log('< **************************************************************** >');


    rl.question('Pilih Menu: ', (opt) => {
      switch (opt) {
        case '1':
          this.List_patients()
          break;
        case '2':
          this.Details_patients()
          break;
        case '3':
          this.Add_patients()
          break;
        case '4':
          this.Delete_patients()
          break;
        case '5':
          this.List_employees()
          break;
        case '6':
          this.Add_employees()
          break;
        case '7':
          this.Delete_employees()
          break;
        case '8':
          rl.close()
      }
    })
  }

  doctor() {
    console.log('< ****************************DOCTOR********************************* >');
    console.log(`1. List Patients `);
    console.log(`2. Detail Patients `);
    console.log(`3. Logout `);
    console.log('< ******************************************************************* >');
  }

  ob() {
    console.log('< ****************************OFFICEBOY****************************** >');
    console.log(`1. Log Out `);
    console.log('< ******************************************************************* >');
  }

  receptionist(){
    console.log('< **************************RECEPTIONIST***************************** >');
    console.log(`1. List Patients `);
    console.log(`2. Detail Patients `);
    console.log(`3. Add Patients `);
    console.log(`4. Delete Patients `);
    console.log(`3. Logout `);
    console.log('< ******************************************************************* >');
  }

  List_patients(){
    console.log(this.patients);
    rl.question('Kembali (Y/N) ', (opt) => {
      if (opt == 'Y' || opt == 'y') {
        this.adminroom()
      } else {
        this.menu()
      }
    })
  }

  Details_patients(){
    rl.question('Pasien No : ', (input) => {
      console.log(this.patients[input-1]);

      rl.question('Kembali (Y/N) ', (opt) => {
        if (opt == 'Y' || opt == 'y') {
          this.adminroom()
        } else {
          this.menu()
        }
      })
    })
  }

  Add_patients(){
    rl.question('Nama : ', (nama)=>{
      rl.question('Diagnosis : ', (diagnosis)=>{
        let no_urut = this.patients[this.patients.length-1].id + 1
        let id = no_urut + 1
        let newPasien = new Patient(no_urut,nama,diagnosis)
        this.patients.push(newPasien)
        console.log(`\n\r ${nama} Congrats you new members now !`);
        rl.question('Back ? (Y/N) ', (opt) => {
          if (opt == 'Y' || opt == 'y') {
            this.adminroom()
          } else {
            this.menu()
          }
        })
      })
    })
  }

  Delete_patients(){}
  List_employees(){
    console.log(this.employees);
    rl.question('Kembali (Y/N) ', (opt) => {
      if (opt == 'Y' || opt == 'y') {
        this.adminroom()
      } else {
        this.menu()
      }
    })
  }
  Add_employees(){}
  Delete_employees(){}

}

let ArrEmp = []
let admin = new Employee('Hary', 'administrator', 'hary', 'hary');
let dokter = new Employee('Prana', 'doctor', 'prana', 'prana');
let ob = new Employee('Chandra', 'officeboy', 'candra', 'candra')
ArrEmp.push(admin)
ArrEmp.push(dokter)
ArrEmp.push(ob)
let Pegawai = ArrEmp
// id, name, diagnosis
let ArrPas = []
let pasien1 = new Patient(1, 'Ryan', 'Batuk');
let pasien2 = new Patient(2, 'Icha', 'Pusing');
let pasien3 = new Patient(3, 'Windy', 'Pilek')
ArrPas.push(pasien1)
ArrPas.push(pasien2)
ArrPas.push(pasien3)
let Pasien = ArrPas
// name, location, employees, patients
let rumahsakit = new Hospital('RS. MITRA', 'BEKASI', Pegawai, Pasien)
rumahsakit.menu();

module.exports = Hospital
