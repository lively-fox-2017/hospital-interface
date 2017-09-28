let readline = require('readline')
let rl = readline.createInterface(process.stdin,process.stdout)
let fs = require('fs')
let Patient = require('./patient')
let Employee = require('./employee')
let patientDbJson = fs.readFileSync('patientDb.json','utf8')
let patientDb = JSON.parse(patientDbJson);
let employeeDbJson = fs.readFileSync('employeeDb.json','utf8')
let employeeDb = JSON.parse(employeeDbJson);
class Hospital {
  constructor(name, location, employees, patients, userName) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
    this.userName = userName
  }
  welcomeGreet(){
    let userName = '';
    let passWord = '';
    rl.question('Welcome to Mystic Hospital\n---------------------\nPlease enter your username:\n',function(username){
      userName = username;
      rl.setPrompt(`Please enter ${userName} password:\n`);
      rl.prompt();
      if(username === hospital.employeeAuth(username).employee_username  && hospital.employeeAuth(username).employee_position === "DOCTOR"){
        rl.on('line',function(password){
          if(password === hospital.employeeAuth(username).employee_password){
            rl.setPrompt(`---------------------\nWelcome, ${userName}. Your access level is: ${hospital.employeeAuth(username).employee_position}\n---------------------\nWhat would you like to do?\nOptions: (please type the number ONLY, Ex: 1)\n[1]. list_patients\n[2]. view_records\n[3]. add_record\n[4]. remove_record\n[5]. LOG OUT\n`)
            rl.prompt();
            rl.on('line',function(optionAnswer){
              if(optionAnswer === '1'){
                rl.setPrompt(`${Patient.listPatients()}`);
                rl.prompt();
              }
              else if(optionAnswer === '2'){
                rl.setPrompt(`Please input the patient ID: `);
                rl.prompt();
                rl.on('line',function(patientId){
                  rl.setPrompt(`Patient ID: ${Patient.viewPatientRecord()[parseInt(patientId)-1].patient_id}, Patient Name: ${Patient.viewPatientRecord()[parseInt(patientId)-1].patient_name}, Patient Diagnose With: ${Patient.viewPatientRecord()[parseInt(patientId)-1].patient_diagnose}`)
                  rl.prompt()
                })
              }
              else if(optionAnswer === '3'){
                rl.setPrompt('Please input new patient ID: ');
                rl.prompt();
                rl.on('line',function(newPatientId){
                  rl.setPrompt('Please input new patient name: ');
                  rl.prompt();
                  rl.on('line',function(newPatientName){
                    rl.setPrompt('Please input new patient diagnose: ');
                    rl.prompt();
                    rl.on('line',function(newPatientDiagnose){
                      let newPatientObj = {
                        "patient_id":newPatientId,
                        "patient_name":newPatientName,
                        "patient_diagnose":newPatientDiagnose};
                      patientDb.push(newPatientObj);
                      fs.writeFileSync('patientDb.json',JSON.stringify(patientDb));
                      rl.setPrompt(`New patient has been added`);
                      rl.prompt()
                    })
                  })
                })
              }
              else if(optionAnswer === '5'){
                hospital.welcomeGreet();
              }
            })
          }
        })
      }
      else if(username === hospital.employeeAuth(username).employee_username  && hospital.employeeAuth(username).employee_position === "ADMIN"){
        rl.on('line',function(password){
          if(password === hospital.employeeAuth(username).employee_password){
            rl.setPrompt(`---------------------\nWelcome, ${userName}. Your access level is: ${hospital.employeeAuth(username).employee_position}\n---------------------\nWhat would you like to do?\nOptions: (please type the number ONLY, Ex: 1)\n[1]. list_patients\n[2]. view_records\n[3]. add_record\n[4]. remove_record\n[5]. list_employees\n[6]. view_records\n[7]. add_record\n[8]. remove_record\n[9]. LOG OUT\n\n`)
            rl.prompt();
            rl.on('line',function(optionAnswer){
              if(optionAnswer === '1'){
                rl.setPrompt(`\n${Patient.listPatients()}\n\n`);
                rl.prompt();
                rl.close();
              }
              else if(optionAnswer === '2'){
                rl.setPrompt(`Please input the patient ID: `);
                rl.prompt();
                rl.on('line',function(patientId){
                  rl.setPrompt(`Patient ID: ${Patient.viewPatientRecord()[parseInt(patientId)-1].patient_id}, Patient Name: ${Patient.viewPatientRecord()[parseInt(patientId)-1].patient_name}, Patient Diagnose With: ${Patient.viewPatientRecord()[parseInt(patientId)-1].patient_diagnose}\n\n`)
                  rl.prompt();
                  rl.close()
                })
              }
              else if(optionAnswer === '3'){
                rl.setPrompt('Please input new patient ID: ');
                rl.prompt();
                rl.on('line',function(newPatientId){
                  rl.setPrompt('Please input new patient name: ');
                  rl.prompt();
                  rl.on('line',function(newPatientName){
                    rl.setPrompt('Please input new patient diagnose: ');
                    rl.prompt();
                    rl.on('line',function(newPatientDiagnose){
                      let newPatientObj = {
                        "patient_id":newPatientId,
                        "patient_name":newPatientName,
                        "patient_diagnose":newPatientDiagnose};
                      patientDb.push(newPatientObj);
                      fs.writeFileSync('patientDb.json',JSON.stringify(patientDb));
                      rl.setPrompt(`New patient has been added\n\n`);
                      rl.prompt();
                      rl.close();
                    })
                  })
                })
              }
              else if(optionAnswer === '5'){
                rl.setPrompt(`\n${Employee.listEmployees()}\n\n`);
                rl.prompt();
                rl.close();
              }
              else if(optionAnswer === '6'){
                rl.setPrompt(`\nPlease input the employee ID: `);
                rl.prompt();
                rl.on('line',function(employeeId){
                  rl.setPrompt(`Employee ID: ${Employee.viewEmployeeRecord()[parseInt(employeeId)-1].employee_id}, Employee Name: ${Employee.viewEmployeeRecord()[parseInt(employeeId)-1].employee_name}, Employee Position: ${Employee.viewEmployeeRecord()[parseInt(employeeId)-1].employee_position}, Employee Username: ${Employee.viewEmployeeRecord()[parseInt(employeeId)-1].employee_username}\n\n`)
                  rl.prompt();
                  rl.close();
                })
              }
              else if(optionAnswer === '7'){
                rl.setPrompt('Please input new employee ID: ');
                rl.prompt();
                rl.on('line',function(newEmployeeId){
                  rl.setPrompt('Please input new employee name: ');
                  rl.prompt();
                  rl.on('line',function(newEmployeeName){
                    rl.setPrompt('Please input new employee position: ');
                    rl.prompt();
                    rl.on('line',function(newEmployeePosition){
                      rl.setPrompt('Please input new employee username: ');
                      rl.prompt();
                      rl.on('line',function(newEmployeeUsername){
                        rl.setPrompt('Please input new employee password: ');
                        rl.prompt();
                        rl.on('line',function(newEmployeePassword){
                          let newEmployeeObj = {
                            "employee_id":newEmployeeId,
                            "employee_name":newEmployeeName,
                            "employee_position":newEmployeePosition,
                            "employee_username":newEmployeeUsername,
                            "employee_password":newEmployeePassword}
                          employeeDb.push(newEmployeeObj);
                          fs.writeFileSync('employeeDb.json',JSON.stringify(employeeDb));
                          rl.setPrompt(`New employee has been added\n\n`);
                          rl.prompt();
                          rl.close();
                        })
                      })
                    })
                  })
                })
              }
              else if(optionAnswer === '9'){
                hospital.welcomeGreet();
              }
            })
          }
        })
      }
      else if(username === hospital.employeeAuth(username).employee_username  && hospital.employeeAuth(username).employee_position === "OFFICE BOY"){
        rl.on('line',function(password){
          if(password === hospital.employeeAuth(username).employee_password){
            rl.setPrompt(`---------------------\nWelcome, ${userName}. Your access level is: ${hospital.employeeAuth(username).employee_position}\n---------------------\nWhat would you like to do?\nOptions: (please type number ONLY, Ex: 1)\n[1]. LOG OUT\n`)
            rl.prompt();
            rl.on('line',function(optionAnswer){
              if(optionAnswer === '1'){
                hospital.welcomeGreet()
              }
            })
          }
        })
      }
      else{
        hospital.welcomeGreet();
      }
    })
  }
  employeeAuth(username){
    for(var i = 0; i < Employee.employeeAuth().length; i++){
      if(Employee.employeeAuth()[i].employee_username === username){
        return Employee.employeeAuth()[i]
      }
    }
    return false;
  }
}
let hospital = new Hospital();
hospital.welcomeGreet();
hospital.employeeAuth();
// hospital.showPatientsList()

module.exports = Hospital
