'use strict'

const employee = require('./employee');

class Dokter extends employee{
  getAllPatientList(arrOfPatient){
    return arrOfPatient;
  }

  getOnePatient(arrOfPatient, id){
    for (let i in arrOfPatient){
      if(arrOfPatient[i].hasOwnProperty('id')){
        if(arrOfPatient[i].id==id){
          return arrOfPatient[i];
        }
      }
    }
    return {}
  }


}

module.exports = Dokter;
