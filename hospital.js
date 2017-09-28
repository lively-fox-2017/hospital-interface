const Patient = require('./patient')
const Employee = require('./employee')

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
    this.dataPasien = []
    this.dataPegawai = []
  }

  menu() {
    console.log('welcome to ' + this.name + ' Hospital ' + '')

    rl.question('Please enter your username? \n', (username) => {

      if(this.cekUsername(username)) {

        rl.question('Please enter your password? \n', (password) => {

          if(this.cekPassword(username, password)) {
            this.cekMenu(this.cekPosisi(username))
          }

          else {
            console.log('password salah');
            this.menu()
          }

        });
      }

      else {
        console.log('password salah');
        this.menu()
      }

    });
  }

  cekUsername(input) {
    for(var i = 0; i < this.dataPegawai.length; i++) {
      if(this.dataPegawai[i].username == input) {
        return true
      }
    }
    return false
  }

  cekPassword(nama, kunci) {
    for(var i = 0; i < this.dataPegawai.length; i++) {
      if(this.dataPegawai[i].username == nama && this.dataPegawai[i].password == kunci) {
        return true
      }
    }
    return false
  }

  cekPosisi(input) {
    for(var i = 0; i < this.dataPegawai.length; i++) {
      if(this.dataPegawai[i].username == input) {
        return this.dataPegawai[i].position
      }
    }
  }

  cekMenu(input) {
    if(input == 'admin') {
      this.adminMenu()
    }

    if(input == 'dokter') {
      this.dokterMenu()
    }

    if(input == 'ob') {
      this.obMenu()
    }
  }

  adminMenu() {
    console.log('Welcome, Your access level is ', 'admin');
    console.log('What Would you like to do');
    console.log('1. list patient');
    console.log('2. view record patient')
    console.log('3. view record employee')
    console.log('4. add record patient')
    console.log('5. add record employee')
    console.log('6. remove record patient');
    console.log('7. remove record employee');
    console.log('8. LogOut');
    rl.question('pilih salah satu (masukan nomor) \n', (input) => {
      if(input == 1) {
        this.showListPatient()
      }else if(input == 2) {
        this.viewRecordPatient();
      }else if(input == 3) {
        this.ViewRecordEmployee()
      }else if(input == 4) {
        this.createPatienceByAdmin()
      }else if(input == 5) {
        this.createEmployeeByAdmin()
      }else if(input == 6) {
        this.removePatientByAdmin()
      }else if(input == 7) {
        this.removeEmployeeByAdmin()
      }else if(input == 8) {
        rl.close()
      }
      else {
        this.adminMenu()
      }
    })
  }

  dokterMenu(nama) {
    console.log('welcome Your access level is ', 'dok');
    console.log('What Would you like to do');
    console.log('1. list patient');
    console.log('2. view record patient')
    console.log('3. add record patient')
    console.log('4. remove record patient');
    console.log('5. Logout');
    rl.question('pilih salah satu (masukan nomor) \n', (input) => {
      if(input == 1) {
        this.showListPatientByDoctor()
      }else if(input == 2) {
        this.viewRecordPatientByDokter()
      }else if(input == 3) {
        this.createPatienceByDocter()
      }else if(input == 4) {
        this.removePatientByDokter()
      }else if(input == 5) {
        rl.close()
      }else {
        dokterMenu()
      }
    })
  }

  obMenu() {
    console.log('welcome Your access level is ob')
    rl.question('pilih salah satu (masukkan nomor) \n', (input) => {
      if(input == 0) {
        rl.close()
      }

      else {
        this.obMenu()
      }
    })
  }

  createPatience(id, nama, diagnosa) {
    var pasienBaru = new Patient(id, nama, diagnosa)
    this.dataPasien.push(pasienBaru)
  }

  createPatienceByAdmin(id, nama, diagnosa) {
    rl.question('Masukkan id pasien \n', (id) => {
      rl.question('Masukkan nama pasien \n', (nama) => {
        rl.question('Masukkan diagnosa \n', (diagnosa) => {
          this.dataPasien.push(new Patient(id, nama, diagnosa))
          console.log('data telah masuk')
          rl.question('0. kembali \n', (pilihan) => {
            if(pilihan == 0) {
              this.adminMenu()
            }
          })
        })
      })
    })
  }

  createPatienceByDocter(id, nama, diagnosa) {
    rl.question('Masukkan id pasien \n', (id) => {
      rl.question('Masukkan nama pasien \n', (nama) => {
        rl.question('Masukkan diagnosa \n', (diagnosa) => {
          this.dataPasien.push(new Patient(id, nama, diagnosa))
          console.log('data telah masuk')
          rl.question('0. kembali \n', (pilihan) => {
            if(pilihan == 0) {
              this.dokterMenu()
            }
          })
        })
      })
    })
  }

  createEmployee(name, position, username, password) {
    var pegawaiBaru = new Employee(name, position, username, password)
    this.dataPegawai.push(pegawaiBaru)
  }

  createEmployeeByAdmin() {
    rl.question('Masukkan name pegawwai \n', (name)=> (
      rl.question('Masukkan position \n', (position)=> {
        rl.question('Masukkan username \n', (username) => {
          rl.question('Masukkan password \n', (password) => {
            this.dataPegawai.push(new Employee(name, position, username, password))
            console.log('data pegawai telah masuk');
            rl.question('0. kembali \n', (pilihan) => {
              this.adminMenu()
            })
          })
        })
      })
    ))
  }

  showListPatient() {
    console.log('Daftar Pasien Rumah Maida:')
    for(var i = 0; i < this.dataPasien.length; i++) {
        console.log(this.dataPasien[i].id + '.' + ' ' + this.dataPasien[i].name);
    }

    rl.question('0. kembali \n', (id) => {
      // this.viewRecordPatient(id)
      if(id == 0) {
        this.adminMenu()
      }
    })
  }

  showListPatientByDoctor() {
    console.log('Daftar Pasien Rumah Maida:')
    for(var i = 0; i < this.dataPasien.length; i++) {
        console.log(this.dataPasien[i].id + '.' + ' ' + this.dataPasien[i].name);
    }

    rl.question('0. kembali \n', (id) => {
      // this.viewRecordPatient(id)
      if(id == 0) {
        this.dokterMenu()
      }
    })
  }

  viewRecordPatient() {
    rl.question('masukkan ID \n', (id) => {
      // this.viewRecordPatient(id)
      id = id - 1
      console.log(this.dataPasien[id].id + " " + this.dataPasien[id].name + " " + this.dataPasien[id].diagnosis)
      console.log('');
      rl.question('0. kembali \n', (id) => {
        if(id == 0) {
          this.adminMenu()
        }
      })
    })
  }

  viewRecordPatientByDokter() {
    rl.question('masukkan ID \n', (id) => {
      // this.viewRecordPatient(id)
      id = id - 1
      console.log(this.dataPasien[id].id + " " + this.dataPasien[id].name + " " + this.dataPasien[id].diagnosis)
      console.log('');
      rl.question('0. kembali \n', (id) => {
        if(id == 0) {
          this.dokterMenu()
        }
      })
    })
  }

  removePatientByAdmin() {
    rl.question('masukkan id pasien\n', (id) => {
      id = id - 1
      this.dataPasien.splice(id, 1)
      console.log('data pasien telah dihapus');
      rl.question('0. kembali \n', (pilihan) => {
        if(pilihan  == 0) {
          this.adminMenu()
        }
      })
    })
  }

  showListEmployee() {
    console.log('daftar Pegawai Rumah Maida');
    for(var i = 0; i < this.dataPegawai.length; i++) {
      console.log(this.dataPegawai[i].name +' ' + this.dataPegawai[i].position);
    }
  }

  ViewRecordEmployee() {
    rl.question('Masukkan id \n', (id) => {
      id = id - 1
      console.log(this.dataPegawai[id].name + ' ' + this.dataPegawai[id].position + ' ' + this.dataPegawai[id].username + ' ' + this.dataPegawai[id].password)
      rl.question('0. kembali \n', (id) => {
        this.adminMenu()
      })
    });
  }

  removeEmployeeByAdmin() {
    rl.question('masukkan nama pasien \n', (nama) => {
      for(var i = 0; i < this.dataPegawai.length; i++) {
        if(nama == this.dataPegawai[i].name) {
          this.dataPegawai.splice(i, 1)
          console.log('data pegawai telah dihapus');
          this.adminMenu()
          break
        }
        else {
          this.removeEmployeeByAdmin()
        }
      }
    })
  }

  removePatientByDokter() {
    rl.question('masukkan nama pasien \n', (nama) => {
      for(var i = 0; i < this.dataPasien.length; i++) {
        if(nama == this.dataPasien[i].name) {
          this.dataPasien.splice(i, 1)
          console.log('data pegawai telah dihapus');
          this.dokterMenu()
          break
        }
        else {
          this.removePatientByDokter()
        }
      }
    })
  }

  benarSalah(input) {
    if(input == 1) {
      return true
    }
    else {
      return false
    }
  }
}

var rumah = new Hospital('Maida', 'Jalan Setiabudi', 11, 1)
rumah.createPatience(1, 'wisnu', 'sakit jiwa')
rumah.createPatience(1, 'dharma', 'sakit hati')
rumah.createEmployee('agus', 'dokter', 'aguscute', 'masalah?')
rumah.createEmployee('dedemit', 'admin', 'demit', 'emang')
console.log(rumah.cekPosisi('demit'))
rumah.menu()

module.exports = Hospital
