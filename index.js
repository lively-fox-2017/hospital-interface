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

  showMenuPerLevel(level) {
    console.log('------- level nya', level)
    // if level = dokter
    //   show menu dokter 
    // else if level admin 
    //   show menu admin
  }

  askPassword() {
    rl.question('Password:', (password)=>{
      if(password == 123){
        this.showMenuPerLevel(level)
      }
      else {
        console.log('username salah')
        this.main()
      }            
    })
  }

  login () {
    console.log(`SELAMAT DATANG DI RSU NAMLEA`)  
    console.log('-----------------------------')  
    rl.question('Please input username:', (username)=>{
      //patokannya dari this.employees yg  berupa array
      if(username == ){
        
      }
      else{
          console.log('password salah')
          this.main()
      }
    })
  
  }

  
}

var arr_employees = []
var employee1 = new Employee('admin', 'admin', 'admin', 'admin')
arr_employees.push(employee1)
var employee2 = new Employee('dokter', 'dokter', 'dokter', 'dokter')
arr_employees.push(employee2)

var arr_patients = []


var hospitalInt = new Hospital ('azharie', 'Jl. Bunga', arr_employees, arr_patients );

hospitalInt.login()

// var argv = process.argv
// var command = argv[2]
// var arg = argv[3]

module.exports = Hospital
