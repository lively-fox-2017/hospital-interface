const fs = require('fs')
class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }
  static getAll(cb) {
  	fs.readFile('employees.json','utf-8',(err,user) => {
  		if(!err){
  			let data = JSON.parse(user)
  			cb(data)
  		}
  	})
  }
  static getJum(cb) {
  	Employee.getAll(data => {
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
  	Employee.getAll(data => {
  		let id = data.length + 1
  		data.forEach(i => {
  			temp.push(i)
  		})
  		obj['id'] = id;
  		obj['username'] = input[0]
  		obj['password'] = input[1]
  		obj['position'] = input[2]
  		temp.push(obj)
  		let str = JSON.stringify(temp)
  		fs.writeFile('employees.json',str,(err,data)=>{
  			if(!err)cb('New employee add !')
  		})
  	})
  }
  static removeData(id, cb) {
  	let temp = []
  	let count = 1
  	Employee.getAll(data => {
  		data.forEach(i => {
  			if(i.id != id){
			  	let obj = {}
  				obj['id'] = count
  				obj['username'] = i.username
  				obj['password'] = i.password
  				obj['position'] = i.position
  				temp.push(obj)
  				count ++
  			}
  		})
  		let str = JSON.stringify(temp)
  		fs.writeFile('employees.json',str,(err,data)=>{
  			if(!err)cb('New employee removed !')
  		})
  	})
  }
  static getUsername(username,cb) {
  	Employee.getAll(data => {
  		data.forEach(user => {
  			if(username == user.username){
  				cb(user)
  			}else{
  				cb(false)
  			}
  		})
  	})
  }
  static getPassword(username,password,cb) {
  	Employee.getAll(data => {
  		data.forEach(user => {
  			if(username == user.username && password == user.password){
  				cb(user)
  			}else{
  				cb(false)
  			}
  		})
  	})
  }
  static listEmployees(cb) {
  	Employee.getAll(data => {
  		let line = ''
  		let res = ''
  		for(let l = 0;l < 50;l++){
  			line += '-'
  		}
  		res += '\nList Employees :\n'
  		res += line+'\n'
  		res += 'ID | Username | Password | Position \n'
  		res += line+'\n'
  		data.forEach(i => {
	  		res += i.id+' | '+i.username+' | '+i.password+' | '+i.position
	  		res += '\n'
  		})
  		res += line+'\n'
  		cb(res)
  	})
  }
}

module.exports = Employee
