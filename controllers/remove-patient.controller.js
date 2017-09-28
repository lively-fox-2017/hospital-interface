const readline = require('readline');

const Patient = require('../models/Patient');
const Hospital = require('../models/Hospital');

const DashboardController = require('./dashboard.controller');

class RemovePatientController {

  static clearScreen(err = '') {

    if (err) console.log(err);

    process.stdout.write("\x1Bc");
    console.log(`---------------`);
    console.log(`Remove Patient`);
    console.log(`---------------`);

  }

  static index(id, callback) {

    RemovePatientController.clearScreen();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    let patient = Patient.find('id', id);

    if (patient.length) {

      Patient.destroy(id);
      console.log('Successfully deleted\n');

    } else {

      console.log('Patient not found\n');

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

module.exports = RemovePatientController;