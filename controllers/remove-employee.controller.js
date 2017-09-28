const readline = require('readline');

const Employee = require('../models/Employee');
const Hospital = require('../models/Hospital');

const DashboardController = require('./dashboard.controller');

class RemoveEmployeeController {

  static clearScreen(err = '') {

    if (err) console.log(err);

    process.stdout.write("\x1Bc");
    console.log(`---------------`);
    console.log(`Remove Employee`);
    console.log(`---------------`);

  }

  static index(id, callback) {

    RemoveEmployeeController.clearScreen();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    let loggedInId = Hospital.getLoggedIn().id;
    let employee = Employee.find('id', id);

    if ((id !== loggedInId) && (employee.length) && (id !== '')) {

      Employee.destroy(id);
      console.log('Successfully deleted\n');

    } else {

      if (id === loggedInId) {

        console.log(`Can't delete yourself!\n`);

      }

      if (!employee.length) {

        console.log('Employee not found\n');

      }

    }

    rl.setPrompt('');
    rl.prompt();

    rl.on('line', function(command) {

      rl.close();

      callback();

    });

    console.log('Press [ENTER] to return');

  }

}

module.exports = RemoveEmployeeController;