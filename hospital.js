"use strict"

const fs = require('fs');
const readline = require('readline');
const Admin = require('./admin.js');
const Doctor = require('./doctor.js');
const Receptionist = require('./receptionist.js');
const Ob = require('./ob.js');
const Patient = require('./patient.js');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Hospital {
    constructor(name, location) {
        this.name = name;
        this.location = location;
        this.employees = null;
        this.patients = null;
    }

    loadData(nextProcess) {
        fs.readFile('./employee.json', "utf8", (err, employees) => {
            if (err) throw err;

            this.employees = JSON.parse(employees);
            fs.readFile('./patient.json', "utf8", (err, patients) => {
                if (err) throw err;
                
                this.patients = JSON.parse(patients);

                nextProcess();
            });
        });
    }

    saveEmployeesData(data, nextProcess) {
        data = JSON.stringify(data, null, 4);
        fs.writeFile('./employee.json', data, err => {
            if (err) throw err;
            nextProcess();
        });
    }

    savePatientsData(data, nextProcess) {
        data = JSON.stringify(data, null, 4);
        fs.writeFile('./patient.json', data, err => {
            if (err) throw err;
            nextProcess();
        });
    }

    login() {
        const checkUsername = username => {
            for (let i = 0; i < this.employees.length; i++) {
                if (this.employees[i].username === username) return this.employees[i];
            }

            return null;
        }

        const promptUsername = () => {
            rl.question('Please enter your username:\n', username => {
                const employee = checkUsername(username);
                if (employee) {
                    process.stdout.write('\x1Bc\n');
                    promptPassword(employee);
                } else {
                    process.stdout.write('\x1Bc\n');
                    console.log('WRONG USERNAME');
                    console.log('----------------------------------------');
                    promptUsername();
                }
            });
        }

        const promptPassword = employee => {
            rl.question('Please enter your password:\n', pass => {
                if (pass === employee.password) {
                    console.log(`Welcome ${employee.name}. Your access level is: ${employee.position}`);
                    console.log('----------------------------------------');
                    process.stdout.write('\x1Bc\n');
                    this.showOptions(employee);
                } else {
                    process.stdout.write('\x1Bc\n');
                    console.log('WRONG PASSWORD');
                    console.log('----------------------------------------');
                    promptPassword(employee);
                }
            });
        }

        const welcomeMessage = 'Welcome to ' + this.name;
        console.log(welcomeMessage);

        promptUsername();
    }

    showOptions(employee) {
        const options = {
            1 : '[type \'1\'] Show Patient List', // doktor, receptionis, admin
            2 : '[type \'2\'] View Patient Record', // doktor, receptionis, admin
            3 : '[type \'3\'] Add Patient Record', // doktor, receptionis, admin
            4 : '[type \'4\'] Remove Patient Record', // doktor, receptionis, admin
            5 : '[type \'5\'] Show Employee List', // Admin
            6 : '[type \'6\'] View Employee Record', // Admin
            7 : '[type \'7\'] Add Employee Record', // Admin
            8 : '[type \'8\'] Remove Employee Record', // Admin
            9 : '[type \'9\'] Log Out' // ob
        }

        const show = (opts) => {
            console.log('USER:', employee.name, 'ACCESS:', employee.position);
            console.log('----------------------------------------');
            console.log('What would you like to do ?\nOptions:');
            console.log('----------------------------------------');
            opts.forEach(opt => console.log(options[opt]));
        }

        switch(employee.position) {
        case 'admin':
            show([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            break;
        case 'doctor':
            show([1, 2, 3, 4, 9]);
            break;
        case 'receptionist':
            show([1, 2, 3, 4, 9]);
            break;
        case 'office boy':
            show([9]);
            break;
        default:
            console.log('You do not have any access');
            console.log('----------------------------------------');
        }

        rl.on('line', optionInput => {
            process.stdout.write('\x1Bc\n');
            this.evaluateOption(optionInput, employee);
        });
    }

    evaluateOption(optionInput, employee) {
        switch(optionInput) {
        case '1':
            if (employee.position === 'admin' ||
                employee.position === 'doctor' ||
                employee.position === 'receptionist') {
                this.showPatientList(employee);    
            } else {
                console.log('You do not have any access to Patient List');
                console.log('----------------------------------------');
                this.showOptions(employee);
            }
            break;
        case '2':
            if (employee.position === 'admin' ||
                employee.position === 'doctor' ||
                employee.position === 'receptionist') {
                this.viewPatientRecord(employee);
            } else {
                console.log('You do not have any access to Patient Record');
                console.log('----------------------------------------');
                this.showOptions(employee);
            }
            break;
        case '3':
            if (employee.position === 'admin' ||
                employee.position === 'doctor' ||
                employee.position === 'receptionist') {
                this.addPatientRecord(employee);
            } else {
                console.log('You do not have any access to change Patient Record');
                console.log('----------------------------------------');
                this.showOptions(employee);
            }
            break;
        case '4':
            if (employee.position === 'admin' ||
                employee.position === 'doctor' ||
                employee.position === 'receptionist') {
                this.removePatientRecord(employee);
            } else {
                console.log('You do not have any access to change Patient Record');
                console.log('----------------------------------------');
                this.showOptions(employee);
            }
            break;
        case '5':
            if (employee.position === 'admin') {
                this.showEmployeeList(employee)
            } else {
                console.log('You do not have any access to Employee List');
                console.log('----------------------------------------');
                this.showOptions(employee);
            }
            break;
        case '6':
            if (employee.position === 'admin') {
                this.viewEmployeeRecord(employee);
            } else {
                console.log('You do not have any access to Employee Record');
                console.log('----------------------------------------');
                this.showOptions(employee);
            }
            break;
        case '7':
            if (employee.position === 'admin') {
                this.addEmployeeRecord(employee);
            } else {
                console.log('You do not have any access to change Employee Record');
                console.log('----------------------------------------');
                this.showOptions(employee);
            }
            break;
        case '8':
            if (employee.position === 'admin') {
                this.removeEmployeeRecord(employee);
            } else {
                console.log('You do not have any access to change Employee Record');
                console.log('----------------------------------------');
                this.showOptions(employee);
            }
            break;
        case '9':
            this.logOut();
            break;
        default:
            console.log('Do enter a valid input ...');
        }
    }

    showPatientList(employee) {
        console.log(this.name.toUpperCase() + ' - LIST OF PATIENTS');

        this.patients.forEach(patient => {
            console.log('----------------------------------------');
            console.log('ID: ' + patient.id);
            console.log('Name: ' + patient.name);
            console.log('Diagnosis: ' + patient.diagnosis);
            console.log('----------------------------------------');
        });

        this.showOptions(employee);
    }

    viewPatientRecord(employee) {
        rl.question('Patient ID? ', id => {
            const rec = this.patients.filter(patient => patient.id === id);

            if (rec.length > 0) {
                console.log('----------------------------------------');
                console.log('ID: ' + rec[0].id);
                console.log('Name: ' + rec[0].name);
                console.log('Diagnosis: ' + rec[0].diagnosis);
                console.log('----------------------------------------');
                this.showOptions(employee);
            } else {
                console.log('No patient with id', id, 'in this hospital');
                console.log('----------------------------------------');
                this.showOptions(employee);            }
        });
    }

    addPatientRecord(employee) {
        rl.question('Patient ID: ', id => {
            rl.question('Patient Name: ', name => {
                rl.question('Patient Diagnosis: ', diagnosis => {
                    let newPatient = new Patient(id, name, diagnosis);
                    this.patients.push(newPatient);
                    this.savePatientsData(this.patients, () => {
                        console.log('----------------------------------------');
                        console.log(`${newPatient.name} successfully added to patient list`);
                        console.log('----------------------------------------');
                        this.showOptions(employee);
                    });
                });
            });
        });
    }

    removePatientRecord(employee) {
        rl.question('Patient ID: ', id => {
            const removed = this.patients.filter(patient => patient.id === id)[0];
            const newPatientList = this.patients.filter(patient => patient.id !== id);
            if (removed) {
                this.patients = newPatientList;
                this.savePatientsData(this.patients, () => {
                    console.log('----------------------------------------');
                    console.log(`${removed.name} successfully removed from patient list`);
                    console.log('----------------------------------------');
                    this.showOptions(employee);
                });
            } else {
                console.log('No patient with id', id, 'in this hospital');
                console.log('----------------------------------------');
                this.showOptions(employee);
            }
        });
    }

    showEmployeeList(employee) {
        console.log(this.name.toUpperCase() + '-LIST OF EMPLOYEES');
        
        this.employees.forEach(employee => {
            console.log('----------------------------------------');
            console.log('ID: ' + employee.id);
            console.log('Name: ' + employee.name);
            console.log('Position: ' + employee.position);
            console.log('----------------------------------------');
        });

        this.showOptions(employee);
    }

    viewEmployeeRecord(employee) {
        rl.question('Employee ID? ', id => {
            const rec = this.employees.filter(employee => employee.id === id);

            if (rec.length > 0) {
                console.log('----------------------------------------');
                console.log('ID: ' + rec[0].id);
                console.log('Name: ' + rec[0].name);
                console.log('Position: ' + rec[0].position);
                console.log('----------------------------------------');
                this.showOptions(employee);
            } else {
                console.log('No employee with id', id, 'in this hospital');
                console.log('----------------------------------------');
                this.showOptions(employee);
            }
        });
    }

    addEmployeeRecord(employee) {
        rl.question('Employee ID: ', id => {
            rl.question('Employee Name: ', name => {
                rl.question('Employee Position ("admin", "doctor", "receptionist", "office boy"): ', position => {
                    rl.question('Employee Username: ', username => {
                        rl.question('Employee PassWord: ', pass => {
                            let newEmployee;
                            if (position === 'admin') {
                                newEmployee = new Admin(id, name, username, pass);
                            } else if (position === 'doctor') {
                                newEmployee = new Doctor(id, name, username, pass);
                            } else if (position === 'receptionist') {
                                newEmployee = new Receptionist(id, name, username, pass);
                            } else if (position === 'office boy') {
                                newEmployee = new Ob(id, name, username, pass);
                            } else {
                                console.log('No such position exist');
                                this.showOptions(employee);
                            }
                            this.employees.push(newEmployee);
                            this.saveEmployeesData (this.employees, () => {
                                console.log('----------------------------------------');
                                console.log(`${newEmployee.name} successfully added to employee list`);
                                console.log('----------------------------------------');
                                this.showOptions(employee);
                            });
                        });
                    });
                });
            });
        });
    }

    removeEmployeeRecord(employee) {
        rl.question('Employee ID: ', id => {
            if (employee.id === id) {
                console.log('You can not remove yourself. Do ask someone to do the pleasure.');
                console.log('----------------------------------------');
                this.showOptions(employee);
            } else {
                const removed = this.employees.filter(employee => employee.id === id)[0];
                const newEmployeeList = this.employees.filter(employee => employee.id !== id);
                if (removed) {
                    this.employees = newEmployeeList;
                    this.saveEmployeesData(this.employees, () => {
                        console.log('----------------------------------------');
                        console.log(`${removed.name} successfully removed from employee list`);
                        console.log('----------------------------------------');
                        this.showOptions(employee);
                    });
                } else {
                    console.log('No employee with id', id, 'in this hospital');
                    console.log('----------------------------------------');
                    this.showOptions(employee);
                }
            }
        });
    }

    logOut() {
        rl.close();
    }
}

let hospital = new Hospital('RS IBU & BAPAK', 'Jl. Keluarga Sakinah 19, Kelurahan Sebelah');

hospital.loadData(() => {
    hospital.login();
});

module.exports = Hospital