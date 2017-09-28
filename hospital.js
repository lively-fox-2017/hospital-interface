'use strict'
const Patient = require('./patient.js')
const Employee = require('./employee.js')
// const Menu = require('./menu.js')
const readline = require('readline')

let rl = readline.createInterface({
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

  // static getPasien(){
  // 	return this.employees
  // }

  listPasien(){
  	console.log(`========================================`)
  	console.log('Daftar nama pasien :\n')
  	for(var i = 0; i < this.patients.length; i++){
  		console.log(`id: ${this.patients[i].id}\nname: ${this.patients[i].name}\ndiagnosis: ${this.patients[i].diagnosis}\n`)
  	}
  	console.log(`========================================`)
  }

  
  cekUsername(data){
  	for(var i = 0; i < this.employees.length; i++){

  		if(this.employees[i].username === data){
  			// console.log(this.employees[i].username)
  			return true
  		}
  	}
  	return false
  }

  aksesPassword(username, password){
  	for(var i = 0; i < this.employees.length; i++){
  		if(this.employees[i].username == username && this.employees[i].password == password){
  			return true
  		}
  	}
  	return false
  }

  viewRecords(name){
  	let data = ''
  	console.log(`\n=================View Record of ${name}=======================`)
  	for(var i = 0; i < this.patients.length; i++){
  		if(this.patients[i].name === name){
  			return console.log(`id : ${this.patients[i].id}, name : ${this.patients[i].name}, diagnosis : ${this.patients[i].diagnosis}`)
  		}
  	}
  	console.log(`Data pasien atas nama ${name} tidak ada..`)
  }


  listPatients1(){
  	console.log('\n=================List Of Patient=======================')
  	for(var i = 0; i < this.patients.length; i++){
  		console.log(`id : ${this.patients[i].id}, name : ${this.patients[i].name}, diagnosis : ${this.patients[i].diagnosis}`)
  	}
  	this.askMenuLevelDokter()
  }

  listPatients2(){
  	console.log('\n=================List Of Patient=======================')
  	for(var i = 0; i < this.patients.length; i++){
  		console.log(`id : ${this.patients[i].id}, name : ${this.patients[i].name}, diagnosis : ${this.patients[i].diagnosis}`)
  	}
  	this.askMenuLevelAdmin()
  }

  cariNamaPasien1(){
  	rl.question('masukan nama pasien yang ingin di cari: ', (nama) =>{
  			this.viewRecords(nama)
  				// Menu.viewRecords(nama)
  				this.askMenuLevelDokter()
  			})
  }

  cariNamaPasien2(){
  	rl.question('masukan nama pasien yang ingin di cari: ', (nama) =>{
  			this.viewRecords(nama)
  				// Menu.viewRecords(nama)
  				this.askMenuLevelAdmin()
  			})
  }

  listEmployee(){
  	console.log('\n================= List Of Employee =======================')
  	for(var i = 0; i < this.employees.length; i++){
  		console.log(`name : ${this.employees[i].name}, position : ${this.employees[i].position}, username : ${this.employees[i].username}`)
  	}
  	this.askMenuLevelAdmin()
  }

  
  addPatient(){
  	rl.question('Masukan id pasien baru: ', (id)=>{
  		rl.question('Masukan nama pasien baru: ', (nama)=>{
			rl.question('Masukan diagnosa penyakit', (diagnosa)=>{
				this.patients.push(new Patient(id, nama, diagnosa))
				console.log('data telah dibuat')
				this.askMenuLevelAdmin()
			})
  		})
  	})
  }

  addKaryawan(){
  	rl.question('Masukan nama karyawan: ', (nama)=>{
  		rl.question('Masukan posisi karyawan: ', (posisi)=>{
			rl.question('Masukan username karyawan: ', (username)=>{
				rl.question('Masukan password karyawan: ', (password)=>{
					this.employees.push(new Employee(nama, posisi, username, password))
					console.log('data karyawan baru telah di buatkan')
					this.askMenuLevelAdmin()
				})
				
			})
  		})
  	})
  }

  removeKaryawan(){
  	rl.question('Masukan nama karyawan: ', (nama)=>{
  		for(let i = 0; i < this.employees.length; i++){
  			if(this.employees[i].name === nama){
  				this.employees.splice(i, 1)
  			}
  		}
  		console.log('data telah dihapus')
  		this.askMenuLevelAdmin()
  	})
  }

  removePatient(){
  	rl.question('Masukan nama pasien: ', (nama)=>{
  		for(let i = 0; i < this.patients.length; i++){
  			if(this.patients[i].name === nama){
  				this.patients.splice(i, 1)
  			}
  		}
  		console.log('data telah dihapus')
  		this.askMenuLevelAdmin()
  	})
  }
  

  askMenuLevelAdmin(){
  	rl.question('\nmasukan pilihan : ', (number)=>{
  		switch(number){
  			case '1' :
  				this.listPatients2()
  				break;
  			case '2' :
  				this.cariNamaPasien2()
  				break;
  			case '3' :
  				this.addPatient()
  				break;
  			case '4' :
  				this.removePatient()
  				break;
  			case '5' :
  				this.listEmployee()
  				break;
  			case '6' :
  				this.addKaryawan()
  				break;
  			case '7' :
  				this.removeKaryawan()
  				break;
  			case '0':
  			rl.close()
  			break;

  			default : 
  			console.log('Pilihan menu tidak ada..')
  			this.askMenuLevelAdmin()
  			break;
  		}
  	})
  }

  askMenuLevelDokter(){
  	rl.question('\nmasukan pilihan : ', (number)=>{
  		switch(number){
  			case '1':
  				this.listPatients1()
  				break;
  			case '2':
  				this.cariNamaPasien1()
  				break;
  			case '0':
  				rl.close()
  				break;
  			default :
  				console.log('Pilihan menu tidak ada..')
  				this.askMenuLevelDokter()
  				break;
  		}
  	})
  }

  aksesLevelOB(){
  	console.log('What would you like to do ?')
  	console.log('Options: \n')
  	console.log('0. Logout')
  	rl.on('line', (input) => {
  		rl.close()
});
  }

  aksesLevelDokter(index){
  	let data = [0, 1, 2]
  	console.log('What would you like to do ?')
  	console.log('Options: \n')
  	console.log('1. List Patients')
  	console.log('2. View Records <patient_id>')
  	console.log('0. Logout')
  	this.askMenuLevelDokter()
  }	

  aksesLevelAdmin(){
  	console.log('What would you like to do ?')
  	console.log('Options: \n')
  	console.log('1. List Patients')
  	console.log('2. View Records <patient_id>')
  	console.log('3. Add Patient')
  	console.log('4. Remove Patient')
  	console.log('5. List Employee')
  	console.log('6. Add Employee')
  	console.log('7. Remove Employee')
  	console.log('0. Logout')
  	this.askMenuLevelAdmin()
  }


  // aksesLevel(nama){
  // 	for(var i = 0; i < this.employees.length; i++ ){
  // 		if(this.employees[i].username === nama){
  // 			console.log(`========================================`)
  // 			console.log(`Welcome ${this.employees[i].name} to the system. Your acces level is: ${this.employees[i].position}` )
  // 			console.log(`========================================`)
  // 			this.askMenu()
  // 		}
  // 	}
  // }

  aksesLevel(nama){
  	let position = ''
  	console.log(`========================================`)
  	if(nama === 'dokter'){
  		position = this.employees[0].position
  		console.log(`Welcome ${this.employees[0].name} to the system. Your acces level is: ${position}` )
  		console.log(`========================================`)
  		this.aksesLevelDokter()
  	}
  	else if(nama === 'admin'){
  		position = this.employees[1].position
  		console.log(`Welcome ${this.employees[1].name} to the system. Your acces level is: ${position}` )
  		console.log(`========================================`)
  		this.aksesLevelAdmin()
  	}
  	else{
  		position = this.employees[2].position
  		console.log(`Welcome ${this.employees[2].name} to the system. Your acces level is: ${position}` )
  		console.log(`========================================`)
  		this.aksesLevelOB()
  	}
  }

  username(){
  	  	rl.question(`Pease enter your username:\n`, (answer) => {
  		
  		if(this.cekUsername(answer) === true){
  			rl.question(`Pease enter your password:\n`, (password) => {
  				if(this.aksesPassword(answer, password) === true){
  					this.aksesLevel(answer)
  				}
  				else{
  					console.log('password salah')
  					this.username()	
  				}
  			})
  		}
  		this.username()		
  	})
  }

  menu(){
  	console.log(`Welcome to ${this.name} Hospital`)
  	console.log(`Address : ${this.location}`)
  	console.log('=================================')
  	this.username()
  }

}

module.exports = Hospital


let employee = []
let employee1 = new Employee('si A', 'Dokter', 'dokter', '1')
let employee2 = new Employee('si B', 'Admin', 'admin', '2')
let employee3 = new Employee('si C', 'OB', 'ob', '1')
employee.push(employee1, employee2, employee3)


let pasien = []
let pasien1 = new Patient('001', 'pasien A', 'jantung')
let pasien2 = new Patient('002', 'pasien B', 'flu')
pasien.push(pasien1, pasien2)

let hospital = new Hospital('OKEJEK', 'Jl. Aja dulu', employee, pasien)
hospital.menu()
