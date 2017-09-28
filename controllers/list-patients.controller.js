const readline = require('readline');

const Hospital = require('../models/Hospital');

const DashboardController = require('./dashboard.controller');

class ListPatientsController {

  static clearScreen() {

    process.stdout.write("\x1Bc")
    console.log(`-------------`);
    console.log(`Patients List`);
    console.log(`-------------`);

  }

  static index(callback) {

    const patients = Hospital.listPatients();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    ListPatientsController.clearScreen();

    rl.setPrompt('');
    rl.prompt();

    rl.on('line', function(command) {

      rl.close();

      callback();

    });

    let output = '';

    // Log patients
    for (let i = 0; i < patients.length; i++) {

      output += 'ID: ' + patients[i].id + '\n';
      output += 'Name: ' + patients[i].name + '\n';
      output += 'Diagnosis: ' + patients[i].diagnosis + '\n';

      output += '\n';

    }

    console.log(output);

    console.log('Press [ENTER] to return');

  }

}

module.exports = ListPatientsController;