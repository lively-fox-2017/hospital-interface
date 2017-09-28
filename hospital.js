let Employee = require('./employee');
let Patient = require('./patient');
const readline = require('readline');
let Table = require('cli-table2');
// let table = new Table();
let table = new Table({
  head: ['ID', 'Nama', 'Posisi']
, colWidths: [10, 20, 20]
});
let table2 = new Table({
  head: ['ID', 'Nama', 'Diagnosis']
, colWidths: [10, 30, 40]
});
let table3 = new Table({
  head: ['ID', 'Nama', 'Diagnosis']
, colWidths: [10, 30, 40]
});
let fs = require('fs');
let stringAdmin = JSON.parse(fs.readFileSync("admin.json"));
let stringPatient = JSON.parse(fs.readFileSync("patient.json"));
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let input = process.argv;
class Hospital {
  constructor() {
    // this.name = name
    this.employees = [];
    this.patients = []
    // this.location = location
  }
  cekEmploye(){
    return this.employees;
  }
  static login(){
    let cekNama,cekPass;
    console.log('Welcome to Mistic Hospital\n----------------------------');
    rl.question('Please enter your name: ', (nama) => {
      cekNama=nama;
        rl.question('Please enter your password: ',(pass)=>{
         cekPass=pass;
         let user_exist = false;
         stringAdmin.forEach((validasi)=> {
          if(cekNama === validasi.username && cekPass === validasi.password){
            user_exist = true;
            if(validasi.position==='Doctor'){
              return this.dataDokter();
            }else if(validasi.position==='Admin'){
              return this.dataInduk();
            }else if(validasi.position==='OB'){
              return this.dataOB();
            }
          }
          // console.log('Apapun');
                    
          }, this);
          if(!user_exist){
          return this.login();
          }
        });     
    });
  }


  //HACK AKSES OFFICE BOY
  static dataOB(){
    console.log('--------------------------');
    console.log(`     Welcome Office Boy   `);
    console.log('--------------------------');
    console.log('9. Logout');
    rl.question('What would you like to do ',(Ob)=>{
      if(Ob==='9'){
        this.login();
      } else{
        console.log('Coba lagi dong!!');
        this.dataOB();
      }
    })
  }
  //HACK AKSES ADMINISTRATOR
  static dataInduk(){
    console.log('--------------------------');
    console.log(       `Welcome Admin`      );
    console.log('--------------------------');
    console.log('1. Add Employe');
    console.log('2. Add Patient');
    console.log('3. Remove Employe');
    console.log('4. Remove Patient');
    console.log('5. List Employe');
    console.log('6. List Patient');
    console.log('7. Record Employe');
    console.log('8. Record Patient');
    console.log('9. Logout');
    rl.question('What would you like to do ',(input)=>{
      if(input==='1'){
       this.addEmploye()
      } else if(input==='2'){
        this.addPatientAdmin();
      } else if(input ==='3') {
        this.removeEmploye();
      }else if(input==='4'){
        this.removePatientAdmin();
      } else if(input ==='5') {
        this.listEmploye();
      }else if(input==='6'){
        this.listPatientsAdmin();
      } else if(input ==='7') {
        this.recordEmploye();
      }else if(input==='8'){
        this.recordPatientAdmin();
      }else if(input ==='9') {
        this.login();
      }
      else {
        this.dataInduk();
      }
    })
  }
  static addEmploye(){
    let id, nama,posisi,user,pass;
  rl.question('ID: ', (id)=>{
    id=id
    rl.question('Nama: ',(name)=>{
      nama=name;
      rl.question('Position: ', (position)=>{
        posisi=position;
        rl.question('Username: ', (username)=>{
          user=username;
          rl.question('Password: ',(password)=>{
            pass=password
            // console.log(pass);
            let inputEmployees = new Employee(id, nama, posisi, user,pass)
            stringAdmin.push(inputEmployees);
            let simpan = JSON.stringify(stringAdmin);
            fs.writeFile('admin.json', simpan, (err, tersimpan) => {
              if (err) {
                console.log('Data tidak tersimpan');
              } else {
                console.log('Added "' + nama + '" to data Employess');
                this.dataInduk();
              }
            });
          })
        })
      })
    })
  })     
    }

    static removeEmploye(){
      rl.question('Masukkan id yang akan di hapus', (id)=>{
        let tampungHapus=[];
        stringAdmin.forEach((hapus)=> {
          // console.log(id === hapus.id && hapus.position === 'Admin');
          if(id === hapus.id && hapus.position === 'Admin'){
            return 'Admin tidak bisa di hapus \n'+ this.dataInduk();
          } else if(id!==hapus.id){
            // console.log(hapus);
            tampungHapus.push(hapus);
          } 
        }, this);
        let simpan = JSON.stringify(tampungHapus);
        fs.writeFile('admin.json', simpan, (err, tersimpan) => {
          if (err) {
            console.log('Data tidak tersimpan');
          } else {
            console.log('Data dari id '+id+' telah berhasil di hapus');
            this.dataInduk();
          }
        });
      })
      
    }
    static listEmploye(){
      stringAdmin.forEach((list)=> {
        table.push(
          [list.id, list.name, list.position]
      );
      }, this);
      console.log(table.toString());
      this.dataInduk();
    }

