let fs = require('fs')
let dataEmployees = JSON.parse(fs.readFileSync('employees.json', 'utf8'))

class Employee {
  constructor(id, name, position, username, password) {
    this.id = id
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }

  static add(id, name, position, username, password) {
    let newAdm = new Employee(id, name, position, username, password)
    dataEmployees.push(newAdm)
    let data = JSON.stringify(dataEmployees)
    fs.writeFileSync('employees.json', data, 'utf8')
    return dataEmployees
  }

  static del(id) {
    for (var i = 0; i < dataEmployees.length; i++) {
      if(id == dataEmployees[i].id){
        dataEmployees.splice(i, 1)
      }
    }
    let dataDel = JSON.stringify(dataEmployees);
    fs.writeFileSync('patients.json', dataDel, 'utf8')
  }

  static showList(){
    let temp = [`id | name | position`]
    for (var i = 0; i < dataEmployees.length; i++) {
      temp.push(`${dataEmployees[i].id} | ${dataEmployees[i].name} | ${dataEmployees[i].position}`)
    }
    return temp.join('\n')
  }
}


// console.log(Admin.add('002', 'Adi Rohman', 'Admin', 'adi', 'qwerty'));
// console.log(Admin.add());

exports.class = Employee
exports.data = dataEmployees
