const readline = require('readline');
const Hospital = require('./hospital.js');
const Table = require('cli-table');

var hospital = new Hospital();
// hospital.addAdmin('101', 'Kang Admin', 'admin', 'admin');
// hospital.addDoctor('102', 'Kang doktor', 'doctor', '111');
// hospital.addOb('103', 'Bang ob', 'OB', '222');
// hospital.addPatient('001', 'Pasien 1', 'Sehat');
// hospital.addPatient('002', 'Pasien 2', 'Pura pura sakit');
// hospital.save(JSON.stringify(hospital));
var currentLogin = null;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: hospital.name + ">"
});

function welcomePage(login = 0) {
  console.log("\x1B[2J")
  if (login === -1) {
    rl.write('Username and password combination not found\n');
  }
  rl.write('Welcome to ' + hospital.name + ' Hospital');
  rl.write('\n=================================================\n');
  loginPage();
}

function loginPage() {
  rl.question('Please enter your username :', (username) => {
    var found = -1;
    for (var i = 0; i < hospital.employees.length; i++) {
      if (hospital.employees[i].username === username.trim()) {
        found = i;
      }
    }
    hidden("Please enter your password :", function(password) {
      if (found > -1) {
        if (password === hospital.employees[found].password) {
          rl.resume();
          currentLogin = hospital.employees[found];
          menuPage();
        } else {
          welcomePage(-1)
        }
      } else {
        welcomePage(-1);
      }
    })
    // rl.question('Please enter your password :', (password) => {
    //   if (found > -1) {
    //     if (password.trim() === hospital.employees[found].password) {
    //       currentLogin = hospital.employees[found];
    //       menuPage();
    //     } else {
    //       welcomePage(-1)
    //     }
    //   } else {
    //     welcomePage(-1);
    //   }
    // })
  })
}

function menuPage() {
  rl.write('\nWelcome ' + currentLogin.name + ". Your access level is: " + currentLogin.position);
  rl.write('\nWhat would you like to do?\n');
  rl.write('Options:\n');
  if (currentLogin.position === 'Admin') {
    adminMenu()
  } else if (currentLogin.position === 'Doctor') {
    doctorMenu();
  } else {
    obMenu();
  }
}

function adminMenu() {
  rl.write('[1]. List Patients\n');
  rl.write('[2]. Find Patients\n');
  rl.write('[3]. Add Patients\n');
  rl.write('[4]. Remove Patients\n');
  rl.write('[5]. List Employee\n');
  rl.write('[6]. Find Employee\n');
  rl.write('[7]. Add Employee\n');
  rl.write('[8]. Remove Employee\n');
  rl.write('[9]. Logout\n');
  rl.question('Option :', (input) => {
    switch (input.trim()) {
      case '1':
        listPatients(function() {
          menuPage();
        });
        break;
      case '2':
        findPatient(function() {
          menuPage();
        });
        break;
      case '3':
        addPatient(function() {
          menuPage();
        });
        break;
      case '4':
        removePatient(function() {
          menuPage();
        });
        break;
      case '5':
        listEmployee(function() {
          menuPage();
        });
        break;
      case '6':
        findEmployee(function() {
          menuPage()
        });
        break;
      case '7':
        addEmployee(function() {
          menuPage()
        });
        break;
      case '8':
        removeEmployee(function() {
          menuPage()
        });
        break;
      case '9':
        welcomePage();
        break;
      default:
        rl.write('Invalid Menu');
        menuPage()
        break;
    }
  });
}

function doctorMenu() {
  rl.write('[1]. List Patients\n');
  rl.write('[2]. Find Patients\n');
  rl.write('[3]. Add Patients\n');
  rl.write('[4]. Remove Patients\n');
  rl.write('[5]. Logout\n');
  rl.prompt();
  rl.question('Option :', (input) => {
    switch (input.trim()) {
      case '1':
        listPatients(function() {
          menuPage();
        });
        break;
      case '2':
        findPatient(function() {
          menuPage();
        });
        break;
      case '3':
        addPatient(function() {
          menuPage();
        });
        break;
      case '4':
        removePatient(
          function() {
            menuPage()
          }
        );
        break;
      case '5':
        welcomePage();
        break;
      default:
        menuPage()
        break;
    }
  });
}

function obMenu() {
  rl.write('[1]. Logout\n');
  rl.prompt();
  rl.question('Option :', (input) => {
    switch (input.trim()) {
      case '1':
        welcomePage();
        break;
      default:
        menuPage();
        break;
    }
  });
}

