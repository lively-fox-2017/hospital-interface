const readline = require('readline');

const Hospital = require('../models/Hospital');
const Patient = require('../models/Patient');

const DashboardController = require('./dashboard.controller');

class ViewPatientController {

  static clearScreen(id) {

    process.stdout.write("\x1Bc")
    console.log(`--------------`);
    console.log(`Patient ID: ${id}`);
    console.log(`--------------`);

  }

  static index(id, callback) {

    const patient = Patient.find('id', id);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    ViewPatientController.clearScreen(id);

    rl.setPrompt('');
    rl.prompt();

    rl.on('line', function(command) {

      rl.close();

      callback();

    });

    if (patient.length) {

      let output = '';

      output += 'ID: ' + patient[0].id + '\n';
      output += 'Name: ' + patient[0].name + '\n';
      output += 'Diagnosis: ' + patient[0].diagnosis + '\n';

      output += '\n';

      console.log(output);

    } else {

      console.log('No patient with that id\n');

    }

    console.log('Press [ENTER] to return');

  }

}

module.exports = ViewPatientController;