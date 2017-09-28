const Patient = require('./patient.js')
const Employee = require('./employee.js')
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
  }


  
  removeEmployee (level){
    
    rl.question('masukan Nama : ',(answerName) => {
      let arr = []
      for(let i = 0; i < this.employees.length; i++){
        if(answerName != this.employees[i].name){
          
          arr.push(this.employees[i])
          console.log(this.employees)
          
        }
        
      }
      this.employees = arr
      this.showMenuPerLevel(level)      
    })

  }

  addEmployee(level){
      
    rl.question('masukan Nama : ',(answerName) => {
      rl.question('masukan Position (UPPERCASE) : ',(answerPos) => {
        rl.question('masukan Username : ',(answerUser) => {
          rl.question('masukan Password : ',(answerPass) => {
        
              var employee = new Employee(answerName, answerPos, answerUser, answerPass)

              this.employees.push(employee)
              console.log( this.employees)    
              this.showMenuPerLevel(level)
          })
        })
      })
    }) 
  }
  

  removeRecord (level){
    
    rl.question('masukan Patient_id : ',(answerId) => {
      let arr = []
      for(let i = 0; i < this.patients.length; i++){
        if(answerId != this.patients[i].id){
          
          arr.push(this.patients[i])
          console.log(this.patients)
          
        }
        
      }
      this.patients = arr
      this.showMenuPerLevel(level)      
    })

  }

  addRecord (level){
    
    rl.question('masukan Nama : ',(answerName) => {
      rl.question('masukan diagnosa : ',(answerDiagnosa) => {
        var idPatient = this.patients[this.patients.length-1].id+1
        var patient = new Patient(idPatient, answerName, answerDiagnosa)

        this.patients.push(patient)
        console.log( this.patients)    
        this.showMenuPerLevel(level)
      })
    })

  }

  confirm(username){
    //console.log('selamat')
    for (var i =0 ; i < this.employees.length; i++){
      if(this.employees[i].username === username){
        console.log('-----------------------------')  
        console.log(`Welcome, ${username} Your acces level is: ${this.employees[i].position}`)
        console.log('-----------------------------')  
        this.showMenuPerLevel(this.employees[i].position)
      }
    }
    
  }


  showMenuPerLevel(level) {
    
    if(level == 'DOKTER'){
      console.log('\nSilahkan pilih menu : \n ' +    
      '1. list patient \n ' +
      '2. view_records <id> \n ' +
      '3. add_record <patient_id> \n ' +
      '4. remove_records <patient_id> <record_id> \n ' +
      '5. LogOut ')
      
      rl.question('input menu sesusai nomernya : ',(answer) => {
        switch(answer) {
          case '1':
          console.log( '--------------------')
          console.log(this.patients)
          console.log( '--------------------')
          this.showMenuPerLevel(level)
          break; 
          case '2':
          console.log( '--------------------')
          console.log('nomer dua')
          console.log( '--------------------')
          this.showMenuPerLevel(level)
          break;
          case '3':
          console.log( '--------------------')
          this.addRecord(level)
          console.log( '--------------------')
          this.showMenuPerLevel(level)
          break;
          case '4':
          console.log( '--------------------')
          this.removeRecord(level)
          console.log( '--------------------')
          this.showMenuPerLevel(level)
          break;
          case '5':
          console.log( '--------------------')
          console.log( '--------------------')
          this.login()
          break;
        }
      })
      
    }

    if(level == 'ADMIN'){
      
         console.log('Silahkan pilih menu : \n ' +    
                  '1. list patient \n ' +
                  '2. view_records <id> \n ' +
                  '3. add_record <patient_id> \n ' +
                  '4. remove_records <patient_id> <record_id>\n ' +
                  '5. list_employees \n ' +
                  '6. add_new_employee <name> <position> <username> <password>\n ' +
                  '7. remove_employee <name>\n ' + 
                  '8. LogOut')                  

      rl.question('input menu sesusai nomernya : ',(answer) => {
        switch(answer) {
        case '1':
        console.log( '--------------------')
        console.log(this.patients)
        console.log( '--------------------')
        this.showMenuPerLevel(level)
        break; 
        case '2':
        console.log( '--------------------')
        console.log('nomer dua')
        console.log( '--------------------')
        this.showMenuPerLevel(level)
        break;
        case '3':
        console.log( '--------------------')
        this.addRecord(level)
        console.log( '--------------------')
        this.showMenuPerLevel(level)
        break;
        case '4':
        console.log( '--------------------')
        this.removeRecord(level)
        console.log( '--------------------')
        this.showMenuPerLevel(level)
        break;
        case '5':
        console.log( '--------------------')
        console.log( 'Ini adalah daftar karayawan RSU NAMLEA' )
        console.log(this.employees)
        console.log( '--------------------')
        this.showMenuPerLevel(level)
        break;
        case '6':
        console.log( '--------------------')
        this.addEmployee(level)
        console.log( '--------------------')
        this.showMenuPerLevel(level)
        break;
        case '7':
        console.log( '--------------------')
        this.removeEmployee(level)
        console.log( '--------------------')
        this.showMenuPerLevel(level)
        break;
        case '8':
        console.log( '--------------------')
        console.log( '--------------------')
        this.login()
        break;
      }
    })
   }

    if(level == 'PATIENT'){
      
      console.log('Silahkan pilih menu : \n ' +    
                  '1. list patient \n ' +
                  '2. LogOut')
                  
      
      rl.question('input menu sesusai nomernya : ',(answer) => {
        switch(answer) {
          case '1':
          console.log( '--------------------')
          console.log(this.patients)
          console.log( '--------------------')
          this.showMenuPerLevel(level)
          break;
          case '2':
          console.log( '--------------------')
          console.log( '--------------------')
          this.login()
          break; 
        }
      })
    }

    if(level == 'OFFICE BOY'){
      
      console.log('Halo Selamat Datang! \n' +
                  '1. LogOut')
                  
      
      rl.question('input menu sesusai nomernya : ',(answer) => {
        switch(answer) {
          case '1':
          console.log( '--------------------')
          console.log( '--------------------')
          this.login()
          break; 
        }
      })
    }
    
  }

  askPassword(callback) {
    
    rl.question('Password:', (password)=>{
      callback(password)
    })
  }

  login () {
      console.log(`SELAMAT DATANG DI RSU NAMLEA`)  
      console.log('-----------------------------')  
      rl.question('Please input username:', (username)=>{
        this.askPassword( (password) => {
          for(let i = 0; i < this.employees.length; i++){
            if(username == this.employees[i].username && password == this.employees[i].password){
              return this.confirm(username)
            }
          }  
          return this.login()
        })
      })
  } 

 
  
    
  }

  var arr_employees = []
  var employee1 = new Employee('zuhri', 'ADMIN', 'zuhriman', '123')
  arr_employees.push(employee1)
  var employee2 = new Employee('ami', 'DOKTER', 'azharie', '1234')
  arr_employees.push(employee2)
  var employee3 = new Employee('ami', 'PATIENT', 'pasien', '1234')
  arr_employees.push(employee3)
  var employee4 = new Employee('ami', 'OFFICE BOY', 'ob', '111')
  arr_employees.push(employee4)

  
  var arr_patients = []
  var patients1 = new Patient(arr_patients.length+1, 'yasir', 'Malaria')
  arr_patients.push(patients1)
  var patients2 = new Patient(arr_patients.length+1, 'dewi', 'Flu')
  arr_patients.push(patients2)
  

var hospitalInt = new Hospital ('azharie', 'Jl. Bunga', arr_employees, arr_patients );

hospitalInt.login()


module.exports = Hospital
