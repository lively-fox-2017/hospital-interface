const LoginCtrl = require('./login');

class Menu {
  constructor(rl) {
    this.rl = rl;
  }

  menuView(hospital, employee) {
    let str = 'Options: \n';
    switch (employee.position) {
      case 'admin':
        str += '[1] List Employee\n';
        str += '[2] View Employee <id>\n';
        str += '[3] Add Employee <nama> <position> <username> <password>\n';
        str += '[4] Remove Employee\n';
        str += '[5] List Patient\n';
        str += '[6] View Patient <id>\n';
        str += '[7] Add Patient <nama> <diagnosis1> ... <diagnosisN>\n';
        str += '[8] Remove patient\n';
        str += '[9] Logout\n';
        str += '='.repeat(30);
        this.adminView(hospital, employee, str);
        break;
      case 'doctor':
        str += '[1] List Patient\n';
        str += '[2] View Patient <id>\n';
        str += '[3] Add Patient <nama> <diagnosis1> ... <diagnosisN>\n';
        str += '[4] Remove patient\n';
        str += '[5] Logout\n';
        str += '='.repeat(30);
        this.doctorView(hospital, employee, str);
        break;
      case 'officeboy':
        str += '[1] Logout\n';
        str += '='.repeat(30);
        this.officeboyView(hospital, employee, str);
        break;
      case 'receptionist':
        str += '[1] List patient\n';
        str += '[2] View Patient <id>\n';
        str += '[3] Logout\n';
        str += '='.repeat(30);
        this.receptionistView(hospital, employee, str);
        break;
    }
  }

  adminView(hospital, employee, str) {
    console.log(str);
    this.rl.question('Pilihan Anda: ', (menu) => {
      switch (parseInt(menu)) {
        case 1:
          this.listEmployeeView(hospital, employee);
          break;
        case 2:
          this.viewEmployeeView(hospital, employee);
          break;
        case 3:
          this.addEmployeeView(hospital, employee);
          break;
        case 4:
          this.removeEmployeeView(hospital, employee);
          break;
        case 5:
          this.listPatientView(hospital, employee);
          break;
        case 6:
          this.viewPatientView(hospital, employee);
          break;
        case 7:
          this.addPatientView(hospital, employee);
          break;
        case 8:
          this.removePatientView(hospital, employee);
          break;
        case 9:
          this.rl.close();
          break;
        default:
          console.log('Option Tidak Ditemukan');
          this.menuView(hospital, employee);
          break;
      }
    });
  }

  officeboyView(hospital, employee, str) {
    console.log(str);
    this.rl.question('Pilihan Anda: ', (menu) => {
      switch (parseInt(menu)) {
        case 1:
          this.rl.close();
          break;
        default:
          console.log('Option Tidak Ditemukan');
          this.menuView(hospital, employee);
          break;
      }
    });
  }

  receptionistView(hospital, employee, str) {
    console.log(str);
    this.rl.question('Pilihan Anda: ', (menu) => {
      switch (parseInt(menu)) {
        case 1:
          this.listPatientView(hospital, employee);
          break;
        case 2:
          this.viewPatientView(hospital, employee);
          break;
        case 3:
          this.rl.close();
          break;
        default:
          console.log('Option Tidak Ditemukan');
          this.menuView(hospital, employee);
          break;
      }
    });
  }

  doctorView(hospital, employee, str) {
    console.log(str);
    this.rl.question('Pilihan Anda: ', (menu) => {
      switch (parseInt(menu)) {
        case 1:
          this.listPatientView(hospital, employee);
          break;
        case 2:
          this.viewPatientView(hospital, employee);
          break;
        case 3:
          this.addPatientView(hospital, employee);
          break;
        case 4:
          this.removePatientView(hospital, employee);
          break;
        case 5:
          this.rl.close();
          break;
        default:
          console.log('Option Tidak Ditemukan');
          this.menuView(hospital, employee);
          break;
      }
    });
  }

  listEmployeeView(hospital, employee) {
    for (let i = 0; i < hospital.employees.length; i++) {
      console.log(`ID: ${hospital.employees[i].id}`);
      console.log(`Name: ${hospital.employees[i].name}`);
      console.log(`Position: ${hospital.employees[i].position}`);
      console.log(`Username: ${hospital.employees[i].username}`);
      let creator = (hospital.employees[i].createdBy) ? hospital.getElementById('employees', hospital.employees[i].createdBy) : null;
      if (creator)
        console.log(`Created By: ${creator.name}`);
    }
    this.menuView(hospital, employee);
  }

  viewEmployeeView(hospital, employee) {
    this.rl.question('Masukan ID: ', (id) => {
      let query = hospital.getElementById('employees', id);
      if (query) {
        console.log(`ID: ${query.id}`);
        console.log(`Name: ${query.name}`);
        console.log(`Position: ${query.position}`);
        console.log(`Username: ${query.username}`);
        let creator = (query.createdBy) ? hospital.getElementById('employees', query.createdBy) : null;
        if (creator)
          console.log(`Created By: ${creator.name}`);
      } else
        console.log('Employee not Found');
      this.menuView(hospital, employee);
    });
  }

  addEmployeeView(hospital, employee) {
    this.rl.question('Masukan <nama> <position> <username> <password>: ', (str) => {
      let attr = str.split(' ');
      hospital.addEmployee(employee, {
        name: attr[0],
        position: attr[1],
        username: attr[2],
        password: attr[3]
      })
      this.menuView(hospital, employee);
    });
  }

  removeEmployeeView(hospital, employee) {
    this.rl.question('Masukan <id> yang ingin dihapus: ', (id) => {
      hospital.deleteEmployee(id);
      this.menuView(hospital, employee);
    });
  }

  listPatientView(hospital, employee) {
    for (let i = 0; i < hospital.patients.length; i++) {
      console.log(`ID: ${hospital.patients[i].id}`);
      console.log(`Name: ${hospital.patients[i].name}`);
      console.log(`Diagnosis: ${hospital.patients[i].diagnosis}`);
      let creator = (hospital.patients[i].doctor) ? hospital.getElementById('employees', hospital.patients[i].doctor) : null;
      if (creator)
        console.log(`Doctor: ${creator.name}`);
    }
    this.menuView(hospital, employee);
  }

  viewPatientView(hospital, employee) {
    this.rl.question('Masukan ID: ', (id) => {
      let query = hospital.getElementById('patients', id);
      if (query) {
        console.log(`ID: ${query.id}`);
        console.log(`Name: ${query.name}`);
        console.log(`Diagnosis: ${query.diagnosis}`);
        let creator = (query.doctor) ? hospital.getElementById('employees', query.doctor) : null;
        if (creator)
          console.log(`Doctor: ${creator.name}`);
      } else
        console.log('Patient not found');
      this.menuView(hospital, employee);
    });
  }

  addPatientView(hospital, employee) {
    this.rl.question('Masukan <nama> <diagnosis1> <diagnosis2> ... <diagnosisN>: ', (str) => {
      let attr = str.split(' ');
      hospital.addRecordPatient(employee, {
        name: attr[0],
        diagnosis: attr.slice(1)
      })
      this.menuView(hospital, employee);
    });
  }

  removePatientView(hospital, employee) {
    this.rl.question('Masukan <id> yang ingin dihapus: ', (id) => {
      hospital.deleteRecordPatient(id);
      this.menuView(hospital, employee);
    });
  }
}

module.exports = Menu;
