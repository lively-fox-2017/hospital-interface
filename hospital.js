const rl =  require('readline');
const employees=require('./employee')
const patients=require('./patient')
const Table = require('cli-table');
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'SI Rumah Sakit'
});
// class Hospital {
//   constructor(name, location, employees, patients) {
//     this.name = name
//     this.employees = employees
//     this.patients = patients
//     this.location = location
//   }
// }
class Hospital {
  constructor(user,pass) {
    this.nama='Mistic Hospital';
    this.alamat='jl. Mistic';
    this.phone='01010101';
    this.employees=new employees();
    this.userAktif='';
    this.userAktifAkses='';
    this.aktifAkses='';
    this.aktifIdKaryawan='';
    this.patients = new patients();
  }
  resetScreen() {
    console.log("\x1B[2J");
    // readline.clearScreenDown();
    this.setHeader();
  }
  setHeader(){
    console.log(`Welcome to ${this.nama}`);
    console.log(`${this.alamat}, phone. ${this.phone}`);
    console.log('=======================================');
    if (this.aktifAkses!=='') {
      console.log(`User : ${this.aktifUser} Level : ${this.aktifAkses}`);
    } else
      console.log(`User : - Level= -`);
    console.log('');
  }
  login(){
    this.userAktif='';
    this.userAktifAkses='';
    this.aktifAkses='';
    this.resetScreen();
    readline.question('Masukan Username Anda : ',(uname)=>{
      readline.question('Masukan Password Anda : ',(pass)=>{
        if (this.validasiUser(uname,pass)){
          //console.log(`Welcome, ${uname}. Your acces level is ${this.validasiUser(uname,pass)}`);
          this.resetScreen();
          // this.isLogin=true;
          this.setListMenu();
        } else {
          this.resetScreen();
          console.log('User atau Password anda salah!');
          readline.question(`Tekan Enter untuk melanjutkan `,(select)=>{
            this.login();
          })
        }
      });
    });
  }
  validasiUser(user,pass){
    let dataEmployees=this.employees.dataEmployees;
    for (var i = 0; i < dataEmployees.length; i++) {
      if (user===dataEmployees[i].username && pass===dataEmployees[i].password) {//console.log('adadswds');
        this.aktifAkses=dataEmployees[i].position;
        this.aktifUser=user;
        this.aktifIdKaryawan=dataEmployees[i].id;
        return true;
      }
    }
    return '';
  }
  setListMenu(){
    this.resetScreen();
    if (this.aktifAkses.toUpperCase()=='ADMINISTRATOR') {
      console.log('==Menu Utama==');
      console.log('[1]. Logout');
      console.log('[2]. Hospital');
      console.log('[3]. Karyawan');
      console.log('[4]. Dokter');
      console.log('[5]. Pasien');
      console.log('[6]. Keluar');
      readline.question('Masukan Pilihan Menu : ',(select)=>{
        if (select==1) {
          this.login();
        } else
        if (select==2){
          this.menuHospital();
        } else
        if (select==3){
          this.menuKaryawan();
        } else
        if (select==4){
          this.menuDokter();
        } else
        if (select==5){
          this.menuPasien();
        } else
        if (select==6){
          readline.close();
          // this.keluar();
        } else {
          this.setListMenu();
        }
      });
    } else
    if (this.aktifAkses.toUpperCase()=='DOKTER') {
      console.log('==Menu Utama==');
      console.log('[1]. Logout');
      console.log('[2]. Dokter');
      console.log('[3]. Keluar');
      readline.question('Masukan Pilihan Menu : ',(select)=>{
        if (select==1) {
          this.login();
        } else
        if (select==2){
          this.menuDokter();
        } else
        if (select==3){
          readline.close();
        } else {
          this.setListMenu();
        }
      });
    } else
    if (this.aktifAkses.toUpperCase()=='RESEPSIONIS') {
      console.log('==Menu Utama==');
      console.log('[1]. Logout');
      console.log('[2]. Karyawan');
      console.log('[3]. Pasien');
      console.log('[4]. Keluar');
      readline.question('Masukan Pilihan Menu : ',(select)=>{
        if (select==1) {
          this.login();
        } else
        if (select==2) {
          this.menuKaryawan();
        } else
        if (select==3){
          this.menuPasien();
        } else
        if (select==4){
          readline.close();
        } else {
          this.setListMenu();
        }
      });
    } else
    if (this.aktifAkses.toUpperCase()=='OB') {
      console.log('Kembali Kerja...');
      console.log('==Menu Utama==');
      console.log('[1]. Logout');
      console.log('[2]. Keluar');
      readline.question('Masukan Pilihan Menu : ',(select)=>{
        if (select==1){
          this.login();
        } else
        if (select==2){
          readline.close();
        } else {
          this.setListMenu();
        }
      });
    } else {
      this.resetScreen();
      console.log('Terjadi kesalahan dalam hak akses anda, silahkan hubungi administrator');
      readline.question(`Tekan Enter untuk melanjutkan `,(select)=>{
        this.login();
      })
    }

  }
  menuHospital(){
    this.resetScreen();
    console.log('==Hospital==');
    console.log('[1]. Logout');
    console.log('[2]. Menu Sebelumnya');
    console.log('[3]. Tampil Data');
    console.log('[4]. Edit Data');
    console.log('[5]. Keluar');
    readline.question('Masukan Pilihan Menu : ',(select)=>{
      if (select==1) {
        this.login();
      } else
      if (select==2){
        this.setListMenu();
      } else
      if (select==3){
        //tampil data
        this.resetScreen();
        //console.log('[1]. Kembali');
        console.log('==Hospital==');
        console.log('==Hospital > Tampil Data Hospital==');
        console.log(`=====================================`);
        console.log(`Nama   :${this.nama}`);
        console.log(`Alamat :${this.alamat}`);
        console.log(`Phone  :${this.phone}`);
        console.log('=====================================');
        readline.question('Tekan enter untuk kembali ke menu sebelumnya : ',(select)=>{
          //if (select==1){
            this.menuHospital();
          //}
        })
      } else
      if (select==4){
        this.resetScreen();
        console.log('==Hospital==');
        console.log('==Hospital > Edit Data Hospital==');
        console.log(`=====================================`);
        readline.question('Nama : ',(nama)=>{
          readline.question('Alamat : ',(alamat)=>{
            readline.question('Phone : ',(phone)=>{
              this.nama=nama;
              this.alamat=alamat;
              this.phone=phone;
              console.log('data berhasil disimpan');
              readline.question('Tekan enter untuk kembali ke menu sebelumnya: ',(select)=>{
                this.menuHospital();
              })
            })
          })
        })
      } else
      if (select==5){
        readline.close();
      } else {
        this.menuHospital();
      }
    });
  }
  menuPasien(){
    this.resetScreen();
    // let pasien = new Patient();
    console.log('==Pasien==');
    console.log('[1]. Logout');
    console.log('[2]. Menu Sebelumnya');
    console.log('[3]. Tampil Data');
    console.log('[4]. Tambah Data');
    console.log('[5]. Edit Data');
    console.log('[6]. Hapus Data');
    console.log('[7]. Keluar');
    readline.question('Masukan Pilihan Menu : ',(select)=>{
      if (select==1) {
        this.login();
      } else
      if (select==2){
        this.setListMenu();
      } else
      if (select==3){
        //tampil data
        this.resetScreen();
        console.log('==Pasien==');
        console.log('==Pasien > Tampil Data Pasien==');
        let table = new Table({
          head:['ID','Nama','Diagnosis','ID Dokter'],
          colWidths:[10,50,50,10]
        })
        let dataPatients=this.patients.dataPatients
        for (var i = 0; i < dataPatients.length; i++) {
          table.push([dataPatients[i].id,dataPatients[i].nama,
          dataPatients[i].diagnosis,dataPatients[i].idDokter])
        }
        console.log(table.toString());
        readline.question('Tekan enter untuk kembali ke menu sebelumnya : ',(select)=>{
          this.menuPasien();
        })
      } else
      if (select==4){
        this.resetScreen();
        console.log('==Pasien==');
        console.log('==Pasien > Tambah Data Pasien==');
        // console.log('');
        readline.question('ID        : ',(id)=>{
          readline.question('Nama      : ',(nama)=>{
            readline.question('Diagnosis : ',(diagnosis)=>{
              readline.question('ID Dokter : ',(idDokter)=>{
                if (this.patients.simpanDataPasien(id,nama,diagnosis,idDokter)) {
                  console.log('data berhasil disimpan');
                  readline.question('Tekan enter untuk kembali ke menu sebelumnya: ',(select)=>{
                    this.menuPasien();
                  })
                }
              })
            })
          })
        })
      } else
      if (select==5){
        this.menuPasienEditData();
      } else
      if (select==6){
        this.menuPasienHapusData();
      } else
      if (select==7){
        readline.close();
      } else {
        this.menuPasien();
      }
    });
  }
  menuPasienEditData(){
    this.resetScreen();
    if (this.aktifAkses.toUpperCase()=='DOKTER') {
      console.log('==Dokter==');
    } else {
      console.log('==Pasien==');
    }
    console.log('==Pasien > Edit Data Pasien==');
    console.log(`Masukan ID Data Lama / ketik "skip" untuk kembali ke menu sebelumnya : `);
    readline.question('ID        : ',(oldId)=>{
      if (oldId=='skip') {
        if (this.aktifAkses.toUpperCase()=='DOKTER') {
          this.menuDokter();
        } else {
          this.menuPasien();
        }
      } else {
        let dataPatient=this.patients.cekDataPasien(oldId)
        if (dataPatient.length>0) {
          console.log(`Nama      : ${dataPatient[0].nama}`);
          console.log(`Diagnosis : ${dataPatient[0].diagnosis}`);
          console.log(`ID Dokter : ${dataPatient[0].idDokter}`);
          console.log(``);
          console.log(`Masukan Data Pengganti / ketik "skip" untuk membatalkan : `);
          readline.question('ID Baru        : ',(id)=>{
            if (id=='skip') {
              this.menuPasienEditData();
            } else {
              readline.question('Nama Baru      : ',(nama)=>{
                readline.question('Diagnosis Baru : ',(diagnosis)=>{
                  readline.question('ID Dokter      : ',(idDokter)=>{
                    if (this.patients.editDataPasien(oldId,id,nama,diagnosis,idDokter)) {
                      console.log('data berhasil disimpan!');
                      readline.question('Tekan enter untuk edit data lainnya / ketik "skip" untuk kembali ke menu sebelumnya: ',(select)=>{
                        if (select=='skip') {
                          if (this.aktifAkses.toUpperCase()=='DOKTER') {
                            this.menuDokter();
                          } else {
                            this.menuPasien();
                          }
                        } else {
                          this.menuPasienEditData();
                        }
                      })
                    } else this.menuPasienEditData();
                  })
                })
              })
            }
          })
        } else this.menuPasienEditData();
      }
    });
  }
  menuPasienHapusData(){
    this.resetScreen();
    console.log('==Pasien==');
    console.log('==Pasien > Hapus Data Pasien==');
    console.log(`Masukan ID Data Lama / ketik "skip" untuk kembali ke menu sebelumnya : `);
    readline.question('ID        : ',(oldId)=>{
      if (oldId=='skip') {
        this.menuPasien();
      } else {
        let dataPatient=this.patients.cekDataPasien(oldId);
        if (dataPatient.length>0) {
          console.log(`Nama      : ${dataPatient[0].nama}`);
          console.log(`Diagnosis : ${dataPatient[0].diagnosis}`);
          console.log(`ID Dokter : ${dataPatient[0].idDokter}`);
          readline.question('Anda yakin akan mau menghapus data ini? tekan y untuk melanjutkan atau tekan enter untuk membatalkan: ',(answer)=>{
            if (answer=='y') {
              if (this.patients.deleteDataPasien(oldId)) {
                console.log('data berhasil dihapus!');
                readline.question('Tekan enter untuk menghapus data lainnya / ketik "skip" untuk kembali ke menu sebelumnya: ',(select)=>{
                  if (select=='skip') {
                    this.menuPasien();
                  } else {
                    this.menuPasienHapusData();
                  }
                })
              } else this.menuPasienHapusData();
            } else this.menuPasienHapusData();
          })
        } else this.menuPasienHapusData();
      }
    });
  }
  menuKaryawan(){
    this.resetScreen();
    console.log('==Karyawan==');
    console.log('[1]. Logout');
    console.log('[2]. Menu Sebelumnya');
    console.log('[3]. Tampil Data');
    console.log('[4]. Tambah Data');
    console.log('[5]. Edit Data');
    console.log('[6]. Hapus Data');
    console.log('[7]. Keluar');
    readline.question('Masukan Pilihan Menu : ',(select)=>{
      if (select==1) {
        this.login();
      } else
      if (select==2){
        this.setListMenu();
      } else
      if (select==3){
        //tampil data
        this.resetScreen();
        console.log('==Karyawan==');
        console.log('==Karyawan > Tampil Data Karyawan==');
        let table = new Table({
          head:['ID','Nama','Position','Username'],
          colWidths:[10,50,25,20]
        })
        let dataEmployees=this.employees.dataEmployees;
        for (var i = 0; i < dataEmployees.length; i++) {
          table.push([dataEmployees[i].id,dataEmployees[i].nama,
          dataEmployees[i].position,dataEmployees[i].username])
        }
        console.log(table.toString());
        readline.question('Tekan enter untuk kembali ke menu sebelumnya : ',(select)=>{
          this.menuKaryawan();
        })
      } else
      if (select==4){
        this.resetScreen();
        console.log('==Karyawan==');
        console.log('==Karyawan > Tambah Data Karyawan==');
        // console.log('');
        readline.question('ID       : ',(id)=>{
          readline.question('Nama     : ',(nama)=>{
            readline.question('Position : ',(position)=>{
              readline.question('Username : ',(username)=>{
                readline.question('Password : ',(password)=>{
                  if (this.employees.simpanDataKaryawan(id,nama,position,username,password)) {
                    console.log('data berhasil disimpan');
                    readline.question('Tekan enter untuk kembali ke menu sebelumnya: ',(select)=>{
                      this.menuKaryawan();
                    })
                  }
                })
              })
            })
          })
        })
      } else
      if (select==5){
        this.menuKaryawanEditData();
      } else
      if (select==6){
        this.menuKaryawanHapusData();
      } else
      if (select==7){
        readline.close();
      } else {
        this.menuKaryawan();
      }
    });
  }
  menuKaryawanEditData(){
    this.resetScreen();
    console.log('==Karyawan==');
    console.log('==Karyawan > Edit Data Karyawan==');
    console.log(`Masukan ID Data Lama / ketik "skip" untuk kembali ke menu sebelumnya : `);
    readline.question('ID       : ',(oldId)=>{
      if (oldId=='skip') {
        this.menuKaryawan();
      } else {
        let dataEmployee=this.employees.cekDataKaryawan(oldId);
        if (dataEmployee.length>0) {
          console.log(`Nama     : ${dataEmployee[0].nama}`);
          console.log(`position : ${dataEmployee[0].position}`);
          console.log(`username : ${dataEmployee[0].username}`);
          console.log(`password : ${dataEmployee[0].password}`);
          console.log('');
          console.log(`Masukan Data Pengganti / ketik "skip" untuk membatalkan : `);
          readline.question('ID Baru        : ',(id)=>{
            if (id=='skip') {
              this.menuKaryawanEditData();
            } else {
              readline.question('Nama Baru      : ',(nama)=>{
                readline.question('Position Baru  : ',(position)=>{
                  readline.question('Username Baru  : ',(username)=>{
                    readline.question('Pasword Baru   : ',(password)=>{
                      if (this.employees.editDataKaryawan(oldId,id,nama,position,username,password)) {
                        console.log('data berhasil disimpan!');
                        readline.question('Tekan enter untuk edit data lainnya / ketik "skip" untuk kembali ke menu sebelumnya: ',(select)=>{
                          if (select=='skip') {
                            this.menuKaryawan();
                          } else {
                            this.menuKaryawanEditData();
                          }
                        })
                      } else this.menuKaryawanEditData();
                    })
                  })
                })
              })
            }
          })
        } else this.menuKaryawanEditData();
      }
    });
  }
  menuKaryawanHapusData(){
    this.resetScreen();
    console.log('==Karyawan==');
    console.log('==Karyawan > Hapus Data Karyawan==');
    console.log(`Masukan ID Data Lama / ketik "skip" untuk kembali ke menu sebelumnya : `);
    readline.question('ID       : ',(oldId)=>{
      if (oldId=='skip') {
        this.menuKaryawan();
      } else {
        let dataEmployee=this.employees.cekDataKaryawan(oldId);
        if (dataEmployee.length>0) {
          console.log(`Nama     : ${dataEmployee[0].nama}`);
          console.log(`position : ${dataEmployee[0].position}`);
          console.log(`username : ${dataEmployee[0].username}`);
          console.log(`password : ${dataEmployee[0].password}`);
          readline.question('Anda yakin akan mau menghapus data ini? tekan y untuk melanjutkan atau tekan enter untuk membatalkan: ',(answer)=>{
            if (answer=='y') {
              if (this.employees.deleteDataKaryawann(oldId)) {
                console.log('data berhasil dihapus!');
                readline.question('Tekan enter untuk menghapus data lainnya / ketik "skip" untuk kembali ke menu sebelumnya: ',(select)=>{
                  if (select=='skip') {
                    this.menuKaryawan();
                  } else {
                    this.menuKaryawanHapusData();
                  }
                })
              } else this.menuKaryawanHapusData();
            } else this.menuKaryawanHapusData();
          })
        } else this.menuKaryawanHapusData();
      }
    });
  }
  menuDokter(){
    this.resetScreen();
    console.log('==Dokter==');
    console.log('[1]. Logout');
    console.log('[2]. Menu Sebelumnya');
    console.log('[3]. Tampil Data Pasien');
    console.log('[4]. Edit Data Pasien');
    console.log('[5]. Keluar');
    readline.question('Masukan Pilihan Menu : ',(select)=>{
      if (select==1) {
        this.login();
      } else
      if (select==2){
        this.setListMenu();
      } else
      if (select==3){
        //tampil data
        this.resetScreen();
        console.log('==Dokter==');
        console.log('==Dokter > Tampil Data Pasien==');
        let dataPatients=this.patients.dataPatients
        if (this.aktifAkses.toUpperCase()!=='ADMINISTRATOR') {
          let table = new Table({
            head:['ID','Nama','Diagnosis','Id Dokter'],
            colWidths:[10,50,25,10]
          })
          for (var i = 0; i < dataPatients.length; i++) {
            if (dataPatients[i].idDokter==this.aktifIdKaryawan) {
              table.push([dataPatients[i].id,dataPatients[i].nama,
              dataPatients[i].diagnosis,dataPatients[i].idDokter])
            }
          }
          console.log(table.toString());
        } else
        {
          let table = new Table({
            head:['ID','Nama','Diagnosis','Id Dokter'],
            colWidths:[10,50,25,10]
          })
          for (var i = 0; i < dataPatients.length; i++) {
            table.push([dataPatients[i].id,dataPatients[i].nama,
            dataPatients[i].diagnosis,dataPatients[i].idDokter])
          }
          console.log(table.toString());
        }
        readline.question('Tekan enter untuk kembali ke menu sebelumnya : ',(select)=>{
          this.menuDokter();
        })
      } else
      if (select==4){
        this.menuPasienEditData();
      } else
      if (select==5){
        readline.close();
      } else {
        this.menuDokter();
      }
    });
  }
}
let hospital = new Hospital();

hospital.login();
module.exports = Hospital
