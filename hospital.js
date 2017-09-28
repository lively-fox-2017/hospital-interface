const fs = require("fs");
const readline = require("readline");
const Employee = require("./employee");
const Patient = require("./patient");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Hospital {
  constructor(name, location, employees, patients) {
	this.name = name;
    this.employees = employees;
    this.patients = patients;
    this.location = location;
	this.tempPosition = null;
  }
  
  welcomeScreen() {
	console.log(" -----------------------");
	console.log(`| Welcome to ${this.name} |`);
	console.log(" -----------------------");
  }
  
  loginUsername() {
	let that = this;
	rl.question(">Please enter your username : ", (answer) => {
		for (let i = 0; i < that.employees.length; i++) {
			if (answer === that.employees[i].username) {
				that.loginPassword(that.employees[i].id, that.employees[i].username, that.employees[i].position, that.employees[i].password);
			}
		}
		
		that.loginUsername();
	});
  }
  
  loginPassword(id, username, position, password) {
	let that = this;
	rl.question('>Please enter your password : ', (answer) => {
		if (answer === password) {
			console.log("\n>-------------------------------------------------------------");
			console.log(`>Welcome, ${username}. Your access level is : `,position.toUpperCase());
			console.log(">-------------------------------------------------------------");
			that.tempPosition = position;
			switch (position) {
				case "admin":
					that.menuAdmin();
					break;
				case "doctor":
					that.menuDoctor();
					break;
				case "officeboy":
					that.menuOfficeBoy;
					break;
			}
		} else {
			console.log("~~Sorry password is invalid");
			return that.loginPassword(id, username, position, password);
		}
	});
  }
  
  menuAdmin() {
	let that = this;
	console.log("\n>Options :");
	console.log(">[1] List_Employees");
	console.log(">[2] View_record_employee");
	console.log(">[3] Add_record_employee");
	console.log(">[4] Remove_record_employee");
	console.log(">[5] List_patients");
	console.log(">[6] View_record_patient");
	console.log(">[7] Add_record_patient");
	console.log(">[8] Remove_record_patient");
	console.log(">[9] Logout");
	rl.question("\n>What would you like to do? ", (input)=>{
		input = input.split(" ");
		switch (input[0]) {
			case "1":
				that.listEmployees(input[1]);
				break;
			case "2":
				that.viewRecord_employee(input[1]);
				break;
			case "3":
				that.addRecord_employee(input[1]);
				break;
			case "4":
				that.remove_record_employee(input[1]);
				break;
			case "5":
				that.listPatients(input[1]);
				break;
			case "6":
				that.viewRecord_patient(input[1]);
				break;
			case "7":
				that.addRecord_patient(input[1]);
				break;
			case "8":
				that.remove_record_patient(input[1]);
				break;
			case "9":
				that.logout(input[1]);
				break;
			default:
				that.errLog();
				that.menuAdmin();
				break;
		}
	});
  }
  
  menuDoctor() {
	let that = this;
	console.log("\n>Options :");
	console.log(">[1] List_patients");
	console.log(">[2] View_records");
	console.log(">[3] Add_record");
	console.log(">[4] Remove_record");
	console.log(">[5] Logout");
	rl.question("\n>What would you like to do? ", (input)=>{
		input = input.split(" ");
		switch (input[0]) {
			case "1":
				that.listPatients(input[1]);
				break;
			case "2":
				that.viewRecord_patient(input[1]);
				break;
			case "3":
				that.addRecord_patient(input[1]);
				break;
			case "4":
				that.remove_record_patient(input[1]);
				break;
			case "5":
				that.logout(input[1]);
				break;
			default:
				that.errLog();
				that.menuDoctor();
				break;
		}
	});
  }
  
  menuOB() {
	let that = this;
	console.log("\n>Options :");
	console.log(">[1] Logout");
	rl.question("\n>What would you like to do? ", (input)=>{
		input = input.split(" ");
		if (input[0] === "1") {
			that.logout(input[1]);
		} else {
			that.errLog();
			return that.menuOB();
		}
	});
  }
  
  listEmployees(inputErr) {
	if (inputErr) {
		this.errLog();
		return this.menuAdmin();
	} else {
		console.log("\n> -----------------------------------------------------");
		console.log(">| ID | Employee Name | Position | Username | Password |");
		console.log("> -----------------------------------------------------");
		for (let i = 0; i < this.employees.length; i++) {
			console.log("> "+this.employees[i].id+" | "+this.employees[i].name+" | "+this.employees[i].position+" | "+this.employees[i].username+" | "+this.employees[i].password);
		}
			
		return this.menuAdmin();
	}
  }
  
  listPatients(inputErr) {
	if (inputErr) {
		this.errLog();
		if (this.tempPosition === "doctor") {
			return this.menuDoctor();
		} else {
			return this.menuAdmin();
		}
	} else {
		console.log("\n> ---------------------------");
		console.log(">| ID | Nama Pasien | Diagnosis |");
		console.log("> ---------------------------");
		if (this.patients.length !== 0) {
			for (let i = 0; i < this.patients.length; i++) {
				console.log("> "+this.patients[i].id+" | "+this.patients[i].name+" | "+this.patients[i].diagnosis);
			}
			
			if (this.tempPosition === "doctor") {
				return this.menuDoctor();
			} else {
				return this.menuAdmin();
			}
		} else {
			console.log("~~Belum ada Pasien");
			if (this.tempPosition === "doctor") {
				return this.menuDoctor();
			} else {
				return this.menuAdmin();
			}
		}
	}
  }
  
  viewRecord_employee(inputErr) {
	let that = this;
	if (inputErr) {
		this.errLog();
		return this.menuAdmin();
	} else {
		rl.question(">Id Employee yang ingin ditampilkan : ", (answerID)=>{
			for (let i = 0; i < that.employees.length; i++) {
				if (answerID === that.employees[i].id.toString()) {
					console.log("\n> -----------------------------------------------------");
					console.log(">|  ID | Employee Name | Position | Username | Password  |");
					console.log("> -----------------------------------------------------");
					console.log(`> ${that.employees[i].id} | ${that.employees[i].name} | ${that.employees[i].position} | ${that.employees[i].username} | ${that.employees[i].password}`);
					return that.menuAdmin();
				}
			}
			
			that.errLog();
			
			return that.menuAdmin();
		});
	}
  }
  
  viewRecord_patient(inputErr) {
	let that = this;
	if (inputErr) {
		this.errLog();
		if (this.tempPosition === "doctor") {
			return this.menuDoctor();
		} else {
			return this.menuAdmin();
		}
	} else {
		rl.question(">Id pasien yang ingin ditampilkan : ", (answerID)=>{
			for (let i = 0; i < that.patients.length; i++) {
				if (answerID === that.patients[i].id.toString()) {
					console.log("\n> ---------------------------");
					console.log(">| ID | Nama Pasien | Diagnosis |");
					console.log("> ---------------------------");
					console.log(`> ${that.patients[i].id} | ${that.patients[i].name} | ${that.patients[i].diagnosis}`);
					if (that.tempPosition === "doctor") {
						return that.menuDoctor();
					} else {
						return that.menuAdmin();
					}
				}
			}
			
			that.errLog();
			if (this.tempPosition === "doctor") {
				return that.menuDoctor();
			} else {
				return that.menuAdmin();
			}
		});
	}
  }
  
  addRecord_employee(inputErr) {
	let that = this;
	if (inputErr) {
		this.errLog();
		return this.menuAdmin();
	} else {
		this.addRecord_employee_name();
	}
  }
  
  addRecord_employee_name() {
	let that = this;
	rl.question("\nInput 9 here for back to menu\n>Employee Name : ", (nameAnswer)=>{
		if (nameAnswer === "9"){
			return that.menuAdmin();
		} else if (nameAnswer) {
			that.addRecord_employee_position(nameAnswer);
		} else {
			that.errLog();
			return that.addRecord_employee_name();
		}
	});
  }
  
  addRecord_employee_position(name) {
	let that = this;
	rl.question(">Employee Position : ", (positionAnswer)=>{
		if (positionAnswer) {
			that.addRecord_employee_username(name, positionAnswer);
		} else {
			that.errLog();
			return that.addRecord_employee_position(name);
		}
	});
  }
  
  addRecord_employee_username(name, position) {
	let that = this;
	rl.question(">Username : ", (usernameAnswer)=>{
		if (usernameAnswer) {
			that.addRecord_employee_password(name, position, usernameAnswer);
		} else {
			that.errLog();
			return that.addRecord_employee_username(name, position);
		}
	});
  }
  
  addRecord_employee_password(name, position, username) {
	let that = this;
	rl.question(">Password : ", (passwordAnswer)=>{
		if (passwordAnswer) {
			let incId = that.employees.length+1;
			that.employees.push({id:incId, name:name, position:position.toLowerCase(), username:username, password:passwordAnswer});
			fs.writeFileSync("employees.json", JSON.stringify(that.employees, null, 2));
			console.log("\n~~Berhasil menambah data employee");
			return that.menuAdmin();
		} else {
			that.errLog();
			return that.addRecord_employee_password(name, position, username);	
		}
	});
  }
  
  addRecord_patient(inputErr) {
	let that = this;
	if (inputErr) {
		this.errLog();
		if (this.tempPosition === "doctor") {
			return this.menuDoctor();
		} else {
			return this.menuAdmin();
		}
	} else {
		that.addRecord_patient_name();
	}
  }
  
  addRecord_patient_name() {
	let that = this;
	rl.question("\nInput 9 here for back to menu\n>Patient Name : ", (nameAnswer)=>{
		if (nameAnswer === "9") {
			if (that.tempPosition === "doctor") {
				return that.menuDoctor();
			} else {
				return that.menuAdmin();
			}
		} else if (nameAnswer) {
			that.addRecord_patient_diagnose(nameAnswer);
		} else {
			that.errLog();
			return that.addRecord_patient_name();
		}
	});
  }
  
  addRecord_patient_diagnose(name) {
	let that = this;
	rl.question(">Patient Diagnose : ", (diagnoseAnswer)=>{
		if (diagnoseAnswer) {
			let incId = that.patients.length+1;
			that.patients.push({id:incId, name:name, diagnosis:diagnoseAnswer});
			fs.writeFileSync("patients.json", JSON.stringify(that.patients, null, 2));
			console.log("\n~~Berhasil menambah data pasien");
			if (that.tempPosition === "doctor") {
				return that.menuDoctor();
			} else {
				return that.menuAdmin();
			}
		} else {
			that.errLog();
			return that.addRecord_patient_diagnose(name);
		}
	});
  }
  
  remove_record_employee(inputErr) {
	let that = this;
	if (inputErr) {
		this.errLog();
		return this.menuAdmin();
	} else {
		rl.question(">Id employee yang ingin dihapus : ", (answerID)=>{
			for (let i = 1; i < that.employees.length; i++) {
				if (answerID === that.employees[i].id.toString()) {
					that.employees.splice(i, 1);
					console.log("\n~~Data employee berhasil dihapus");
					fs.writeFileSync("employees.json", JSON.stringify(that.employees, null, 2));
					return that.menuAdmin();
				}
			}
			
			that.errLog();
			return that.menuAdmin();
		});
	}
  }
  
  remove_record_patient(inputErr) {
	let that = this;
	if (inputErr) {
		this.errLog();
		if (this.tempPosition === "doctor") {
			return this.menuDoctor();
		} else {
			return this.menuAdmin();
		}
	} else {
		rl.question(">Id pasien yang ingin dihapus : ", (answerID)=>{
			for (let i = 0; i < that.patients.length; i++) {
				if (answerID === that.patients[i].id.toString()) {
					that.patients.splice(i, 1);
					console.log("\n~~Data pasien berhasil dihapus");
					fs.writeFileSync("patients.json", JSON.stringify(that.patients, null, 2));
					if (that.tempPosition === "doctor") {
						return that.menuDoctor();
					} else {
						return that.menuAdmin();
					}
				}
			}
			
			that.errLog();
			if (that.tempPosition === "doctor") {
				return that.menuDoctor();
			} else {
				return that.menuAdmin();
			}
		});
	}
  }
  
  logout(inputErr) {
	if (inputErr) {
		this.errLog();
		if (this.tempPosition === "doctor") {
			return this.menuDoctor();
		} else if (this.tempPosition === "admin") {
			return this.menuAdmin();
		} else {
			return this.menuOB();
		}
	} else {
		return this.loginUsername();
	}
  }
  
  errLog() {
	console.log("\n~~Maaf input salah");
  }
}
// -------------------------------------------------------------------------------//



