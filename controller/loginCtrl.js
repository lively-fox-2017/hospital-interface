const Login = require('../views/login');
const Hospital = require('../models/hospital');
const MenuCtrl = require('./menuCtrl');
const rl = require('../views/template');

class LoginCtrl {
  constructor() {
    this.hospital = new Hospital('RS. Susah Sakit', 'Jl. Liang Lahat', '../employees.json', '../patients.json');
  }

  index() {
    let login = new Login(rl);
    login.loginView(this.hospital, (username, password) => {
      let employee = this.hospital.credentialCheck(username, password);
      if (employee) {
        console.log(`Welcome, ${employee.name}. Your access level is ${employee.position}`);
        this.menuCtrl = new MenuCtrl(rl, this.hospital);
        this.menuCtrl.index(employee);
      } else {
        console.log('\nWrong Username or Password. Please Try Again');
        this.index();
      }
    });
  }
}

let tes = new LoginCtrl();
tes.index();

module.exports = LoginCtrl;
