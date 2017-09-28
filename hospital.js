
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '>>'
});

let Employee = require('./employee');
let Patient = require('./patient');

class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name;
    this.employees = employees;
    this.patients = patients;
    this.location = location;
  }

  welcome() {
  	  console.log(`Welcome to ${this.name } Hospital`);
  	  console.log('----------------------------------------');
  }

  login(command, password) {
  	rl.question('#Please enter your username: ', (username) => {
  	  for (let i = 0; i < this.employees.length; i++) {
  	    if (username == this.employees[i].username) {
	  	  this.validate(this.employees[i].username, this.employees[i].password, this.employees[i].position);	
	    } 
  	  }
	  this.login(command);    
  	});
  }

  validate(username, password, position) {
  	rl.question('#Please enter your password: ', (answer) => {
  	  if (answer == password) {
  	  	this.reset_board();
	    console.log(`Welcome, ${username}. Your access level is: ${position}`);
	    this.option(position);
  	  } else {
  	    this.validate(username, password, position);
  	  }
	});
  }

  option(position) {
  	if (position == 'admin') {
  	  console.log('----------------------------------------\n' +
  		'Options:\n' +
  		'[1] list_patients\n' +
  		'[2] view_records <patients_id>\n' +
  		'[3] add_records <patients_id>\n' +
  		'[4] remove_records <patients_id> <record_id>\n' +
  		'[5] logout');
  	  this.adminTodo();
  	} else if (position == 'dokter') {
  	  console.log('----------------------------------------\n' +
  		'Options:\n' +
  		'[1] list_patients\n' +
  		'[2] view_patients <patients_id>\n' +
  		'[3] add_patients <patients_name> <patients_diagnosis>\n' +
  		'[4] remove_patients <patients_id>\n' +
  		'[5] logout');
  	  this.dokterTodo();
  	} else {
  	  console.log('----------------------------------------\n' +
  		'Options:\n' +
  		'- logout');
  	  rl.prompt();
  	}
  }

  dokterTodo() {
  	rl.question('\n' + 'What would you like to do? ', (answer) => {
  	  if (answer == '1') {
  	  	this.list_patients();
  	  } else if (answer == '2') {
  	  	this.view_records();
  	  } else if (answer == '3') {
  	  	this.add_patients();
  	  } else if (answer == '4') {
  	  	this.delete_patients();
  	  } else if (answer == '5') {
  	  	this.reset_board()
  	  	this.welcome();
		this.login();
  	  }
  	});
  }

  adminTodo() {
  	rl.question('\n' + 'What would you like to do? ', (answer) => {
  	  if (answer == '1') {
  	  	this.list_patients();
  	  } else if (answer == '2') {
  	  	this.view_records();
  	  } else if (answer == '3') {
  	  	this.add_patients();
  	  } else if (answer == '4') {
  	  	this.delete_patients();
  	  } else if (answer == '5') {
  	  	this.reset_board()
  	  	this.welcome();
		this.login();
  	  }
  	});
  }

  list_patients() {
  	this.reset_board();
  	console.log(this.patients);
  	this.dokterTodo();
  }

  view_records() {
  	rl.question('input patient id: ', (answer) => {
  	  for (let i = 0; i < this.patients.length; i++) {
  	    if (answer == this.patients[i].id) {
  	      this.reset_board();
  	  	  console.log(this.patients[i]);
  	  	  this.dokterTodo();
  	    }
  	  }
    });
  }

  add_patients() {
  	rl.question('input patient name: ', (name) => {
  	  rl.question('input patient diagnosis: ', (diagnosis) => {
  	  	let baru = new Patient(this.patients.length + 1, name, diagnosis);
  	  	this.patients.push(baru);
  	  	this.reset_board()
  	  	console.log(this.patients);
  	  	this.dokterTodo();
  	  });
  	});
  }

  delete_patients() {
  	rl.question('input patient id: ', (id) => {
  	  let arrPatients = [];
	  for (var i = 0; i < this.patients.length; i++) {
		if (id != this.patients[i].id) {
		  arrPatients.push(this.patients[i]);
		}
	  }
	  this.patients = arrPatients;
	  this.reset_board()
	  console.log(this.patients);
  	  this.dokterTodo();
  	});
  }

  reset_board() {
    console.log('\x1B[2J');
  }
}

// array of object employees
let arrEmployees = [];
let employee1 = new Employee('azhari', 'admin', 'azhari', 'azhari');
let employee2 = new Employee('zuhri', 'dokter', 'zuhri', 'zuhri');
let employee3 = new Employee('somad', 'dokter', 'somad', 'somad');
arrEmployees.push(employee1, employee2, employee3);

// array of object patients
let arrPatients = [];
let patients1 = new Patient(1, 'davina', 'batuk');
let patients2 = new Patient(2, 'asiyah', 'pilek');
let patients3 = new Patient(3, 'ayub', 'demam');
arrPatients.push(patients1, patients2, patients3);

let hospital = new Hospital('Tiada Harapan', 'Jakarta Selatan', arrEmployees, arrPatients);
hospital.welcome();
hospital.login();

// hospital.patients.push(new Patient(4, 'abc', 'def'));


module.exports = Hospital