const rl =  require('readline');
const employee=require('./employee')
const patient=require('./patient')
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
    this.employee=new employee();
    this.userAktif='';
    this.userAktifAkses='';
    this.aktifAkses='';
    this.aktifIdKaryawan='';
    this.pasien = new patient();
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
    for (var i = 0; i < this.employee.username.length; i++) {
      if (user===this.employee.username[i] && pass===this.employee.password[i]) {//console.log('adadswds');
        this.aktifAkses=this.employee.akses[i];
        this.aktifUser=user;
        this.aktifIdKaryawan=this.employee.id[i];
        return true;
      }
    }
    return '';
  }
  setListMenu(){
    this.resetScreen();
    if (this.aktifAkses=='ADMIN') {
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
    }
    if (this.aktifAkses=='DOKTER') {
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
    }
    if (this.aktifAkses=='RESEPSIONIS') {
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
    }
    if (this.aktifAkses=='OB') {
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
        // console.log(`=====================================`);
        // for (var i = 0; i < this.pasien.id.length; i++) {
        //   console.log(`ID        : ${this.pasien.id[i]}`);
        //   console.log(`Nama      : ${this.pasien.nama[i]}`);
        //   console.log(`Diagnosis : ${this.pasien.diagnosis[i]}`);
        //   console.log(`ID Dokter : ${this.pasien.idDokter[i]}`);
        //   console.log(`=====================================`);
        // }
        let table = new Table({
          head:['ID','Nama','Diagnosis','ID Dokter'],
          colWidths:[10,50,50,10]
        })
        for (var i = 0; i < this.pasien.id.length; i++) {
          table.push([this.pasien.id[i],this.pasien.nama[i],
          this.pasien.diagnosis[i],this.pasien.idDokter[i]])
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
                if (this.pasien.simpanDataPasien(id,nama,diagnosis,idDokter)) {
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
    // let pasien = new Patient();
    console.log('==Pasien==');
    console.log('==Pasien > Edit Data Pasien==');
    console.log(`Masukan ID Data Lama : `);
    readline.question('ID : ',(oldId)=>{
      if (this.pasien.cekDataPasien(oldId).length>0) {
        console.log(`Nama      : ${this.pasien.cekDataPasien(oldId)[1]}`);
        console.log(`Diagnosis : ${this.pasien.cekDataPasien(oldId)[2]}`);
        console.log(`ID Dokter : ${this.pasien.cekDataPasien(oldId)[3]}`);
        console.log(``);
        console.log(`Masukan Data Pasien Pengganti : `);
        readline.question('ID Baru        : ',(id)=>{
          readline.question('Nama Baru      : ',(nama)=>{
            readline.question('Diagnosis Baru : ',(diagnosis)=>{
              readline.question('ID Dokter      : ',(idDokter)=>{
                if (this.pasien.editDataPasien(oldId,id,nama,diagnosis,idDokter)) {
                  console.log('data berhasil disimpan!');
                  readline.question('Tekan enter untuk kembali ke menu sebelumnya: ',(select)=>{
                    this.menuPasien();
                  })
                } else this.menuPasienEditData();
              })
            })
          })
        })
      } else this.menuPasienEditData();
    });
  }
  menuPasienHapusData(){
    this.resetScreen();
    // let pasien = new Patient();
    console.log('==Pasien==');
    console.log('==Pasien > Hapus Data Pasien==');
    console.log(`Masukan ID Data Lama : `);
    readline.question('ID : ',(oldId)=>{
      if (this.pasien.cekDataPasien(oldId).length>0) {
        console.log(`Nama      : ${this.pasien.cekDataPasien(oldId)[1]}`);
        console.log(`Diagnosis : ${this.pasien.cekDataPasien(oldId)[2]}`);
        console.log(`ID Dokter : ${this.pasien.cekDataPasien(oldId)[3]}`);
        readline.question('Anda yakin akan mau menghapus data ini? tekan y untuk melanjutkan atau tekan enter untuk membatalkan: ',(answer)=>{
          if (answer=='y') {
            if (this.pasien.deleteDataPasien(oldId)) {
              console.log('data berhasil dihapus!');
              readline.question('Tekan enter untuk kembali ke menu sebelumnya: ',(select)=>{
                this.menuPasien();
              })
            } else this.menuPasienHapusData();
          } else this.menuPasienHapusData();
        })
      } else this.menuPasienHapusData();
    });
  }
  menuKaryawan(){
    this.resetScreen();
    // let pasien = new Patient();
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
        // console.log(`=====================================`);
        // for (var i = 1; i < this.employee.id.length; i++) {
        //   console.log(`ID       : ${this.employee.id[i]}`);
        //   console.log(`Nama     : ${this.employee.nama[i]}`);
        //   console.log(`Position : ${this.employee.position[i]}`);
        //   console.log(`Username : ${this.employee.username[i]}`);
        //   console.log(`Password : ${this.employee.password[i]}`);
        //   console.log(`Akses    : ${this.employee.akses[i]}`);
        //   console.log(`=====================================`);
        // }
        let table = new Table({
          head:['ID','Nama','Position','Username','Akses'],
          colWidths:[10,50,25,20,20]
        })
        for (var i = 0; i < this.employee.id.length; i++) {
          table.push([this.employee.id[i],this.employee.nama[i],
          this.employee.position[i],this.employee.username[i],this.employee.akses[i]])
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
                  readline.question('Akses    : ',(akses)=>{
                    if (this.employee.simpanDataKaryawan(id,nama,position,username,password,akses.toUpperCase())) {
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
    // let pasien = new Patient();
    console.log('==Karyawan==');
    console.log('==Karyawan > Edit Data Karyawan==');
    console.log(`Masukan ID Data Lama : `);
    readline.question('ID       : ',(oldId)=>{
      if (this.employee.cekDataKaryawan(oldId).length>0) {
        console.log(`Nama     : ${this.employee.cekDataKaryawan(oldId)[1]}`);
        console.log(`position : ${this.employee.cekDataKaryawan(oldId)[2]}`);
        console.log(`username : ${this.employee.cekDataKaryawan(oldId)[3]}`);
        console.log(`password : ${this.employee.cekDataKaryawan(oldId)[4]}`);
        console.log(`akses    : ${this.employee.cekDataKaryawan(oldId)[5]}`);
        console.log('');
        console.log(`Masukan Data Pengganti : `);
        readline.question('ID Baru        : ',(id)=>{
          readline.question('Nama Baru      : ',(nama)=>{
            readline.question('Position Baru  : ',(position)=>{
              readline.question('Username Baru  : ',(username)=>{
                readline.question('Pasword Baru   : ',(password)=>{
                  readline.question('Akses Baru     : ',(akses)=>{
                    if (this.employee.editDataKaryawan(oldId,id,nama,position,username,password,akses)) {
                      console.log('data berhasil disimpan!');
                      readline.question('Tekan enter untuk kembali ke menu sebelumnya: ',(select)=>{
                        this.menuKaryawan();
                      })
                    } else this.menuKaryawanEditData();
                  })
                })
              })
            })
          })
        })
      } else this.menuKaryawanEditData();
    });
  }
  menuKaryawanHapusData(){
    this.resetScreen();
    // let pasien = new Patient();
    console.log('==Karyawan==');
    console.log('==Karyawan > Hapus Data Karyawan==');
    console.log(`Masukan ID Data Lama : `);
    readline.question('ID : ',(oldId)=>{
      if (this.employee.cekDataKaryawan(oldId).length>0) {
        console.log(`Nama     : ${this.employee.cekDataKaryawan(oldId)[1]}`);
        console.log(`position : ${this.employee.cekDataKaryawan(oldId)[2]}`);
        console.log(`username : ${this.employee.cekDataKaryawan(oldId)[3]}`);
        console.log(`password : ${this.employee.cekDataKaryawan(oldId)[4]}`);
        console.log(`akses    : ${this.employee.cekDataKaryawan(oldId)[5]}`);
        readline.question('Anda yakin akan mau menghapus data ini? tekan y untuk melanjutkan atau tekan enter untuk membatalkan: ',(answer)=>{
          if (answer=='y') {
            if (this.employee.deleteDataKaryawann(oldId)) {
              console.log('data berhasil dihapus!');
              readline.question('Tekan enter untuk kembali ke menu sebelumnya: ',(select)=>{
                this.menuKaryawan();
              })
            } else this.menuKaryawanHapusData();
          } else this.menuKaryawanHapusData();
        })
      } else this.menuKaryawanHapusData();
    });
  }
  menuDokter(){
    this.resetScreen();
    // let pasien = new Patient();
    console.log('==Dokter==');
    console.log('[1]. Logout');
    console.log('[2]. Menu Sebelumnya');
    console.log('[3]. Tampil Data Pasien');
    console.log('[4]. Keluar');
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
        console.log(`=====================================`);
        if (this.aktifAkses!=='ADMIN') {
          // for (var i = 0; i < this.pasien.id.length; i++) {
          //   // console.log(this.pasien.idDokter+`==`+this.aktifIdKaryawan);
          //   if (this.pasien.idDokter[i]==this.aktifIdKaryawan) {
          //     console.log(`ID        : ${this.pasien.id[i]}`);
          //     console.log(`Nama      : ${this.pasien.nama[i]}`);
          //     console.log(`Diagnosis : ${this.pasien.diagnosis[i]}`);
          //     console.log(`ID Dokter : ${this.pasien.idDokter[i]}`);
          //     console.log(`=====================================`);
          //   }
          // }
          let table = new Table({
            head:['ID','Nama','Diagnosis','Id Dokter'],
            colWidths:[10,50,25,10]
          })
          for (var i = 0; i < this.pasien.id.length; i++) {
            table.push([this.pasien.id[i],this.pasien.nama[i],
            this.pasien.diagnosis[i],this.pasien.idDokter[i]])
          }
          console.log(table.toString());
        } else
        {
          // for (var i = 0; i < this.pasien.id.length; i++) {
          //   console.log(`ID        : ${this.pasien.id[i]}`);
          //   console.log(`Nama      : ${this.pasien.nama[i]}`);
          //   console.log(`Diagnosis : ${this.pasien.diagnosis[i]}`);
          //   console.log(`ID Dokter : ${this.pasien.idDokter[i]}`);
          //   console.log(`=====================================`);
          // }
          let table = new Table({
            head:['ID','Nama','Diagnosis','Id Dokter'],
            colWidths:[10,50,25,10]
          })
          for (var i = 0; i < this.pasien.id.length; i++) {
            table.push([this.pasien.id[i],this.pasien.nama[i],
            this.pasien.diagnosis[i],this.pasien.idDokter[i]])
          }
          console.log(table.toString());
        }
        readline.question('Tekan enter untuk kembali ke menu sebelumnya : ',(select)=>{
          this.menuDokter();
        })
      } else
      if (select==4){
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
