const readline = require('readline')
const Patients = require('./patient.js')
const Employee = require('./employee.js')
const rl = readline.createInterface({
  		input: process.stdin,
  		output: process.stdout,
  		prompt: ':> '
	});


class Hospital {
  constructor(name, employees, patients, location) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
  }

  mulai(){

	let askPass = (input, pass) => {

		let uname = input

		rl.question('Please enter your password :', (input1) => {
 		 		if(input1 === pass.password){
 		 			this.menu(uname, pass)	
 		 		}else{
 		 			askPass(input)
 		 		}
	})

	}

	let askUser = () => {
		rl.question('Masukkan username anda :', (input) => {

			function filter_name(a) {
    		return a.username == input
			}

			var filtered = this.employees.filter(filter_name)

 			if(filtered[0] != undefined){
 		 		askPass(input, filtered[0])
 			}else{
 		 		askUser()
 			}
		})
	}
	
	askUser()
  }

  createPatient(name, age, diagnose) {
  	this.patients[0] = new Patients(0, name, age, diagnose)

  	console.log(this.patients)

  	return this
  }

  createEmploye(name, obj) {

  	let namapengguna = ''
  	let katasandi = ''
  	let namalengkap = ''
  	let posisi = ''
  	let temp = []
  	let acclevel = 0

  	rl.question('Masukkan username pegawai baru :', (inputun) => {
 		 	namapengguna = inputun
 		 		rl.question('Masukkan password pegawai baru :', (inputpass) => {
 			 		katasandi = inputpass
 			 			rl.question('Masukkan nama lengkap pegawai :', (inputname) => {
 		 					namalengkap = inputname
 		 						rl.question('Masukin posisi :', (inputpos) => {
 		 							posisi = inputpos


 		 							if(posisi === 'Admin'){
  									acclevel = 1
  								}else
  									if(posisi === 'Dokter'){
  										acclevel = 2
  									}else
  										if(posisi === 'Resepsionis'){
  											acclevel = 3
  										}else
  											if(posisi === 'Office Boy'){
  												acclevel = 4
  											}

  								this.employees[this.employees.length] = new Employee(namalengkap, posisi, namapengguna, katasandi, acclevel)
  								console.log('Data pegawai berhasil dimasukkan')
  								this.menu(name, obj)	
								})
						})
				})
		})
  }

  createPatien(name, obj) {

  	let idpass = ''
  	let namalengkap = ''
  	let pasage = ''
  	let sick = ''

  	rl.question('Masukkan id pasien :', (inputid) => {
 		 idpass = inputid
 		 	rl.question('Masukkan nama lengkap pasien :', (inputnama) => {
 			 	namalengkap = inputnama
 			 	rl.question('Masukkan umur pasien :', (inputage) => {
 		 			pasage = inputage
 		 			rl.question('Masukan diagnosa penakit pasien :', (inputsick) => {
 		 				sick = inputsick

  					this.patients[this.patients.length] = new Patients(idpass, namalengkap, pasage, sick)
  					console.log('Data pasien berhasil dimasukkan')
  					this.menu(name, obj)	
					})
				})
			})
		})
  }

  menu(name, obj){
  	rl.prompt();
  	let temp = []

 		console.log('----------------------------------')
 		console.log('Welcome '+name+', Your access level is : '+obj.position)
 		console.log('----------------------------------')
 		console.log('What would you like to do?')
 		console.log('Options')

 		if(obj.acclevel === '1'){
 		 	console.log('- list_employee')
 		 	console.log('- find_employee <username>')
 		 	console.log('- add_employee')
 		 	console.log('- remove_employee <username>')
 		}

 		if(obj.acclevel === '1' || obj.acclevel === '2'){
 		 	console.log('- add_patient')
 		 	console.log('- remove patient <id>')
 		}

 		if(obj.acclevel === '1' || obj.acclevel === '2' || obj.acclevel === '3'){
 			console.log('- list_patients')
 		 	console.log('- find_patients <patients id>')
 		 	console.log('- Log-Out')
 		}

 		rl.prompt();

 		rl.on('line', (input3) => {

 		 	temp = input3.trim().split(' ')

			if(obj.acclevel === '1' || obj.acclevel === '2' || obj.acclevel === '3'){
 		 		if(input3.trim() === 'Log-Out') {
  					this.mulai()
  			}

  			if(input3.trim() === 'list_patients'){
  				console.log(this.patients)
  				rl.prompt();
  			}

  			if(temp[0] === 'find_patients'){
  					
  				function filter_id(a) {
    			return a.id == temp[1]
				}

					var filtered = this.patients.filter(filter_id)
					let found = this.patients.indexOf(filtered[0])

					console.log(this.patients[found])
					rl.prompt();
  			}
  		}

			if(obj.acclevel === '1'){
  			if(input3.trim() === 'add_employee') {
  				this.createEmploye(name, obj)
  			}

  			if(input3.trim() === 'list_employee'){
  				console.log(this.employees)
  				rl.prompt();
  			}

  			if(temp[0] === 'remove_employee'){
  				function filter_user(a) {
    			return a.username == temp[1]
				}

					var filtered = this.employees.filter(filter_user)
					let found = this.employees.indexOf(filtered[0])

					this.employees.splice(found, 1)
					console.log('Data pegawai berhasil dihapus')
					rl.prompt();
  			}

  			if(temp[0] === 'find_employee'){
  				function filter_user(a) {
    			return a.username == temp[1]
				}

					var filtered = this.employees.filter(filter_user)
					let found = this.employees.indexOf(filtered[0])

					console.log(this.employees[found])
					rl.prompt();
  			}
  		}

  			if(obj.acclevel === '1' || obj.acclevel === '2'){

  				if(input3.trim() === 'add_patient'){
  					this.createPatien(name, obj)
  				}
  				
					if(temp[0] === 'remove_patient'){
  					
  					function filter_id(a) {
    					return a.id == temp[1]
						}

						var filtered = this.patients.filter(filter_id)
						let found = this.patients.indexOf(filtered[0])

						this.patients.splice(found, 1)
						console.log('data pasien berhasil dihapus')
						rl.prompt();
  				}
  			}			
		})
 	}
}

let name ='Rumah sakit mata' 
let employees = [{name : 'Ahmad Nizar', position : 'Dokter', username : 'AhmadNizar', password: 'password', acclevel : '2'},
								{name : 'Dimitri tampan', position : 'Admin', username : 'Dimitri', password: 'password', acclevel : '1'},
								{name : 'Amel Amel', position : 'Resepsionis', username : 'Amel', password: 'password', acclevel : '3'},
								]	
let patients = [{id :'1', nama : 'Bang ian', umur : 22, diagnose: 'sakit pinggang'}]

let location = 'Palembang'

let a = new Hospital(name, employees, patients, location)
a.mulai()
module.exports = Hospital
