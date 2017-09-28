const Patient = require('./patient.js')
const Employee = require('./employee.js')
let fs = require('fs')

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Hospital {
  constructor(name, location, employees) {
    this.name = name
    this.employees = Employee.data.length
    this.patients = Patient.data.length
    this.location = location
  }

  welcome() {
    let inf = [
      '==================================================',
      `Welcome to ${this.name}. \n${this.location} \nEmployees ${this.employees} | patients ${this.patients}`,
      '=================================================='
    ]
    console.log(inf.join('\n'));
  }

  prompt(position){
    rl.question('>', (input) => {
      this.control(input.split(' '), position)
    })
  }

  login(){
    rl.question('please insert your username:', (username) => {
      for (let i = 0; i < Employee.data.length; i++) {
        if(username == Employee.data[i].username){
          this.password(username)
        }
      }
      this.login()
    })
  }

  password(username){
    rl.question('please insert your password:', (password) => {
      for (let i = 0; i < Employee.data.length; i++) {
        if(password == Employee.data[i].password && username == Employee.data[i].username){
          this.homepage(Employee.data[i].position, Employee.data[i].name)
          return this
        }
      }
      this.password(username)
    })

  }

  homepage(position, name){
    let inf = [
      '==================================================',
      `Welcome, ${name}. Your access level is: ${position.toUpperCase()}`,
      '==================================================',
      'What would you like to do?',
      'Optionts:',
      '1. list_patients',
      '2. list_employees',
      '3. add_patient',
      '4. add_employee',
      '5. view_record_patient <patient_id>',
      '6. remove_patient <patient_id>',
      '7. remove_employee <employee_id>',
      '8. logout',
    ]

    console.log(inf.join('\n'));
    this.prompt(position);
  }

  control(input, position){
    switch(input[0]){
      case '1' :
        if(position == 'ob'){
          console.log(`You dont have permission!!`);
          this.prompt(position)
        }else{
          console.log(Patient.class.showList());
          this.prompt(position)
        }
        break;
      case '2' :
        if(position == 'ob' || position == 'dokter'){ // ob/dokter cannot access
          console.log(`You dont have permission!!`);
          this.prompt(position)
        }else{
          console.log(Employee.class.showList());
          this.prompt(position)
        }
        break;
      case '3' :
        if(position == 'ob' || position == 'receptionist'){
          console.log(`You dont have permission!!`);
          this.prompt(position)
        }else{
          rl.question('add new patient \nid:', (id) => {
            rl.question('name:', (name) => {
              rl.question('diagnosis:', (diag) => {
                rl.question('save patient?? (y/n)', (answer) => {
                  if(answer == 'y'){
                    Patient.class.add(id, name, diag)
                    console.log('new patient saved..');
                    this.prompt(position)
                  }else{
                    console.log('new patient not saved..');
                    this.prompt(position)
                  }
                })
              })
            })
          })
        }
        break;
      case '4' :
        if(position == 'admin'){ // ob/dokter/receptionist cannot access
          rl.question('add new employee \nid:', (id) => {
            rl.question('name:', (name) => {
              rl.question('position:', (positionN) => {
                rl.question('username:', (username) => {
                  rl.question('password:', (password) => {
                    rl.question('save patient?? (y/n)', (answer) => {
                      if(answer == 'y'){
                        Employee.class.add(id, name, positionN, username, password)
                        console.log('new employee saved..');
                        this.prompt(position)
                      }else{
                        console.log('new employee not saved..');
                        this.prompt(position)
                      }
                    })
                  })
                })
              })
            })
          })
        }else{
          console.log(`You dont have permission!!`);
          this.prompt(position)
        }
        break;
      case '5' :
        if(position == 'ob'){
          console.log(`You dont have permission!!`);
          this.prompt(position)
        }else{
          rl.question('show record pasient \nid:', (id) => {
            console.log(Patient.class.showRecord(id));
            this.prompt(position)
          })
        }
        break;
      case '6' :
        if(position == 'ob' || position == 'receptionist'){
          console.log(`You dont have permission!!`);
          this.prompt(position)
        }else{
          rl.question('delete patient \nid:', (id) => {
            Patient.class.del(id)
            this.prompt(position)
          })
        }
        break;
      case '7' :
        if(position == 'admin'){ // ob/dokter cannot access
          rl.question('delete employee \nid:', (id) => {
            Employee.class.del(id)
            this.prompt(position)
          })
        }else{
          console.log(`You dont have permission!!`);
          this.prompt(position)
        }
        break;
      case '8' :
        rl.close()
        break;
      case 'help' :
        let menu = [
        'What would you like to do?',
        'Optionts:',
        '1. list_patients',
        '2. list_employees',
        '3. add_patient',
        '4. add_employee',
        '5. view_record_patient <patient_id>',
        '6. remove_patient <patient_id>',
        '7. remove_employee <employee_id>',
        '8. logout'
        ]
        console.log(menu.join('\n'));
        this.prompt(position)
        break;
      default :
        this.prompt(position)
        break;
    }
  }
}

let hospital = new Hospital('Hospital Sehat Sejahtera', 'Jl. kesehatan No. 01, Bandung', 45)
hospital.welcome();
hospital.login();

module.exports = Hospital
