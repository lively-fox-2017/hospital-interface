const readline = require('readline');
const Hospital = require('../models/Hospital');
const Employee = require('../models/Employee');

const DashboardController = require('./dashboard.controller');
const ListEmployeesController = require('./list-employees.controller');

const hospitalName = Hospital.fetch(['name']);

class LoginController {

  static clearScreen() {

    process.stdout.write("\x1Bc")
    console.log(`--------------------`);
    console.log(`Welcome to ${hospitalName}`);
    console.log(`--------------------`);

  }

  static promptUsername() {

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    LoginController.clearScreen();

    function initPromptUsername (err = '') {
      if (err) console.log(err);
      rl.setPrompt('# Please enter your username\n> ');
      rl.prompt();
    }

    rl.on('line', function(username) {

      LoginController.clearScreen();

      let employee = Employee.find('username', username);

      // Username found
      if (employee.length) {

        rl.close();

        LoginController.promptPassword(employee);

      } else {

        initPromptUsername(`Error: Username "${username}" doesn't exist`);

      }

    });

    initPromptUsername();

  }

  static promptPassword(employee) {

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    function initPromptPassword (err = '') {
      if (err) console.log(err);
      rl.setPrompt('# Please enter your password\n> ');
      rl.prompt();
    }

    rl.on('line', function(password) {

      LoginController.clearScreen();

      // Password found
      if (password === employee[0].password) {

        rl.close();

        Hospital.setLoggedIn(employee);

        DashboardController.index();

      } else {

        initPromptPassword(`Error: Password is invalid`);

      }

    });

    initPromptPassword();

  }

}

module.exports = LoginController;