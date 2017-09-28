"use strict"

var Employee = require('./employee')
var Patient = require('./patient')

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fs = require('fs');

class Hospital{
  constructor(){
    this.name = 'RS Hacktiv8 Pondok Indah';
    this.employees = JSON.parse(fs.readFileSync('employees.json', 'utf8'));
    this.patients = JSON.parse(fs.readFileSync('patient.json','utf8'));
    this.location = 'Jl. Sultan Iskandar Muda No.7, RT.5/RW.9, Kby. Lama Sel., Kby. Lama, \nKota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240, Indonesia';
    this.user = '';
    this.id = ''

  }

  main(){
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log('-------------SELAMAT DATANG--------------');
    console.log(`Nama Rumah Sakit : ${this.name} `);
    console.log(`Alamat : ${this.location} `);
    console.log('-----------------------------------------');
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n');
    this.login();
  }

  login(){
    let login = false;
    console.log('Silahkan Login Untuk melanjutkan ke Aplikasi');
    rl.question('Masukan username anda: ', (username)=> {
      for(let i = 0; i < this.employees.length; i++){
        if(username === this.employees[i].username){
          this.id = this.employees[i].id
          this.password(this.employees[i]);
          login = true;
          break;
        }
      }
      if(login === false){
        console.log('Anda belum terdaftar');
        this.login();
      }
    });
  }

  password(inputpassword){
    rl.question('Masukan password : ', (password) => {
      if(password === inputpassword.password){
        console.log('login berhasil\n');
        this.user = inputpassword;
        this.menu();
      } else {
        console.log('password salah');
        this.login()
      }

    });
  }

  logout(){
    this.login();
  }

  keluar(){
    rl.close();
  }

  menu(){
    console.log('\n');
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log('-------------MENU UTAMA--------------');
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');

    if(this.user.position === 'administrator'){
      // console.log(this.id);
      console.log('1. List Karyawan');
      console.log('2. Tambah Karyawan');
      console.log('3. Hapus Pasien');
      console.log('4. Logout');
      console.log('5. Keluar Aplikasi ');

      this.menuAdmin();
    } else if(this.user.position === 'doctor'){
      console.log('1. Daftar Pasien');
      console.log('2. Lihat Rekam Medis Pasien');
      console.log('3. Tambah Pasien');
      console.log('4. Hapus Pasien');
      console.log('5. Logout');
      console.log('6. Keluar Aplikasi');
      this.menuDoctor();
    } else if(this.user.position === 'office boy'){
      console.log('1. Logout');
      console.log('2 Keluar Aplikasi');
      this.menuOB()
    }
  }

  // ADMIN
  menuAdmin() {

    rl.question('\nSilahkan Pilih Menu: ' ,(pilihan) => {
      switch (pilihan){
        case '1':
          console.log('\n\n-----------Menu Daftar Karyawan-----------');
          this.daftarKaryawan();
          break;
        case '2':
          console.log('\n\n-----------Menu Tambah Karyawan-----------');
          this.tambahKaryawan();
          break;
        case '3':
          console.log('\n\n-----------Menu Hapus Karyawan-----------');
          this.hapusKaryawan();
          break;
        case '4':
          this.logout();
          break;
        case '5':
          this.keluar();
          break;
        default:
          console.log('Pilih 1-5');
          this.menu();
      }
    })
  }

  daftarKaryawan(){
    console.log('------------------------------------------------');
    console.log('Daftar Karyawan RS Hacktiv8 Pondok Indah');
    for(let i = 0; i < this.employees.length; i++){
      let arr = [];
      arr[i] =   [this.employees[i].id, this.employees[i].username, this.employees[i].position]
      console.log(arr[i]);
    }
    this.menu();
  }

  tambahKaryawan(){
    console.log('------------------------------------------------');
    console.log('Tambah Karyawan RS Hacktiv8 Pondok Indah');
    let position = '';
    rl.question('Masukan id: ', (id)=> {
      rl.question('Masukan username : ' ,(username) => {
        rl.question('Masukan password : ', (password)=>{
          rl.question('Masukan position (1: administrator, 2: doctor, 3: office boy) *Pilih Nomor  : ', (position)=>{
            switch(position){
              case '1': position = 'administrator'; break;
              case '2': position = 'doctor'; break;
              case '3': position = 'office boy'; break;
              }

              let addEmployee = new Employee(id, username, password, position);
              this.employees.push(addEmployee)
              fs.writeFile('employees.json', JSON.stringify(this.employees),(err)=>{
                if(!err) {
                  console.log('berhasil disimpan');
                }
              })
              this.menu();
          })
        })
      })
    })
  }

