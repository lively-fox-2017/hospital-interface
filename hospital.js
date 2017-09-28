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
		  			case 'admin' 			: this.adminPage(input_username);break;
		  			case 'doctor' 		: this.doctorPage(input_username);break;
		  			case 'office boy' : this.officeBoyPage(input_username);break;
		  		}
		  	}else{
		  		console.log(`wrong username or password`) 
		  		return this.login()
		  	}	
		  })
		})	
	}


	static adminPage(name){
		console.log(`-------------------------------------------\nWelcome, ${Employee.yourNameIs(name)}. Your access level is: ADMIN\n-------------------------------------------`)
		console.log(`What would you like to do?\nOptions:\n- list_doctor\n- add_doctor\n- remove_doctor\n- list_patients\n- view_records <patient_id>\n- add_record <patient_id>\n- remove_record <patient_id> <record_id>\n- logout`)
	}

	static doctorPage(name){
		console.log(`-------------------------------------------\nWelcome, ${Employee.yourNameIs(name)}. Your access level is: DOCTOR\n-------------------------------------------`)
		console.log(`What would you like to do?\nOptions:\n- list_patients\n- view_records <patient_id>\n- add_record <patient_id>\n- remove_record <patient_id> <record_id>\n- logout`)
	}

	static dofficeBoyPagePage(name){
		console.log(`-------------------------------------------\nWelcome, ${Employee.yourNameIs(name)}. Your access level is: OFFICE BOY\n-------------------------------------------`)
		console.log(`What would you like to do?\nOptions:\n- logout`)
	}

  



}


Hospital.login()
//Hospital.adminPage()


module.exports = Hospital
