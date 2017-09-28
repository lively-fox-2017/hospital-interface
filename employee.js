class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }
}

let ArrEmp = []
let admin = new Employee('Hary', 'administrator', 'hary', 'hary');
let dokter = new Employee('Prana', 'doctor', 'prana', 'prana');
let ob = new Employee('Chandra', 'officeboy', 'candra', 'candra')
ArrEmp.push(admin)
ArrEmp.push(dokter)
ArrEmp.push(ob)
let Pegawai = ArrEmp

module.exports = Employee
