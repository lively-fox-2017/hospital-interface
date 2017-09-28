const readline = require('readline');

const Hospital = require('../models/Hospital');
const Employee = require('../models/Employee');

const DashboardController = require('./dashboard.controller');

class ViewEmployeeController {

  static clearScreen(id) {

    process.stdout.write("\x1Bc")
    console.log(`--------------`);
    console.log(`Employee ID: ${id}`);
    console.log(`--------------`);

  }

  static index(id, callback) {

    const employee = Employee.find('id', id);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    ViewEmployeeController.clearScreen(id);

    rl.setPrompt('');
    rl.prompt();

    rl.on('line', function(command) {

      rl.close();

      callback();

    });


    if (employee.length) {

      let output = '';

      output += 'ID: ' + employee[0].id + '\n';
      output += 'Name: ' + employee[0].name + '\n';
      output += 'Level: ' + employee[0].level + '\n';
      output += 'Username: ' + employee[0].username + '\n';

      output += '\n';

      console.log(output);

    } else {

      console.log('No employee with that id\n');

    }

    console.log('Press [ENTER] to return');

  }

}

module.exports = ViewEmployeeController;