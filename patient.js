// class Patient {
//   constructor(id, name, diagnosis) {
//     this.id = id
//     this.name = name
//     this.diagnosis = diagnosis
//   }
// }
class Patients {
  constructor() {
    this.dataPatients=[
                        {"id":"1","nama":"Budi","diagnosis":"Batuk","idDokter":"2"},
                        {"id":"2","nama":"Tono","diagnosis":"Pilek","idDokter":"2"},
                        {"id":"3","nama":"Vidia","diagnosis":"Demam","idDokter":"5"}
                      ]
  }
  simpanDataPasien(id,nama,diagnosis,idDokter){
    let newPatient={"id":id,"nama":nama,"diagnosis":diagnosis,"idDokter":idDokter}
    this.dataPatients.push(newPatient);
    return true;
  }
  editDataPasien(oldid,id,nama,diagnosis,idDokter){
    let newPatient={"id":id,"nama":nama,"diagnosis":diagnosis,"idDokter":idDokter}
    let newDataPatients=this.dataPatients.map(x=>{
          if (oldid==x.id) {
            return newPatient;
          } else {
            return x
          }
        })
    this.dataPatients=newDataPatients;
    return true;
  }
  deleteDataPasien(olId){
    for (var i = 0; i < this.dataPatients.length; i++) {
      if (olId==this.dataPatients[i].id){
        this.dataPatients.splice(i,1);
        return true;
      }
    }
    return false;
  }
  cekDataPasien(olId){
    for (var i = 0; i < this.dataPatients.length; i++) {
      if (olId==this.dataPatients[i].id){
        return [this.dataPatients[i]];
      }
    }
    return [];
  }
}

module.exports = Patients
