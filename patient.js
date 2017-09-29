const fs = require('fs')
class Patient {
  constructor(id, name, diagnosis) {
    this.id = id
    this.name = name
    this.diagnosis = diagnosis
  }
  static getAll(cb) {
  	fs.readFile('patients.json','utf-8',(err,user) => {
  		if(!err){
  			let data = JSON.parse(user)
  			cb(data)
  		}
  	})
  }
  static getJum(cb) {
  	Patient.getAll(data => {
  		let c = 0
  		data.forEach(i=>{
  			c ++
  		})
  		cb(c)
  	})
  }
  static addData(input, cb) {
  	let temp = []
  	let obj = {}
  	Patient.getAll(data => {
  		let id = data.length + 1
  		data.forEach(i => {
  			temp.push(i)
  		})
  		obj['id'] = id;
  		obj['name'] = input[0]
  		obj['tlp'] = input[1]
  		obj['diagnosis'] = ""
  		temp.push(obj)
  		let str = JSON.stringify(temp)
  		fs.writeFile('patients.json',str,(err,data)=>{
  			if(!err)cb('New patient add !')
  		})
  	})
  }
  static removeData(id, cb) {
  	let temp = []
  	let count = 1
  	Patient.getAll(data => {
  		data.forEach(i => {
  			if(i.id != id){
			  	let obj = {}
  				obj['id'] = count
  				obj['name'] = i.name
  				obj['tlp'] = i.tlp
  				obj['diagnosis'] = i.diagnosis
  				temp.push(obj)
  				count ++
  			}
  		})
  		let str = JSON.stringify(temp)
  		fs.writeFile('patients.json',str,(err,data)=>{
  			if(!err)cb('New patients removed !')
  		})
  	})
  }
  static addRecord(input,cb) {
  	let temp = []
  	let obj = {}
  	Patient.getAll(data => {
  		let id = data.length + 1
  		obj['id'] = input[0];
  		data.forEach(i => {
  			temp.push(i)
  			if(i.id == input[0]){
  				obj['name'] = i.name
  				obj['tlp'] = i.tlp
  			}
  		})
  		obj['diagnosis'] = input[1]
  		temp.push(obj)
  		let str = JSON.stringify(temp)
  		fs.writeFile('patients.json',str,(err,data)=>{
  			if(!err)cb('New patient add !')
  		})
  	})
  }
  static removeRecord(id, cb) {
  	let temp = []
  	let count = 1
  	Patient.getAll(data => {
  		data.forEach(i => {
  			if(i.id != id){
			  	let obj = {}
  				obj['id'] = count
  				obj['name'] = i.name
  				obj['tlp'] = i.tlp
  				obj['diagnosis'] = i.diagnosis
  				temp.push(obj)
  				count ++
  			}
  		})
  		let str = JSON.stringify(temp)
  		fs.writeFile('patients.json',str,(err,data)=>{
  			if(!err)cb('New patients removed !')
  		})
  	})
  }
  static list(cb) {
  	Patient.getAll(data => {
  		let line = ''
  		let res = ''
  		for(let l = 0;l < 50;l++){
  			line += '-'
  		}
  		res += '\nList Patients :\n'
  		res += line+'\n'
  		res += 'ID | Name | No.Tlp  \n'
  		res += line+'\n'
  		data.forEach(i => {
	  		res += i.id+' | '+i.name+' | '+i.tlp
	  		res += '\n'
  		})
  		res += line+'\n'
  		cb(res)
  	})
  }
  static viewRecord(id,cb) {
  	Patient.getAll(data => {
  		let line = ''
  		let res = ''
  		for(let l = 0;l < 50;l++){
  			line += '-'
  		}
  		res += '\nList Patients :\n'
  		res += line+'\n'
  		res += 'Patient ID : '+id+'\n'
  		res += line+'\n'
  		res += 'ID | Name | Diagnosis \n'
  		res += line+'\n'
  		if(data.length > 0){
	  		data.forEach(i => {
	  			if(i.id == id && i.diagnosis != ''){
			  		res += i.id+' | '+i.name+' | '+i.diagnosis
			  		res += '\n'
		  		}
	  		})
  		}
  		else {
			res += '\n'
			res += 'Data not found !'
			res += '\n'
		}
  		res += line+'\n'
  		cb(res)
  	})
  }
}

module.exports = Patient
