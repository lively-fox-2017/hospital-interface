// class Employee {
//   constructor(name, position, username, password) {
//     this.name = name
//     this.position = position
//     this.username = username
//     this.password = password
//   }
// }

class Employee {
  constructor() {
    //level akses ADMIN,DOKTER,RESEPSIONIS,OB
    this.id = [1,2,3,4,5];
    this.nama = ['Budi','Vidia','Dodi','Badu','Siti'];
    this.position = ['administrator','dokter','resepsionis','ob','dokter'];
    this.username = ['admin','vidia','dodi','badu','siti'];
    this.password = ['adminjos01','vidiajos01','dodijos01','badu01','siti01'];
    this.akses = ['ADMIN','DOKTER','RESEPSIONIS','OB','DOKTER'];
  }
  simpanDataKaryawan(id,nama,position,username,password,akses){
    // console.log(id,nama);
    this.id.push(id);
    this.nama.push(nama);
    this.position.push(position);
    this.username.push(username);
    this.password.push(password);
    this.akses.push(akses);
    return true;
  }
  editDataKaryawan(oldid,newid,newnama,newposition,newusername,newpassword,newakses){
    // console.log(oldid+','+newid+','+newnama+','+newposition+','+newusername+','+newpassword+','+newakses);
    for (var i = 0; i < this.id.length; i++) {
      if (oldid==this.id[i]){
        this.id[i]=newid;
        this.nama[i]=newnama;
        this.position[i]=newposition;
        this.username[i]=newusername;
        this.password[i]=newpassword;
        this.akses[i]=newakses;
        return true;
      }
    }
    return false;
  }
  deleteDataKaryawann(olId){
    for (var i = 0; i < this.id.length; i++) {
      if (olId==this.id[i]){
        this.id.splice(i,1);
        this.nama.splice(i,1);
        this.position.splice(i,1);
        this.username.splice(i,1);
        this.password.splice(i,1);
        this.akses.splice(i,1);
        return true;
      }
    }
    return false;
  }
  cekDataKaryawan(olId){
    for (var i = 0; i < this.id.length; i++) {
      if (olId==this.id[i]){
        //return [this.id[i],this.nama[i],this.position[i],this.username.splice(i,1),this.password.splice(i,1),this.akses.splice(i,1)];
        return [this.id[i],this.nama[i],this.position[i],this.username[i],this.password[i],this.akses[i]];
      }
    }
    return '';
  }
}
module.exports = Employee
