// class Patient {
//   constructor(id, name, diagnosis) {
//     this.id = id
//     this.name = name
//     this.diagnosis = diagnosis
//   }
// }
class Patient {
  constructor() {
    this.id = [1,2,3]
    this.nama = ['Budi','Tono','Vidia']
    this.diagnosis = ['Batuk','Pilek','Demam']
    this.idDokter = [2,2,5]
  }
  simpanDataPasien(id,nama,diagnosis,idDokter){
    // console.log(id,nama,diagnosis);
    this.id.push(id);
    this.nama.push(nama);
    this.diagnosis.push(diagnosis);
    this.idDokter.push(idDokter);
    return true;
  }
  editDataPasien(oldid,newid,newnama,newdiagnosis,newidDokter){
    for (var i = 0; i < this.id.length; i++) {
      if (oldid==this.id[i]){
        this.id[i]=newid;
        this.nama[i]=newnama;
        this.diagnosis[i]=newdiagnosis;
        this.idDokter[i]=newidDokter;
        return true;
      }
    }
    return false;
  }
  deleteDataPasien(olId){
    for (var i = 0; i < this.id.length; i++) {
      if (olId==this.id[i]){
        this.id.splice(i,1);
        this.nama.splice(i,1);
        this.diagnosis.splice(i,1);
        this.idDokter.splice(i,1);
        return true;
      }
    }
    return false;
  }
  cekDataPasien(olId){
    for (var i = 0; i < this.id.length; i++) {
      if (olId==this.id[i]){
        return [this.id[i],this.nama[i],this.diagnosis[i],this.idDokter[i]];
      }
    }
    return '';
  }
}

module.exports = Patient
