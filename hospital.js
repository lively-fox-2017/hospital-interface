'use strict'

const readline = require('readline');
const Employee = require('./employee')
const Patient = require('./patient')

const fs = require('fs')

class Hospital {
  constructor(name, location, employee) {
    this.name = name
    this.employees = []
    this.patients = []
    this.location = location
    this.activeUser = []
  }

  welcome() {
    console.log('===============================================');
    console.log(`Welcome to ${this.name} ${this.location}`);
    console.log('===============================================');
  }

  getUsername(username) {
    let employee = this.employees.filter((a) => a.username == username)
    if (employee.length == 0) {
      return ''
    } else {
      return employee[0]
    }
  }

  getPatientID(patientID) {
    let patient = this.patients.filter((a) => a.id == patientID)
    if (patient.length == 0) {
      return ''
    } else {
      return patient[0]
    }
  }

  addEmployee(employee) {
    this.employees.push(employee)
  }

  loginScreen(){
     rl.question('Please enter your username : ', (username) => {
      let user = hospital.getUsername(username)
      if (user != '') {
        this.loginPassword(user)
      }
      else {
        console.log("username not found");
        this.loginScreen()
      }
    })
  }

  loginPassword(user){
    rl.question('Please enter your password : ', (password) => {
      if (password == user.password) {
        this.activeUser.push(user)

        console.log(`Welcome, ${user.name}. Your level access is : ${user.position}`);
        console.log('===============================================');
        this.showMenu(user)
      } else {
        console.log('Wrong password');
        this.loginPassword(user)

      }

    })
  }

  dataMenu(){
    return JSON.parse(fs.readFileSync('./menu.json', 'utf8'))
  }

  showMenu(user){
    let menuAccess = this.dataMenu()
    let menuUser = menuAccess.filter((a)=>a.job==user.position)

    for (let i=0 ;i<menuUser[0].menu.length ; i++){
      let menu=''
      switch (menuUser[0].menu[i]) {
        case 'listuser' :
          menu = 'List User'
          break
        case 'user' :
          menu = 'User Detail'
          break
        case 'adduser' :
          menu = 'Add New User'
          break
        case 'deleteuser' :
          menu ='Delete User'
          break
        case 'listpatient' :
          menu = 'List Patient'
          break
        case 'patient' :
          menu = 'Patient Detail'
          break
        case 'addpatient' :
          menu = 'Add New Patient'
          break
        case 'deletepatient' :
          menu = 'Delete Patient Data'
          break
        case 'logout' :
          menu = 'Logout'
          break
      }
      console.log(`${i+1}. ${menu}`);
      // this.showMenu()
    }
    this.selectMenu(user)

  }

  selectMenu(user){
    let menuAccess = this.dataMenu()
    let menuUser = menuAccess.filter((a)=>a.job==user.position)
    rl.question('Please select menu : ' , (input)=>{
      if(input>=0 && input <=menuUser[0].menu.length ){
        this.selectAction(input,user)
      }
      else {
        console.log('Menu Not Found');
        this.selectMenu(user)
      }
    })
  }


  listuserMenu(user){
    console.log('===============================================');
    for (let i=0;i< this.employees.length;i++){
      console.log(`${i+1}. ${this.employees[i].name} - ${this.employees[i].position}  ( ${this.employees[i].username} )`);
    }
    console.log('===============================================');
    this.showMenu(user)
  }

  userMenu(user){
    rl.question('Please input USERNAME :', (input)=>{
      let username= this.getUsername(input)
      if (username!=''){
        console.log('===============================================');
        console.log('name :',username.name)
        console.log('position :',username.position)
        console.log('username :',username.username)
        console.log('password :' ,username.password)
        console.log('===============================================');
        this.showMenu(user)
      }
      else{
        console.log('Username not found');
        this.userMenu(user)
      }


    })
  }

  adduserMenu(user){
    rl.question('Username : ' , (username)=>{
      if(this.getUsername(username)!=''){
        console.log('Oopss...User already exist');
        this.showMenu(user)
      }
      rl.question('name : ', (name)=>{
        rl.question('Position : ', (position)=>{
          rl.question('Password : ' , (password)=>{
            let employee = new Employee(name,position,username,password)
            this.employees.push(employee)
            this.showMenu(user)
          })
        })
      })
    })
  }

  deleteuserMenu(user){
    rl.question('Input USERNAME : ', (input)=>{
      let username=this.getUsername(input)
      if(username==user){
        console.log('Oops...you cant delete yourself');
        this.showMenu(user)
      }else if (username!=''){
        for(let i=0; i<this.employees.length; i++){
          if(this.employees[i].username== input){
            this.employees.splice(i,1)
            this.showMenu(user)
          }
        }
      }
      else {
        console.log('Username not found');
        this.deleteuserMenu(user)
      }
    })
  }

  listpatientMenu(user){
    console.log('===============================================');
    for (let i=0;i< this.patients.length;i++){
      console.log(`${i+1}. [${this.patients[i].id}]  ${this.patients[i].name}  ( ${this.patients[i].diagnosis} )`);
    }
    console.log('===============================================');
    this.showMenu(user)
  }

  patientMenu(user){
    rl.question('Please input PatientID :', (input)=>{
      let patientID= this.getPatientID(input)
      if (patientID!=''){
        console.log('===============================================');
        console.log('id :',patientID.id)
        console.log('name :',patientID.name)
        console.log('diagnosis :',patientID.diagnosis)
        console.log('===============================================');
        this.showMenu(user)
      }
      else{
        console.log('PatientID not found');
        this.showMenu(user)
      }
    })
  }

  addpatientMenu(user){
    rl.question('id : ' , (id)=>{
      if(this.getPatientID(id)!=''){
        console.log('Ops..Patiend ID already exist');
        this.showMenu(user)
      }
      rl.question('name : ', (name)=>{
        rl.question('diagnosis : ', (diagnosis)=>{
            let patient = new Patient(id,name,diagnosis)
            this.patients.push(patient)
            this.showMenu(user)
        })
      })
    })
  }

  deletepatientMenu(user){
    rl.question('Input PatientID : ', (input)=>{
      let patientID= this.getPatientID(input)
      if (patientID!=''){
        let index=this.patients.indexOf(patientID)
        this.patients.splice(index,1)
        this.showMenu(user)
      }
      else {
        console.log('PatientID not found');
        this.showMenu(user)
      }
    })
  }

  logoutMenu(){
    console.log('Bye...');
    this.loginScreen()
  }
  // "deletepatient" ,
  // "logout"

  selectAction(input,user){
    let menuAccess = this.dataMenu()
    let menuUser = menuAccess.filter((a)=>a.job==user.position)
    let menu=''
    switch (menuUser[0].menu[input-1]) {
      case 'listuser' :
        this.listuserMenu(user)
        break
      case 'user' :
        this.userMenu(user)
        break
      case 'adduser' :
        this.adduserMenu(user)
        break
      case 'deleteuser' :
        this.deleteuserMenu(user)
        break
      case 'listpatient' :
        this.listpatientMenu(user)
        break
      case 'patient' :
        this.patientMenu(user)
        break
      case 'addpatient' :
        this.addpatientMenu(user)
        break
      case 'deletepatient' :
        this.deletepatientMenu(user)
        break
      case 'logout' :
        this.logoutMenu()
        break
    }
    console.log(menu);

  }



}
// module.exports = Hospital
let admin = new Employee('ian', 'ADMIN', 'zzz', 'zzz')
let hospital = new Hospital('iHospital', 'Depok')

hospital.addEmployee(admin)

hospital.welcome()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.setPrompt('=>')

hospital.loginScreen()
;
