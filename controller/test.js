const Hospital = require('./../models/hospital');
const Admin = require('./../models/admin');
const Doctor = require('./../models/doctor');

let hospital = new Hospital('Rumah Sakit', 'Disini', '../employees.json', '../patients.json');
let admin = new Admin({
  id: 1,
  name: 'Administrator',
  position: 'admin',
  username: 'admin',
  password: 'admin',
  createdBy: null
});
let doctor = new Doctor({
  id: 3,
  name: 'Dr. Boyke',
  position: 'doctor',
  username: 'boyke',
  password: 'admin',
  createdBy: null
});
// hospital.addRecordPatient(doctor, {
//   name: 'Dr. Boyke',
//   diagnosis: 'keseleo'
// });
// hospital.addEmployee(admin, {
//   name: 'Sayuti',
//   position: 'officeboy',
//   username: 'sayuti',
//   password: 'admin'
// });
hospital.deleteEmployee(15);
hospital.deleteRecordPatient(2);
// console.log(hospital.patients);
