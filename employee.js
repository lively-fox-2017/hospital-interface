// class Employee {
//   constructor(id, name, position, username, password) {
//     this.id = id
//     this.name = name
//     this.position = position
//     this.username = username
//     this.password = password
//   }
// }

class Employees {
  constructor() {
    this.dataEmployees=[{"id":"1","nama":"Budi","position":"administrator","username":"admin","password":"admin01"},
                        {"id":"2","nama":"Vidia","position":"dokter","username":"vidia","password":"vidia01"},
                        {"id":"3","nama":"Dodi","position":"resepsionis","username":"dodi","password":"dodi01"},
                        {"id":"4","nama":"Badu","position":"ob","username":"badu","password":"badu01"},
                        {"id":"5","nama":"Siti","position":"dokter","username":"siti","password":"siti01"}
                      ];
  }
  simpanDataKaryawan(id,nama,position,username,password){
    let newEmployee={"id":id,"nama":nama,"position":position,"username":username,"password":password};
    this.dataEmployees.push(newEmployee);
    // console.log(this.dataEmployees);
    return true;
  }
  editDataKaryawan(oldid,id,nama,position,username,password){
    let newEmployee={"id":id,"nama":nama,"position":position,"username":username,"password":password};
    let newDataEmployees=this.dataEmployees.map(x=>{
          if (oldid==x.id) {
            return newEmployee;
          } else {
            return x
          }
        })
    this.dataEmployees=newDataEmployees;
    return true;
  }
  deleteDataKaryawann(olId){
    for (var i = 0; i < this.dataEmployees.length; i++) {
      if (olId==this.dataEmployees[i].id){
        this.dataEmployees.splice(i,1);
        return true;
      }
    }
    return false;
  }
  cekDataKaryawan(olId){
    for (var i = 0; i < this.dataEmployees.length; i++) {
      if (olId==this.dataEmployees[i].id){
        return [this.dataEmployees[i]];
      }
    }
    return [];
  }
}
module.exports = Employees
