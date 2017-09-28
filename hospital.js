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
    rl.setPrompt('>')
    rl.prompt()

    rl.on('line', (input) => {
      this.control(input.split(' '), position)
      rl.prompt()
    }).on('close', (input) => {
      console.log(`Good bye ...'`);
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
        }else{
          console.log(Patient.class.showList());
        }
        break;
      case '2' :
        if(position == 'ob' || position == 'dokter'){ // ob/dokter cannot access
          console.log(`You dont have permission!!`);
        }else{
          console.log(Employee.class.showList());
        }
        break;
      case '3' :
        if(position == 'ob'){
          console.log(`You dont have permission!!`);
        }else{
          rl.question('id:', (id) => {
            rl.question('name:', (name) => {
              rl.question('diagnosis:', (diag) => {
                rl.question('save patient?? (y/n)', (answer) => {
                  if(answer == 'y'){
                    Patient.class.add(id, name, diag)
                    console.log('patient saved..');
                    this.prompt(position) // Masih ada problem di rl prompt
                  }else{
                    console.log('patient not saved..');
                    this.prompt(position)
                  }
                })
              })
            })
          })
        }
        break;
      case '4' :
        if(position == 'ob' || position == 'dokter'){ // ob/dokter cannot access
          console.log(`You dont have permission!!`);
        }else{
          rl.question('name:', (name) => {
            rl.question('positionN:', (positionN) => {
              rl.question('username:', (username) => {
                rl.question('password:', (password) => {
                  rl.question('save patient?? (y/n)', (answer) => {
                    if(answer == 'y'){
                      Employee.class.add(Employee.data.length+1, name, positionN, username, password)
                      console.log('employee saved..');
                      this.prompt(position) // Masih ada problem di rl prompt
                    }else{
                      console.log('employee not saved..');
                      this.prompt(position)
                    }
                  })
                })
              })
            })
          })
        }
        break;
      case '5' :
        if(position == 'ob'){
          console.log(`You dont have permission!!`);
        }else{
          if(input[1]){
            console.log(Patient.class.showRecord(input[1]));
          }
        }
        break;
      case '6' :
        if(position == 'ob'){
          console.log(`You dont have permission!!`);
        }else{
          Patient.class.del(input[1])
        }
        break;
      case '7' :
        if(position == 'ob' || position == 'dokter'){ // ob/dokter cannot access
          console.log(`You dont have permission!!`);
        }else{
          Employee.class.del(input[1])
        }
        break;
      case '8' :
        this.welcome() // Masih ada problem di rl prompt
        this.login();
        break;
    }
  }
}

let hospital = new Hospital('Hospital Sehat Sejahtera', 'Jl. kesehatan No. 01, Bandung', 45)
hospital.welcome();
hospital.login();

module.exports = Hospital