function listPatients(cb) {
  var patientList = hospital.showPatientList();
  var table = new Table({
    head: ['Id', 'Name', 'Diagnosis'],
    colWidths: [10,20,30],
  })
  for(var i =0;i<patientList.length;i++){
    var tempArr = []
    tempArr.push(patientList[i].id)
    tempArr.push(patientList[i].name)
    tempArr.push(patientList[i].diagnosis)
    table.push(tempArr)
  }
  console.log(table.toString());
  cb();
}

function findPatient(cb) {
  rl.question('Please enter patient id: \n', (id) => {
    var patient = hospital.findPatient(id);
    if (patient != "") {
      console.log(patient);
    } else {
      console.log('Patient not found');
    }
    cb();
  })
}

function addPatient(cb) {
  rl.question('Patient id : ', (id) => {
    var id = id.trim();
    rl.question('Patient name : ', (name) => {
      var name = name.trim();
      rl.question('Patient diagnosis : ', (diagnosis) => {
        var diagnosis = diagnosis.trim();
        var result = hospital.addPatient(id, name, diagnosis);
        if (result) {
          console.log('Success add new patient');
          cb();
        } else {
          console.log('Patient id already used');
          addPatient(cb);
        }
      })
    })
  })
}

function removePatient(cb) {
  rl.question('Please enter patient id: \n', (id) => {
    var patient = hospital.removePatient(id);
    if (patient) {
      console.log('Success remove patient');
    } else {
      console.log('Patient not found');
    }
    cb();
  })
}

function listEmployee(cb) {
  var employeeList = hospital.showEmployeeList();
  var table = new Table({
    head: ['Id', 'Name', 'Position', 'Username', 'Password'],
    colWidths: [10,20,10,20,20],
  })
  for(var i =0;i<employeeList.length;i++){
    var tempArr = []
    tempArr.push(employeeList[i].id)
    tempArr.push(employeeList[i].name)
    tempArr.push(employeeList[i].position)
    tempArr.push(employeeList[i].username)
    var string = "";
    for(var j = 0;j<employeeList[i].password.length;j++){
      string += '*';
    }
    tempArr.push(string);
    table.push(tempArr)
  }
  console.log(table.toString())
  cb();
}

function findEmployee(cb) {
  rl.question('Please enter employee id: \n', (id) => {
    var employee = hospital.findEmployee(id);
    if (employee != "") {
      console.log(employee);
    } else {
      console.log('Employee not found');
    }
    cb();
  })
}

function addEmployee(cb) {
  rl.question('Employee id : ', (id) => {
    var id = id.trim();
    rl.question('Employee name : ', (name) => {
      var name = name;
      rl.question('Employee username : ', (username) => {
        var username = username.trim();
        rl.question('Employee password : ', (password) => {
          var password = password.trim();
          rl.question('Employee position : ', (position) => {
            var position = position.trim();
            var result = false;
            if (position.toLowerCase() === 'doctor') {
              result = hospital.addDoctor(id, name, username, password);
            } else if (position.toLowerCase() === 'admin') {
              result = hospital.addAdmin(id, name, username, password);
            } else {
              result = hospital.addOb(id, name, username, password);
            }
            if (result) {
              console.log('Success add new employee');
              cb();
            } else {
              console.log('Employee id already used');
              addEmployee(cb);
            }
          })
        })
      })
    })
  })
}

function removeEmployee(cb) {
  rl.question('Please enter employee id: \n', (id) => {
    if (id === currentLogin.id) {
      console.log('Cannot remove yourself');
    } else {
      var employee = hospital.removeEmployee(id);
      if (employee) {
        console.log('Success remove employee');
      } else {
        console.log('Employee not found');
      }
    }
    cb();
  })
}

function hidden(query, callback) {
    var stdin = process.openStdin();
    var onDataHandler = function(char) {
         char = char + "";
         switch (char) {
           case "\n": case "\r": case "\u0004":
             // Remove this handler
             stdin.removeListener("data",onDataHandler);
             break;//stdin.pause(); break;
           default:
             process.stdout.write("\033[2K\033[200D" + query + Array(rl.line.length+1).join("*"));
           break;
         }
     }
     process.stdin.on("data", onDataHandler);

    rl.question(query, function(value) {
        rl.history = rl.history.slice(1);
        callback(value);
    });
}

///Main Process
welcomePage();
