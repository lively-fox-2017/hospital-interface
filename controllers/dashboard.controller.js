const readline = require('readline');

const Hospital = require('../models/Hospital');

const LoginController = require('./login.controller.js');

const ListEmployeesController = require('./list-employees.controller');
const ListPatientsController = require('./list-patients.controller');
const ViewEmployeeController = require('./view-employee.controller');
const ViewPatientController = require('./view-patient.controller');
const AddEmployeeController = require('./add-employee.controller');
const AddPatientController = require('./add-patient.controller');
const RemoveEmployeeController = require('./remove-employee.controller');
const RemovePatientController = require('./remove-patient.controller');

class DashboardController {

  static clearScreen() {

    const loggedInUser = Hospital.getLoggedIn();

    process.stdout.write("\x1Bc")
    console.log(`--------------------------------------------`);
    console.log(`Welcome ${loggedInUser.username}. Your access level is: ${loggedInUser.level.toUpperCase()}`);
    console.log(`--------------------------------------------`);
    console.log('What would you like to do?');

    switch (loggedInUser.level) {
      case 'admin':
        console.log(Hospital.getAdminMenu());
        break;
      case 'doctor':
        console.log(Hospital.getDoctorMenu());
        break;
      case 'ob':
        console.log(Hospital.getOBMenu());
        break;
    }

  }

  static index() {

    const loggedInUser = Hospital.getLoggedIn();

    let commands = [];

    switch (loggedInUser.level) {
      case 'admin':
        commands = Hospital.getAdminCommands();
        break;
      case 'doctor':
        commands = Hospital.getDoctorCommands();
        break;
      case 'ob':
        commands = Hospital.getOBCommands();
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
            ListEmployeesController.index(DashboardController.index);
            break;
          case 'list_patients':
            ListPatientsController.index(DashboardController.index);
            break;
          case 'view_employee':
            ViewEmployeeController.index(parseInt(command[1]) || '', DashboardController.index);
            break;
          case 'view_patient':
            ViewPatientController.index(parseInt(command[1]) || '', DashboardController.index);
            break;
          case 'add_employee':
            AddEmployeeController.index(DashboardController.index);
            break;
          case 'add_patient':
            AddPatientController.index(DashboardController.index);
            break;
          case 'remove_employee':
            RemoveEmployeeController.index(parseInt(command[1]) || '', DashboardController.index);
            break;
          case 'remove_patient':
            RemovePatientController.index(parseInt(command[1]) || '', DashboardController.index);
            break;
          case 'logout':
            rl.close();
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