const Hospital = require('./hospital')

// /* import data employee */
let fs = require('fs')
let data = JSON.parse(fs.readFileSync('data_employee.json'))
//console.log(data)

class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }

  static auth_userName(input){
  	//console.log(data[1].username)
  	let result = []

  	for(let i = 0; i < data.length; i++){
  		//console.log(data[i].username)
  		if(input === data[i].username){
  			result.push(data[i].username)
  		}
  	}
  		return result.join()
  }

  static auth_passWord(input_pass){
  	let result = []

  	for(let j = 0; j < data.length; j++){
  		// console.log(data[j].password)
  		// console.log('*************' + input_pass)
  		if(input_pass === data[j].password){
  			result.push(data[j].password)
  		}
  	}
  	//console.log(typeof(result.join()))
  	return result.join() 
  }

}

Employee.auth_userName()
Employee.auth_passWord()
module.exports = Employee
