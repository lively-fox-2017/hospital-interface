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


  	rl.question('\nWelcome to Mistic Hospital\n-----------------------------\nPlease enter your username:\n', (answer) => {
	  	// TODO: Log the answer in a database

	  	if(answer === Employee.auth_userName(answer)){


	  		rl.question('Please enter your password:\n', (input_pass) => {
	  			//console.log(typeof(input_pass))

	  		if(Employee.auth_passWord(input_pass) === input_pass){

	  			console.log(`password valid`)

	  		}else{

	  			return this.login()
	  		}

			})

	  	}else{
	  		console.log(`username not valid`)
	  	}

		})

		


  }

}

Hospital.login()


module.exports = Hospital
