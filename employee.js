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
  		//console.log(data[j].password)
  		//console.log('*************' + input_pass)
  		if(input_pass === data[j].password){
  			result.push(data[j].password)
  		}
  	}
  	//console.log(result.join())
  	return result.join() 
  }

  static auth_position(input_username){
  	let result = []

  	for(let k = 0; k< data.length; k++){
  		//console.log('======' + data[k].username)
  		//console.log(input_username)
  		if(input_username === data[k].username){
  			result.push(data[k].position)
  		}
  	}
  	//console.log(result.join())
  	return result.join()
  }

  static yourNameIs(name){
  	let result = []

  	for(let l = 0; l< data.length; l++){
  		//console.log('======' + data[k].username)
  		//console.log(input_username)
  		if(name === data[l].username){
  			result.push(data[l].name)
  		}
  	}
  	//console.log(result.join())
  	return result.join()
  }

}

// Employee.auth_userName()
// Employee.auth_passWord()
// Employee.auth_position()
//Employee.yourNameis()
module.exports = Employee