// Pengecekan File JSON patients
let readPatients = fs.readFileSync("patients.json", "utf8");
if (readPatients.length === 0) {
	fs.writeFileSync("patients.json", JSON.stringify([], null, 2));
	readPatients = JSON.parse(fs.readFileSync("patients.json", "utf8"));
} else {
	readPatients = JSON.parse(fs.readFileSync("patients.json", "utf8"));
}

let arrPatient = [];
for (let i = 0; i < readPatients.length; i++) {
	let patients = new Patient(readPatients[i].id, readPatients[i].name, readPatients[i].diagnosis);
	arrPatient.push(patients);
}
	
let readEmployees = JSON.parse(fs.readFileSync("employees.json", "utf8"));
let arrEmployees = [];
for (let i = 0; i < readEmployees.length; i++) {
	let employees = new Employee(readEmployees[i].id, readEmployees[i].name, readEmployees[i].position, readEmployees[i].username, readEmployees[i].password);
	arrEmployees.push(employees);
}
// ------------------------------------------------------------------------------- //

let hospital = new Hospital("K-Hospital", "Depok", arrEmployees, arrPatient);
hospital.welcomeScreen();
hospital.loginUsername();

rl.on("close", ()=>{
	console.log("\n------------------------------------------------------");
	console.log("---------Thanks For using this Simple APP-------------");
	console.log("------------------------------------------------------");
});

module.exports = Hospital
