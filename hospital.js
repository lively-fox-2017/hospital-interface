const Employee = require('./employee')

// /* readline */
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// /* class */

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
  }

  static login(){

  	rl.question('\nWelcome to Mistic Hospital\n-----------------------------\nPlease enter your username:\n', (input_username) => {
	  	// TODO: Log the answer in a JSON
	 		rl.question('Please enter your password:\n', (input_pass) => {
	 			// console.log('______________________' + input_pass)
	 			// console.log('````````````````````````' + Employee.auth_passWord(input_pass))
		  	if(input_username === Employee.auth_userName(input_username) && input_pass === Employee.auth_passWord(input_pass)){
		  		console.log('berhasil')
		  		switch(Employee.auth_position(input_username)){
		  			case 'admin' 			: console.log('==*=admin');break;
		  			case 'doctor' 		: console.log('=*=doctor');break;
		  			case 'office boy' : console.log('=office boy*');break;
		  		}
		  	}else{
		  		console.log(`wrong username or password`) 
		  		return this.login()
		  	}	
		  })
		})	
	}

  



}

Hospital.login()


module.exports = Hospital
