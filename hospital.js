const fs = require('fs');
const Employee = require('./employee');
const Patient = require('./patient');
const readline = require('readline');
const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout,
});

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
  }
  home(){
    console.log(`|----------------------------------------------------------------------|`);
    console.log(`|               Welcome to : ${this.name} Hospital                 |`);
    console.log(`|                               ${this.location}                                |`);
    console.log(`|----------------------------------------------------------------------|`);
    this.inputUsername();
  }

  inputUsername(){
    rl.question(` Please input your username : `, (username) => {
      this.cekUsername(username)
    });
  }
  cekUsername(username){
    let cekUsername = []
    for (var i = 0; i < this.employees.length; i++) {
      if(username == this.employees[i].username){
        cekUsername.push(this.employees[i]);
      }
    }
    if(cekUsername.length > 0){
      this.inputPassword(cekUsername);
    } else {
      this.inputUsername();
    }
  }

  inputPassword(username){
    rl.question(` Please input your password : `, (password) => {
      this.authentication(username, password)
    })
  }

  authentication(username, password){
    let dataUser = username
    if(password == dataUser[0].password){
      if(dataUser[0].position == 'admin'){
        console.log(` Welcome, ${dataUser[0].name}. Your access level is: ADMINISTRATOR \n`);
        admin.menuAdmin();
        this.checkAnswer()
      } else if(dataUser[0].position == 'dokter'){
        console.log(` Welcome, ${dataUser[0].name}. Your access level is: DOCTOR \n`);
        admin.menuDoctor();
        this.checkAnswer()
      } else if(dataUser[0].position == 'resepsionis'){
        console.log(` Welcome, ${dataUser[0].name}. Your access level is: RECEPTIONISTS \n`);
        admin.menuAdmin();
      } else if(dataUser[0].position == 'ob'){
        admin.menuOB()
        this.checkAnswer();
      }
    } else {
      this.inputPassword(dataUser);
    }
  }

  checkAnswer(){
    console.log(`|----------------------------------------------------------------------|`);
    rl.question('Silahkan Pilih: ', (input)=>{
      if(input==1){
        console.log(this.patients)
        admin.menuAdmin();
        this.checkAnswer();
      }else if(input==2){
        this.detilPasien();
      }else if(input==3){
        this.tambahPasien()
      }else if(input==4){
        this.hapusPasien()
      }else if (input==5){
        console.log(this.employees)
        admin.menuAdmin()
        this.checkAnswer();
      }else if(input==6){
        this.tambahPegawai()
      }else if(input==7){
        this.hapusPegawai()
      }else if(input=='x'){
        rl.close();
      }else if (input=='list') {
        this.list()
      }else if (input=='detail') {
        this.detilPasiendokter()
      }else {
        console.log('Perintah Tidak Ditemukan');
        this.checkAnswer()
      }
    })
  }

  list(){
    console.log(this.patients)
    admin.menuDoctor()
    this.checkAnswer();
  }
  detilPasien() {
    rl.question('Masukkan Pasien ID: ', (input) => {
      console.log(this.patients[input-1]);
      rl.question('Klik enter untuk kembali: ', (input) => {
        admin.menuAdmin();
        this.checkAnswer();
      })

    })
  }

  detilPasiendokter() {
    rl.question('Masukkan Pasien ID: ', (input) => {
      console.log(this.patients[input-1]);
      rl.question('Klik enter untuk kembali: ', (input) => {
        admin.menuDoctor()
        this.checkAnswer();
      })
    })
  }

  tambahPasien(){
    rl.question('Tambah Pasien. Masukkan Nama: ',(name)=>{
      rl.question('Masukkan Penyakit: ', (input)=>{
        let lastId = this.patients[this.patients.length-1].id
        let increment = lastId + 1
        let new_patient = new Patient(increment,name,input)
        this.patients.push(new_patient)
        console.log(`\n\r ${name} sudah ditambahkan ke pasien`);
        admin.menuAdmin();
        this.checkAnswer();
      })
    })
  }


  hapusPasien() {
    rl.question('Masukkan Pasien ID: ', (input) => {
      this.patients.splice(input-1,1)
      console.log(`Pasien ${input} Berhasil Dihapus`);
      admin.menuAdmin();
      this.checkAnswer();
    })
  }

  tambahPegawai(){
    rl.question('Tambah Pegawai Baru. Masukkan ID: ',(id)=>{
      rl.question('Masukkan Nama: ',(name)=>{
        rl.question('Posisi: ', (position)=>{
          rl.question('Username: ', (username)=>{
            rl.question('Password: ', (password)=>{
              let new_Employee = new Employee(id,name,position,username,password)
              this.employees.push(new_Employee)
              console.log(`\n\r ${name} Sudah ditambahkan ke pegawai`);
              admin.menuAdmin()
              this.checkAnswer();
            })
          })
        })
      })
    })
  }

  hapusPegawai() {
    rl.question('Masukkan ID Pegawai: ', (input) => {
      this.employees.splice(input-1,1)
      console.log(`Pegawai ${input} Berhasil Dihapus`);
      admin.menuAdmin()
      this.checkAnswer();
    })
  }

}

let arr_employees = []
let admin = new Employee(1, 'kautzar', 'admin', 'admin', 'admin')
let dokter = new Employee(2, 'kautzar', 'dokter', 'dokter', 'dokter')
let resepsionis = new Employee(3, 'kautzar', 'resepsionis', 'resepsionis', 'resepsionis')
let ob = new Employee(4, 'Yansi', 'ob', 'ob', 'ob')

arr_employees.push(admin)
arr_employees.push(dokter)
arr_employees.push(resepsionis)
arr_employees.push(ob)

let arr_patients = []
let patients1 = new Patient(1, 'Hari', 'Demam')
let patients2 = new Patient(2, 'Prana', 'Mimisan')
let patients3 = new Patient(3, 'Nathan', 'Tiris')
let patients4 = new Patient(4, 'Chandra', 'koreng')

arr_patients.push(patients1)
arr_patients.push(patients2)
arr_patients.push(patients3)
arr_patients.push(patients4)

let hospital = new Hospital('RS. Muhammadiyah', 'Jakarta', arr_employees, arr_patients)
hospital.home()

module.exports = Hospital
