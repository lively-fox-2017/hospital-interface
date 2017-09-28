class Employee {
  constructor(id, name, position, username, password) {
    this.id = id
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }

  set staf(arraydata) {
    let data = arraydata.split(';');
    this.id = data[0]
    this.name = data[1]
    this.position = data[2]
    this.username = data[3]
    this.password = data[4]
  }
}

module.exports = Employee