  hapusKaryawan(){
    // console.log(this.employees[1]);
    console.log('------------------------------------------------');
    console.log('Hapus Karyawan RS Hacktiv8 Pondok Indah');
    rl.question('Masukan ID Karyawan yang akan dihapus: ', (id) => {
      // console.log(this.id);
      for(let i = 0; i < this.employees.length; i++){
        if(this.employees[i].id === id && this.employees[i] !== this.id){
          this.employees.splice(i,1)
          this.menu();
        }
      }
    })

  }


  // DOCTOR

  menuDoctor() {
    rl.question('Pilih Menu: ' ,(pilihan) => {
      switch (pilihan){
        case '1':
          console.log('\n\n-----------Daftar Pasien-----------');
          this.daftarPasien();
          break;
        case '2':
          console.log('\n\n-----------Lihat Pasien-----------');
          this.lihatPasien();
          break;
        case '3':
          console.log('\n\n-----------Tambah Pasien-----------');
          this.tambahPasien();
          break;
        case '4':
          console.log('\n\n-----------Hapus Pasien-----------');
          this.hapusPasien();
          break;
        case '5':
          this.logout();
          break;
        case '6':
          this.keluar();
          break;
        default:
          console.log('Pilih 1-6');
          this.menu();
      }
    })
  }

  daftarPasien(){
    for(let i = 0; i < this.patients.length; i++){
      let arr =[];
      arr[i] = [this.patients[i].id, this.patients[i].name, this.patients[i].diagnosis];
      console.log(arr[i]);
    }
    this.menu();
  }

  lihatPasien(){
    let pasien = false;
    rl.question('Masukan ID Pasien : ',(id)=>{
      for(let i = 0; i < this.patients.length; i++){
        if(id === this.patients[i].id){
          pasien = true;
          console.log('\n\n-----------------------------------');
          console.log('-----------------------------------');
          console.log('ID Pasien : ' +this.patients[i].id);
          console.log('Nama Pasien : ' +this.patients[i].name);
          console.log('Diagnosis : ' +this.patients[i].diagnosis);
          console.log('-----------------------------------');
          console.log('-----------------------------------');
          // console.log([this.patients[i].id, this.patients[i].name, this.patients[i].diagnosis]);
          this.menu();
          break;
        }
      }
      if(pasien === false){
        console.log('Pasien tidak ditemukan');
        this.menu();
      }
    });

  }

  tambahPasien(){
    let id = ''
    let name = ''
    let diagnosis = ''
    rl.question('Masukan ID Pasien : ',(id) => {
      rl.question('Masukan Nama Pasien : ',(name) => {
        rl.question('Masukan Diagnosis : ',(diagnosis) => {
          let obj = {
            id : id,
            name : name,
            diagnosis: diagnosis
          }

          let pasien = new Patient(id,name,diagnosis);
          this.patients.push(pasien);
          fs.writeFile('patient.json',JSON.stringify(this.patients),(err)=>{
          })
          console.log('Tambah pasien berhasil');
          this.menu()
        })
      })
    })
  }

  hapusPasien(){
    console.log('------------------------------------------------');
    console.log('Hapus Pasien RS Hacktiv8 Pondok Indah');
    rl.question('Masukan ID Pasien yang akan dipulangkan: ', (id) => {
      // console.log(this.id);
      for(let i = 0; i < this.patients.length; i++){
        if(this.patients[i].id === id){
          this.patients.splice(i,1)
          this.menu();
        }
      }
    })

  }

  // OFFICE BOY
  menuOB(){
    rl.question('Pilih Menu: ' ,(pilihan) => {
        switch (pilihan){
          case '1':
            this.logout()
            break;
          case '2':
            this.keluar();
            break;
          default:
            this.menu();
        }
      })
  }



}



let rs = new Hospital();
rs.main();
// console.log(rs.employees);
