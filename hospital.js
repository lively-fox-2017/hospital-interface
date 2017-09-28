const Employee = require('./employee')
const Patients = require('./patient')
var Table = require('cli-table2');
 
// /* instantiate cli table */
var tablePatient = new Table({
    head: ['Name', 'Diagnosa']
  , colWidths: [20, 30]
})

var tableEmployee = new Table({
    head: ['No', 'Name', 'Posision']
  , colWidths: [6, 30, 30]
});

// /* import data employee */
let fs = require('fs')
let strEmployee = JSON.parse(fs.readFileSync('data_employee.json'))
let strPatient = JSON.parse(fs.readFileSync('data_patient.json'))

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
		  		console.log('login success')
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

	// *** admin page ***
	static adminPage(name){
		console.log(`-------------------------------------------\nWelcome, ${Employee.yourNameIs(name)}. Your access level is: ADMIN\n-------------------------------------------`)
		console.log(`\nOptions:\n1. view_employee\n2. list_doctor\n3. add_doctor\n4. remove_doctor\n5. list_patients\n6. view_records <patient_id>\n7. view_record <employee_id>\n8. logout\n`)
		rl.question(`What would you like to do? `, (answer) => {
		  	switch(answer){
		  		case '1' : this.viewEmployee();break;
		  		case '2' : this.listDoctor();break;
		  		case '3' : this.addDoctor();break;
		  		case '4' : this.removeDoctor();break;
		  		case '5' : this.listPatient();break;
		  		case '6' : this.viewRecordPatients();break;
		  		case '7' : this.viewRecordEmploye();break;
		  		case '8' : this.login();break;
		  	}	
			})
	}

	// admin page : view employee
	static viewEmployee(){
		for(let i = 0; i<strEmployee.length; i++){
			console.log(`${i+1}. Name: ${strEmployee[i].name} | Position: ${strEmployee[i].position}`)
		}
		this.adminPage()
	}

	// admin page : list doctor
	static listDoctor(){
		for(let i = 0; i<strEmployee.length; i++){
			if(strEmployee[i].position === 'doctor'){
				console.log(`${i+1}. ${strEmployee[i].name}`)

			}
		}
		this.adminPage()
	}

	// admin page : add doctor
	static addDoctor(){
		rl.question('Name: ', (name) => {
  		rl.question('Position: ', (position) => {
	  		rl.question('Username: ', (username) => {
		  		rl.question('Password: ', (password) => {
		  		
		  		let addListEmployee = new Employee(name, position, username, password)
		  		strEmployee.push(addListEmployee)
		  		let save = JSON.stringify(strEmployee)
		  
		  		fs.writeFile('data_employee.json', save,(err, saved)=>{
						if(err){
							console.log(`data "${name}" not save`)
						}else{
							console.log(`Added "${name}" to data employee...`)
							this.adminPage()
						}
					})

					});
				});
			});
		});
		
	}

	// admin page : remove doctor
	static removeDoctor(){
		for(let i = 0; i<strEmployee.length; i++){
			if(strEmployee[i].position === 'doctor'){
				console.log(`${i+1}. ${strEmployee[i].name}`)

			}
		}

		rl.question('Number delete : ', (answer) => {
			
  		let forDelete = strEmployee.splice((answer-1))
  		console.log(forDelete.name)
			let deleted = JSON.stringify(strEmployee)

			fs.writeFile('data_employee.json', deleted,(err, saved)=>{
				if(err){
					console.log('failed to delete your Doctor')
				}else{
					console.log(`Deleted from your data employee...`)
					this.adminPage()
				}
			})

		});
	}

	// admin page : list patient
	static listPatient(){
		for(let i = 0; i<strPatient.length; i++){
			console.log(`${i+1}. Name: ${strPatient[i].name} | Diagnosa: ${strPatient[i].diagnosa}`)
		}
		this.adminPage()
	}

	// admin page : view record patient[id]
	static viewRecordPatients(){
		for(let i=0; i<strPatient.length; i++){
			tablePatient.push([strPatient[i].name, strPatient[i].diagnosa])
		}
		console.log(tablePatient.toString())
		this.adminPage()
	}

	// admin page : view record employee
	static viewRecordEmploye(){
		for(let i=0; i<strEmployee.length; i++){
			tableEmployee.push([(i+1), strEmployee[i].name, strEmployee[i].position])
		}
		console.log(tableEmployee.toString())
		this.adminPage()
	}




	// ** doctor page **
	static doctorPage(name){
		console.log(`-------------------------------------------\nWelcome, ${Employee.yourNameIs(name)}. Your access level is: DOCTOR\n-------------------------------------------`)
		console.log('\nOptions:\n1. list_patients\n2. view_records <patient_id>\n3. add_record <patient_id>\n4. remove_record <patient_id> <record_id>\n5. logout\n')
		rl.question(`What would you like to do? `, (answer) => {
		  	switch(answer){
		  		case '1' : this.login();break;
		  		case '2' : this.login();break;
		  		case '3' : this.login();break;
		  		case '4' : this.login();break;
		  		case '5' : this.login();break;
		  	}	
			})
	}

	static officeBoyPage(name){
		console.log(`-------------------------------------------\nWelcome, ${Employee.yourNameIs(name)}. Your access level is: OFFICE BOY\n-------------------------------------------`)
		console.log(`\nOptions:\n1. logout\n`)
			rl.question('What would you like to do? ', (answer) => {
		  	switch(answer){
		  		case '1' : this.login();break;
		  	}	
			})
		
	}

  



}


Hospital.login()
//Hospital.adminPage()


module.exports = Hospital
