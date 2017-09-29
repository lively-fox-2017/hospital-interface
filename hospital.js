const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
let employee = require('./employee')
let patient = require('./patient')

class Hospital {
  constructor(name, location, patient, employee) {
    this.name = name
    this.patient = patient
    this.employee = employee
    this.location = location
  	this.username = false
  	this.password = false
  	this.user = []
    this.header()
  }
  line() {
  	let line = ''
  	for(let i=0;i < 50;i++){
  		line += '='
  	}
  	console.log('\n'+line)
  }
  header() {
  	this.clear()
  	this.line()
  	console.log(this.name)
  	console.log(this.location)
  	console.log('Jumlah pegawai : '+this.employee+', Jumlah Patients : '+this.patient)
  	this.line()
  	this.login()
  }
  midle() {
  	console.log("Selamat datang : "+this.user[0].username)
  	this.line()
  	this.menu()
  }
  menu() {
  	switch(this.user[0].position){
  		case 'admin':
		  	console.log('[1]. List Employee')
		  	console.log('[2]. Add Employee')
		  	console.log('[3]. Remove Employee')
		  	console.log('[4]. List Patient')
		  	console.log('[5]. Add Patient')
		  	console.log('[6]. Remove Patient')
		  	console.log('[7]. Exit')
  		break;
  		case 'dokter':
		  	console.log('[1]. List Patient')
		  	console.log('[2]. View Records')
		  	console.log('[3]. Add Records')
		  	console.log('[4]. Remove Records')
		  	console.log('[5]. Exit')
  		break;
  		case 'resepsionis':
		  	console.log('[1]. List Patient')
		  	console.log('[2]. Add Patient')
		  	console.log('[3]. Exit')
  		break;
  		case 'office boy':
		  	console.log('[1]. Exit')
  		break;
  	}
  	this.promptMenu()
  }
  promptMenu() {
  	switch(this.user[0].position){
  		case 'admin':
			rl.question('Please select options menu :', (option) => {
				if(option == 1){
					this.header()
					employee.listEmployees(data => {
						console.log(data)
					})
				}
				else if(option == 2){
					let temp = []
					rl.question('Input Username : ',username => {
						temp.push(username)
						rl.question('Input Password : ',password => {
							temp.push(password)
							rl.question('Input position : ',position => {
								temp.push(position)
								employee.addData(temp, res => {
									this.header()
								})
							})
						})
					})
				}
				else if(option == 3){
					rl.question('Select username ID : ',id => {
						employee.removeData(id, res => {
							this.header()
						})
					})
				}
				else if(option == 4){
					this.header()
					patient.list(data => {
						console.log(data)
					})
				}
				else if(option == 5){
					let temp = []
					rl.question('Input name : ',name => {
						temp.push(name)
						rl.question('Input No.tlp : ',tlp => {
							temp.push(tlp)
							patient.addData(temp, res => {
								this.header()
							})
						})
					})
				}
				else if(option == 6){
					rl.question('Select patient ID : ',id => {
						patient.removeData(id, res => {
							this.header()
						})
					})
				}
				else if(option == 7){
					this.exit()
				}
			});
  		break;
  		case 'dokter':
			rl.question('Please select options menu :', (option) => {
				if(option == 1){
					this.header()
					patient.list(data => {
						console.log(data)
					})
				}
				else if(option == 2){
					rl.question('Input ID patient : ',id => {
						this.header()
						patient.viewRecord(id,data => {
							console.log(data)
						})
					})
				}
				else if(option == 3){
					let temp = []
					rl.question('Input patient ID : ',id => {
						temp.push(id)
						rl.question('Input diagnosis : ',diagnosis => {
							this.header()
							temp.push(diagnosis)
							patient.addRecord(temp,data => {
								console.log(data)
							})
						})
					})
				}
				else if(option == 4){
					rl.question('Input patient ID : ',id => {
						this.header()
						patient.removeRecord(id,data => {
							console.log(data)
						})
					})
				}
				else if(option == 5){
					this.exit()
				}
			});
  		break;
  		case 'resepsionis':
			rl.question('Please select options menu :', (option) => {
				if(option == 1){
					this.header()
					patient.list(data => {
						console.log(data)
					})
				}
				else if(option == 2){
					let temp = []
					rl.question('Input name : ',name => {
						temp.push(name)
						rl.question('Input No.tlp : ',tlp => {
							temp.push(tlp)
							patient.addData(temp, res => {
								this.header()
  								this.promptMenu()
							})
						})
					})
				}
				else if(option == 3){
					this.exit()
				}
			});
  		break;
  		case 'office boy':
			rl.question('Please select options menu :', (option) => {
				if(option == 1){
					this.exit()
				}
			});
  		break;
  	}  
  }
  login() {
  	if(this.username != true){
		rl.question('   Username :', (username) => {
		  	employee.getUsername(username, (data) => {
		  		if(data != false){
					if(username == data.username){
						this.user.push(data)
						this.username = true
						this.header()
					}
					else{
						this.header()
					}
				}else{
					this.header()						
				}
	  		})
		});
  	}
  	else if(this.password != true){
		let user = this.user[0].username
		rl.question('   Password :', (password) => {
		  	employee.getPassword(user,password, data => {
				if(password == data.password){
					this.user = []
					this.user.push(data)
			 		this.password = true
					this.header()
				}
	  		})
		});
  	}
  	else{
  		this.midle()
  	}
  }
  exit() {
  	this.clear()
		rl.close()
  }
  clear(){
  	console.log("\x1B[2J")
  }
}
employee.getJum(jum_employee => {
	patient.getJum(jum_patient => {
		let hospital = new Hospital('Rs.Sumber Sehat','Jl. Pahlawan Revolusi No.210',jum_patient,jum_employee)
	})
})

module.exports = Hospital
