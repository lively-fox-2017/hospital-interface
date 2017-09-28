'use strict'
const Hospital = require('./hospital');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Driver{
  constructor(){
    this.hospital = new Hospital;
    this.position = '';
  }

  login(){
    rl.question('Username : ', (username)=>{
      rl.question('Passowrd : ', (password)=>{
        let data = this.hospital.checkCredential(username,password);
        if(data.hasOwnProperty('position')){
          if(data.position=='dokter'){
            this.commandHandler();
          }else if(data.position == 'admin'){
            this.adminPanel();
          }else if(data.position == 'OB'){
            this.OBPANEL();
          }
          this.position = data.position;
        }else{
          this.login();
        }

      })
    })
  }

  showMenu(){
    let string = '\n\n===============WELCOME+++++++++++++++++\n'
    string+='Pilih menu command seperti pada kurung siku\nview list patient || <list>\nsearch patient by id || <view> <id>\nadd patient record || <add>\nremove record || <remove> <id>\n';
    string+='\nCommand : ';
    return string;
  }

  showMenuAdmin(){
    let string = '\n\n===============WELCOME+++++++++++++++++\n'
    string += 'Pilih menu command seperti pada kurung siku\n\nview list patient || <list_patient>\nsearch patient by id || <view_patient> <id>\nadd patient record || <add_patient>\nremove record || <remove_patient> <id>\n';
    string += 'view employee || <view> \nadd employee || <add>\nremove employee || <remove> <username>\n';
    string+='\nCommand : ';
    return string;
  }

  addPatient(){
    rl.question('id : ', (id)=>{
      rl.question('nama : ', (nama)=>{
        rl.question('diagnosis : ', (diagnosis)=>{
          if(this.hospital.addPatient(id, nama, diagnosis)){
            if(this.position=='dokter'){
              this.commandHandler('berhasil');
            }else if(this.position == 'admin'){
              this.adminPanel();
            }
          }else{
            console.log('============ID SUDAH TERDAFTAR----------------');
            console.log('============   COBA ID LAIN   ----------------');
            this.addPatient();
          }
        })
      })
    })
  }

  commandHandler(dataFromBefore){
    let pesan ='\n\n'+(dataFromBefore||'')+this.showMenu();

    rl.question(pesan, (command)=>{
      if(command=='list'){
        this.commandHandler(this.hospital.patientToString(this.hospital.patients));
      }else if(command.slice(0,4)== 'view'){
        this.commandHandler(this.hospital.patientToString(this.hospital.getPateintById(command.slice(5,command.length))));
      }else if(command=='add'){
        this.addPatient();
      }else if(command.slice(0,6)=='remove'){
        if(this.hospital.removePatient(command.slice(7, command.length))){
          this.commandHandler('berhasil deleted');
        }else{
          this.commandHandler('gagal deleted');
        }
      }
      else{
        this.commandHandler();
      }
    })
  }

  addEmployee(){
    rl.question('nama : ', (nama)=>{
      rl.question('posisi : ', (posisi)=>{
        rl.question('userName : ', (username)=>{
          rl.question('password : ', (password)=>{
            if(this.hospital.addEmployee(nama, posisi, username, password)){
              this.adminPanel('berhasil');
            }else{
              this.addEmployee();
            }
          })
        })
      })
    })
  }

  adminPanel(dataFromBefore){
    let pesan = (dataFromBefore||'')+this.showMenuAdmin();
    rl.question(pesan, (command)=>{
      if(command == 'view'){
        this.adminPanel(this.hospital.employeeToString(this.hospital.employees));
      }else if(command=='add_patient'){
        this.addPatient();
      }else if(command.slice(0,3) == 'add'){
        this.addEmployee();
        //this.adminPanel()
      }else if(command.slice(0,14)=='remove_patient'){
        if(this.hospital.removePatient(command.slice(15, command.length))){
          this.adminPanel('berhasil deleted');
        }else{
          this.adminPanel('gagal deleted');
        }
      }else if(command.slice(0,6)=='remove'){
        if(this.hospital.removeEmployee(command.slice(7,command.length))){
          this.adminPanel('berhasil');
        }else{
          this.adminPanel('gagal');
        }
      }else if(command=='list_patient'){
        this.adminPanel(this.hospital.patientToString(this.hospital.patients));
      }else if(command.slice(0,12)== 'view_patient'){
        this.adminPanel(this.hospital.patientToString(this.hospital.getPateintById(command.slice(13,command.length))));
      }
      else{
        this.adminPanel();
      }
    })
  }

  OBPANEL(){
    rl.question('OB\'S SPECIAL PRIVIELEGE! INSERT COIN TO FIND OUT OR PRESS CTRL+C' ,()=>{});
  }


  handler(){
    this.login();
    //this.showMenu();

  }
}

let driver = new Driver();
driver.handler();
