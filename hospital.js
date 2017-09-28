const readline = require('readline')
const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout
})
const Employee = require('./employee')
const Patient = require('./patient')

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location

  }

  index() {
    console.log(`=============================== || > ${this.name} < || ============================`);
    rl.question('Masukan Username Anda : ', (username) => {
      let pass = ''
      let position = ''
      // console.log(this.employees);
      for (var i = 0; i < this.employees.length; i++) {
        // console.log(this.employees.username);
        if (this.employees[i].username == username) {
            pass = this.employees[i].password
            position = this.employees[i].position
        }
      }
      if (pass != '' && position != '') {
        rl.question('Masukan Password Anda : ', (password) => {
            if (pass == password && position == 'Doctor') {
              this.menuDoctor()
            } else if (pass == password && position == 'Admin') {
              this.menuAdmin()
            } else if (pass == password && position == 'OB') {
              this.menuOb()
            } else if (pass !== position){
              console.log('Password Yang Anda Masukan Salah!');
              return this.index()
            }
        })
      } else {
        return this.index()
      }
    })
  }

  menuDoctor() {
      console.log(`======================== SELAMAT DATANG DI MENU DOCTOR ====================`);
      console.log(`[1] Daftar Pasien`);
      console.log(`[2] Detail Pasien`);
      console.log(`[3] Tambah Pasien`);
      console.log(`[4] Hapus Pasien`);
      console.log(`[5] Keluar`);

      rl.question('Pilih Menu : ', (input) => {
        if (input == 1) {
          let tempPatient = []
          for (let i = 0; i < this.patients.length; i++) {
            tempPatient.push(`ID : ${this.patients[i].id} , NAMA : ${this.patients[i].name} , DIAGNOSIS : ${this.patients[i].diagnosis} `)
          }
          console.log('-------------- List Patients --------------');
          console.log(tempPatient.join('\n'));
          console.log('-------------- ------------- --------------');
          return this.menuDoctor()
        } else if (input == 2) {
          rl.question('Pilih ID Pasien : ', (inputID) => {
            let tempPatientDetail = []
            for (let i = 0; i < this.patients.length; i++) {
              if (this.patients[i].id == inputID) {
                tempPatientDetail.push(`NAMA : ${this.patients[i].name} \nDIAGNOSIS : ${this.patients[i].diagnosis}`)
              }
            }
            console.log('-------------- Detail Patients --------------');
            console.log(tempPatientDetail.join('\n'));
            console.log('-------------- ------------- ----------------');
            return this.menuDoctor()
          })
        } else if (input == 3) {
          rl.question('Masukan ID Pasien : ', (addId) => {
            rl.question('Masukan NAMA Pasien : ', (addNama) => {
              rl.question('Masukan DIAGNOSIS Pasien : ', (addDiagnosis) => {
                let tambahPasien = new Patient(addId,addNama,addDiagnosis)
                this.patients.push(tambahPasien)
                console.log('-------------- Data Anda Telah Di Simpan ! --------------');
                return this.menuDoctor()
              })
            })
          })
        } else if (input == 4) {
          rl.question('Pilih ID Pasien Yang Akan Di Hapus : ', (deleteId) => {
            for (let i = 0; i < this.patients.length; i++) {
              if (this.patients[i].id == deleteId) {
                console.log('-------------- Data Anda Telah Di Hapus ! --------------');
                this.patients.splice(i,1)
                return this.menuDoctor()
              }
            }
          })
        } else if (input == 5) {
          rl.question('Apakah Anda Yakin Ingin Keluar ? (y/n) ', (answer) => {
            if (answer == 'y') {
              return this.index()
            }else{
              return this.menuDoctor()
            }
          })
        } else {
          return this.menuDoctor()
        }
      })
  }

  menuAdmin() {
    console.log(`================================ SELAMAT DATANG DI MENU ADMIN =========================`);
    console.log(`[1] Daftar Pasien`);
    console.log(`[2] Detail Pasien`);
    console.log(`[3] Tambah Pasien`);
    console.log(`[4] Hapus Pasien`);
    console.log(`[5] Daftar Pegawai`);
    console.log(`[6] Detail Pegawai`);
    console.log(`[7] Tambah Pegawai`);
    console.log(`[8] Hapus Pegawai`);
    console.log(`[9] Keluar`);

    rl.question('Pilih Menu : ', (input) => {
      if (input == 1) {
        let tempPatient = []
        for (let i = 0; i < this.patients.length; i++) {
          tempPatient.push(`ID : ${this.patients[i].id} , NAMA : ${this.patients[i].name} , DIAGNOSIS : ${this.patients[i].diagnosis} `)
        }
        console.log('-------------- List Patients --------------');
        console.log(tempPatient.join('\n'));
        console.log('-------------- ------------- --------------');
        return this.menuAdmin()
      } else if (input == 2) {
        rl.question('Pilih ID Pasien : ', (inputID) => {
          let tempPatientDetail = []
          for (let i = 0; i < this.patients.length; i++) {
            if (this.patients[i].id == inputID) {
              tempPatientDetail.push(`NAMA : ${this.patients[i].name} \nDIAGNOSIS : ${this.patients[i].diagnosis}`)
            }
          }
          console.log('-------------- Patients Detail --------------');
          console.log(tempPatientDetail.join('\n'));
          console.log('-------------- --------------- --------------');
          return this.menuAdmin()
        })
      } else if (input == 3) {
        rl.question('Masukan ID Pasien : ', (addId) => {
          rl.question('Masukan NAMA Pasien : ', (addNama) => {
            rl.question('Masukan DIAGNOSIS Pasien : ', (addDiagnosis) => {
              let tambahPasien = new Patient(addId,addNama,addDiagnosis)
              this.patients.push(tambahPasien)
              console.log('-------------- Data Anda Telah Di Simpan ! --------------');
              return this.menuAdmin()
            })
          })
        })
      } else if (input == 4) {
        rl.question('Pilih ID Pasien Yang Akan Di Hapus : ', (deleteId) => {
          for (let i = 0; i < this.patients.length; i++) {
            if (this.patients[i].id == deleteId) {
              this.patients.splice(i,1)
              console.log('-------------- Data Anda Telah Di Hapus ! --------------');
              return this.menuAdmin()
            }
          }
        })
      } else if (input == 5) {
        let tempEmployee = []
        for(let i = 0; i < this.employees.length; i++) {
          tempEmployee.push(`NAMA : ${this.employees[i].name}\nPOSITION : ${this.employees[i].position}`)
        }
        console.log('-------------- List Employee --------------');
        console.log(tempEmployee.join('\n'));
        console.log('-------------- ------------- --------------');
        return this.menuAdmin()
      } else if (input == 6) {
        rl.question('Pilih ID Karyawan : ', (inputID) => {
          let tempEmployeeDetail = []
          for (let i = 0; i < this.employees.length; i++) {
            if (this.employees[i].id == inputID){
              tempEmployeeDetail.push(`ID : ${this.employees[i].id}\nNAMA : ${this.employees[i].name}\nPOSITION : ${this.employees[i].position} `)
            }
          }
          console.log(tempEmployeeDetail.join('\n'));
          return this.menuAdmin()
        })
      } else if (input == 7) {
        rl.question('Masukan ID Karyawan : ', (addId) => {
          rl.question('Masukan NAMA Karyawan : ', (addNama) => {
            rl.question('Masukan POSITION Karyawan : ', (addPosition) => {
              rl.question('Masukan USERNAME Karyawan :', (addUsername) => {
                rl.question('Masukan PASSWORD Karyawan :', (addPassword) => {
                  let tambahPasien = new Employee(addId,addNama,addPosition,addUsername,addPassword)
                  this.patients.push(tambahPasien)
                  console.log('-------------- Data Anda Telah Di Simpan ! --------------');
                  return this.menuAdmin()
                })
              })
            })
          })
        })
      } else if (input == 8) {
        rl.question('Pilih ID Karyawan Yang Akan Di Hapus : ', (deleteId) => {
          for (let i = 0; i < this.employees.length; i++) {
            if (this.employees[i].id == deleteId) {
              this.employees.splice(i,1)
              console.log('-------------- Data Anda Telah Di Hapus ! --------------');
              return this.menuAdmin()
            }
          }
        })
      } else if (input == 9) {
        l.question('Apakah Anda Yakin Ingin Keluar ? (y/n) ', (answer) => {
          if (answer == 'y') {
            return this.index()
          }else{
            return this.menuDoctor()
          }
        })
      } else {
        return this.menuAdmin()
      }
    })
  }

  menuOb() {
    console.log(`=============================== SELAMAT DATANG DI MENU OB =============================`);
    console.log(`[5] Keluar`);

    rl.question('Pilih Menu : ', (input) => {
      if (input == 5){
        return this.index()
      } else {
        return this.menuOb()
      }
    })
  }

}

let employee1 = new Employee(1, 'Prana', 'Doctor', 'pjap', 'pjap')
let employee3 = new Employee(2, 'Budi', 'OB', 'budi', 'budi')
let employee2 = new Employee(3, 'Ucok', 'Admin', 'ucok', 'ucok')

let patient1 = new Patient(1, 'Ani', 'Menelan Paku')
let patient2 = new Patient(2, 'Rhoma', 'Susah BAB')
let patient3 = new Patient(3, 'Nakimin', 'Jamuran')

let arrEmployees = [employee1,employee2,employee3]
let arrPatients = [patient1,patient2,patient3]

let hospital = new Hospital('Rumah Sakit Gaib', 'Bogor', arrEmployees, arrPatients)
hospital.index()
// console.log(arrEmployees,arrPatients);

module.exports = Hospital
