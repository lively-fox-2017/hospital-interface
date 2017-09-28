const readline = require('readline');

const Employee = require('../models/Employee');
const Hospital = require('../models/Hospital');

const DashboardController = require('./dashboard.controller');

let employeeObj = {};

class AddEmployeeController {

  static clearScreen(err = '') {

    if (err) console.log(err);

    process.stdout.write("\x1Bc");
    console.log(`-------------`);
    console.log(`Add Employee`);
    console.log(`-------------`);

  }

  static promptName(callback) {

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    AddEmployeeController.clearScreen();

    function initPromptName (err = '') {
      if (err) console.log(err);
      rl.setPrompt('# Enter a name\n> ');
      rl.prompt();
    }

    rl.on('line', function(name) {

      rl.close();

      employeeObj.name = name;

      AddEmployeeController.clearScreen();

      AddEmployeeController.promptLevel(callback);

    });

    initPromptName();

  }

  static promptLevel(callback) {

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    AddEmployeeController.clearScreen();

    function initPromptLevel (err = '') {
      if (err) console.log(err);
      rl.setPrompt('# Enter a level\n> ');
      rl.prompt();
    }

    rl.on('line', function(level) {

      AddEmployeeController.clearScreen();

      let validLevels = ['admin', 'doctor', 'ob'];

      if (validLevels.indexOf(level.toLowerCase()) !== -1) {

        rl.close();
        employeeObj.level = level.toLowerCase();
        AddEmployeeController.promptUsername(callback);

      } else {

        initPromptLevel(`Error: Level "${level}" is not valid`);

      }

    });

    initPromptLevel();

  }

  static promptUsername(callback) {

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    AddEmployeeController.clearScreen();

    function initPromptUsername (err = '') {
      if (err) console.log(err);
      rl.setPrompt('# Enter a username\n> ');
      rl.prompt();
    }

    rl.on('line', function(username) {

      AddEmployeeController.clearScreen();

      let employee = Employee.find('username', username);

      if (!employee.length) {
        rl.close();
        employeeObj.username = username.toLowerCase();
        AddEmployeeController.promptPassword(callback);
      } else {
        initPromptUsername(`Error: Username "${username}" already exist`);
      }

    });

    initPromptUsername();

  }

  static promptPassword(callback) {

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    AddEmployeeController.clearScreen();

    function initPromptPassword (err = '') {
      if (err) console.log(err);
      rl.setPrompt('# Enter a password\n> ');
      rl.prompt();
    }

    rl.on('line', function(password) {

      rl.close();

      AddEmployeeController.clearScreen();

      employeeObj.password = password;

      let employee = new Employee(employeeObj);

      employee.save();

      AddEmployeeController.success(callback);

    });

    initPromptPassword();

  }

  static success(callback) {

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.setPrompt('Successfully added\n');
    rl.prompt();

    rl.on('line', function(command) {

      rl.close();

      callback();

    });

    console.log('Press [ENTER] to return');

  }

  static index(callback) {

    AddEmployeeController.promptName(callback);

  }

}

module.exports = AddEmployeeController;