const readline = require('readline');

const Hospital = require('../models/Hospital');
const hospitalName = Hospital.fetch(['name']);
const loggedInUser = Hospital.getLoggedIn();

const ListEmployeesController = require('./list-employees.controller');

class DashboardController {

  static clearScreen() {

    process.stdout.write("\x1Bc")
    console.log(`--------------------------------------------`);
    console.log(`Welcome ${loggedInUser.username}. Your access level is: ${loggedInUser.level.toUpperCase()}`);
    console.log(`--------------------------------------------`);
    console.log('What would you like to do?');

    switch (loggedInUser.level) {
      case 'admin':
        console.log(Hospital.getAdminMenu());
        break;
    }

  }

  static index(callback) {

    let commands = [];

    switch (loggedInUser.level) {
      case 'admin':
        commands = Hospital.getAdminCommands();
        break;
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    DashboardController.clearScreen();

    function initPromptCommand(err = '') {
      if (err) console.log(err);
      rl.setPrompt('> ');
      rl.prompt();
    }

    rl.on('line', function(command) {

      command = command.split(' ');

      if (commands.indexOf(command[0]) !== -1) {

        rl.close();

        switch(command[0]) {
          case 'list_employees':
            callback(DashboardController.index);
            break;
          default:
            break;
        }

      } else {

        initPromptCommand(`Error: Command "${command[0]}" not found`);

      }

    });

    initPromptCommand();

  }

}

module.exports = DashboardController;