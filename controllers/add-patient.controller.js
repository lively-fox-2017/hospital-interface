const readline = require('readline');

const Patient = require('../models/Patient');
const Hospital = require('../models/Hospital');

const DashboardController = require('./dashboard.controller');

let patientObj = {};

class AddPatientController {

  static clearScreen(err = '') {

    if (err) console.log(err);

    process.stdout.write("\x1Bc");
    console.log(`-------------`);
    console.log(`Add Patient`);
    console.log(`-------------`);

  }

  static promptName(callback) {

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    AddPatientController.clearScreen();

    function initPromptName (err = '') {
      if (err) console.log(err);
      rl.setPrompt('# Enter a name\n> ');
      rl.prompt();
    }

    rl.on('line', function(name) {

      rl.close();

      patientObj.name = name;

      AddPatientController.clearScreen();

      AddPatientController.promptDiagnosis(callback);

    });

    initPromptName();

  }

  static promptDiagnosis(callback) {

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    AddPatientController.clearScreen();

    function initPromptDiagnosis (err = '') {
      if (err) console.log(err);
      rl.setPrompt('# Enter a diagnosis\n> ');
      rl.prompt();
    }

    rl.on('line', function(diagnosis) {

      rl.close();

      AddPatientController.clearScreen();

      patientObj.diagnosis = diagnosis.toLowerCase();

      let patient = new Patient(patientObj);

      patient.save();

      callback();

    });

    initPromptDiagnosis();

  }

  static index(callback) {

    AddPatientController.promptName(callback);

  }

}

module.exports = AddPatientController;