const readline = require('readline');

const Hospital = require('../models/Hospital');

const DashboardController = require('./dashboard.controller');

class ListEmployeesController {

  static clearScreen() {

    process.stdout.write("\x1Bc")
    console.log(`-------------`);
    console.log(`Employee List`);
    console.log(`-------------`);

  }

  static index(callback) {

    const employees = Hospital.listEmployees();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    ListEmployeesController.clearScreen();

    rl.setPrompt('');
    rl.prompt();

    rl.on('line', function(command) {

      rl.close();

      callback();

    });

    let output = '';

    // Log employees
    for (let i = 0; i < employees.length; i++) {

      output += 'ID: ' + employees[i].id + '\n';
      output += 'Name: ' + employees[i].name + '\n';
      output += 'Level: ' + employees[i].level + '\n';
      output += 'Username: ' + employees[i].username + '\n';

      output += '\n';

    }

    console.log(output);

    console.log('Press [ENTER] to return');

  }

}

module.exports = ListEmployeesController;