    static recordEmploye(){
      rl.question('Masukkan id yang akan di tampilkan: ',(idRecordEmploye)=>{
        stringAdmin.forEach((recordEmploye)=> {
          if(idRecordEmploye===recordEmploye.id){
            table3.push(
              [recordEmploye.id, recordEmploye.name, recordEmploye.diagnosis]
            )
          }
        }, this);
        console.log(table3.toString());
        this.dataInduk();
      })
      
    }

    static addPatientAdmin(){
      let id, nama,diagnosis;
      rl.question('ID: ', (ids)=>{
        id = ids;
        rl.question('Nama: ',(name)=>{
          nama = name;
          rl.question('Diagnosis: ', (diagnosi)=>{
            diagnosis = diagnosi;
              let inputEmployees = new Patient(id, nama, diagnosis)
              stringPatient.push(inputEmployees);
              let simpan = JSON.stringify(stringPatient);
              fs.writeFile('patient.json', simpan, (err, tersimpan) => {
                if (err) {
                  console.log('Data tidak tersimpan');
                } else {
                  console.log('Added "' + nama + '" to data Patients');
                  this.dataInduk();
                }
              });
            })
          })
        })
      }
      static removePatientAdmin(){
        rl.question('Masukkan id pasien yang akan di hapus', (id)=>{
          let tampungHapus=[];
          stringAdmin.forEach((hapusPasien)=> {
            if(id!==hapusPasien.id){
              tampungHapus.push(hapusPasien);
            }
          }, this);
          let simpan = JSON.stringify(tampungHapus);
          fs.writeFile('patient.json', simpan, (err, tersimpan) => {
            if (err) {
              console.log('Data tidak tersimpan');
            } else {
              console.log('Pasien dari id '+id+' telah berhasil di hapus');
              this.dataInduk();
            }
          });
        })
      }
      static listPatientsAdmin(){
        stringPatient.forEach((listPatient)=> {
          table2.push(
            [listPatient.id, listPatient.name, listPatient.diagnosis]
        );
        }, this);
        console.log(table2.toString());
        this.dataInduk();
      }
      static recordPatientAdmin(){
        rl.question('Masukkan id yang akan di tampilkan: ',(idRecord)=>{
          stringPatient.forEach((record)=> {
            if(idRecord===record.id){
              table3.push(
                [record.id, record.name, record.diagnosis]
              )
            }
          }, this);
          console.log(table3.toString());
          this.dataInduk();
        })
        
      }



    //HAK AKSES UNTUK DOKTER
  static dataDokter(){
    // this.login();
    console.log('--------------------------');
    console.log(`      Welcome Doctor      `);
    console.log('--------------------------');
    console.log('1. Add Patient');
    console.log('2. Remove Patient');
    console.log('3. List Patients');
    console.log('4. Record Patients');
    console.log('5. Logout');
    rl.question('What would you like to do ',(inputs)=>{
      if(inputs === '1'){
       this.addPatient();
      }else if(inputs === '2'){
        this.removePatient();
      }else if(inputs === '3') {
        this.listPatients();
      }else if(inputs === '4') {
        this.recordPatient();
      }else if(inputs === '5') {
        this.login();
      }else {
        this.dataDokter();
      }
    });
  }

  static addPatient(){
    let id, nama,diagnosis;
    rl.question('ID: ', (ids)=>{
      id = ids;
      rl.question('Nama: ',(name)=>{
        nama = name;
        rl.question('Diagnosis: ', (diagnosi)=>{
          diagnosis = diagnosi;
            let inputEmployees = new Patient(id, nama, diagnosis)
            stringPatient.push(inputEmployees);
            let simpan = JSON.stringify(stringPatient);
            fs.writeFile('patient.json', simpan, (err, tersimpan) => {
              if (err) {
                console.log('Data tidak tersimpan');
              } else {
                console.log('Added "' + nama + '" to data Patients');
                this.dataDokter();
              }
            });
          })
        })
      })
    }
    static removePatient(){
      rl.question('Masukkan id pasien yang akan di hapus', (id)=>{
        let tampungHapus=[];
        stringAdmin.forEach((hapusPasien)=> {
          if(id!==hapusPasien.id){
            tampungHapus.push(hapusPasien);
          }
        }, this);
        let simpan = JSON.stringify(tampungHapus);
        fs.writeFile('patient.json', simpan, (err, tersimpan) => {
          if (err) {
            console.log('Data tidak tersimpan');
          } else {
            console.log('Pasien dari id '+id+' telah berhasil di hapus');
            this.dataDokter();
          }
        });
      })
    }
    static listPatients(){
      stringPatient.forEach((listPatient)=> {
        table2.push(
          [listPatient.id, listPatient.name, listPatient.diagnosis]
      );
      }, this);
      console.log(table2.toString());
      this.dataDokter();
    }
    static recordPatient(){
      rl.question('Masukkan id yang akan di tampilkan: ',(idRecord)=>{
        stringPatient.forEach((record)=> {
          if(idRecord===record.id){
            table3.push(
              [record.id, record.name, record.diagnosis]
            )
          }
        }, this);
        console.log(table3.toString());
        this.dataDokter();
      })
      
    }
}
Hospital.login();
// console.log(Employee());
// Hospital.addEmploye();
// console.log(Hospital.cekEmploye());

module.exports = Hospital
