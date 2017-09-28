const Employee=require('./employee')
const Patient=require('./patient')
const readline=require('readline')
const fs=require('fs')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.on('close',function(){
  console.log('Terima Kasih dan Sampai Jumpa');
  process.exit(0)
})
class Hospital {
  constructor(name, location, employees, patients) {
    this.name = name
    this.employees = employees
    this.patients = patients
    this.location = location
    this.tamp={}
  }
  index(){
    console.log('------------------------------------')
    console.log('-----------RS.PRIMA HUSADA----------')
    console.log('------------------------------------')
    rl.question('Masukkan username Anda: ',(username)=>{
      if(this.username(username)>=0){
        let pass=this.username(username)
        this.password(pass)
      }else{
        console.log("Pengguna Tidak ada,Coba Lagi!");
        return this.index()
      }
    })
  }
  username(username){
    for(let i=0;i<this.employees.length;i++){
      if(username==this.employees[i].username){
        return i
      }
    }
  }
  password(pass){
    rl.question('Masukkan Password: ',(password)=>{
      if(this.employees[pass].password==password){
        this.tamp.name=this.employees[pass].name
        this.tamp.role = this.employees[pass].position
        console.log(`Selamat Datang ${this.tamp.name}, akses anda ada di level ${this.tamp.role}`);
        if(this.tamp.role == 'Doctor'){
          this.menuDoctor()
        }else if(this.tamp.role == 'Administration'){
          this.menuAdmin()
        }else if(this.tamp.role =='OB'){
          this.menuOb()
        }
      }else{
        console.log('Password Anda Salah');
        return this.password(pass)
      }
    })
  }
//====================admin====================
  menuAdmin(){
    console.log('------------------------------------')
    console.log('-----------RS.PRIMA HUSADA----------')
    console.log('-----------Administration-----------')
    console.log(`Selamat Datang ${this.tamp.name}, akses anda ada di level ${this.tamp.role}`);
    console.log(`[1]Daftar Pasien`)
    console.log(`[2]Detil Pasien`)
    console.log(`[3]Tambah Pasien`)
    console.log(`[4]Hapus Pasien`)
    console.log(`[5]Daftar Pegawai`)
    console.log(`[6]Tambah Pegawai`)
    console.log(`[7]Hapus Pegawai`)
    console.log(`[8]Logout`)
    rl.question('masukkan:',(option)=>{
      switch (option) {
        case '1':
        // console.log('akasjd');
          this.daftarPasien()
          break;
        case '2':
          this.detilPasien()
          break;
        case '3':
          this.tambahPasien()
          break;
        case '4':
          this.hapusPasien()
          break;
        case '5':
          this.daftarPegawai()
          break;
        case '6':
          this.tambahPegawai()
          break;
        case '7':
          this.hapusPegawai()
          break;
        case '8':
          this.index()
          break;
        default:
      }
    })
  }

  daftarPasien(){
    console.log(this.patients);
    this.menuAdmin()
  }

  detilPasien(){
    rl.question('Masukkan ID',(input)=>{
      console.log(this.patients[input-1]);
      this.menuAdmin()
    })
  }

  tambahPasien(){
    let tambah=[]
    rl.question('Masukkan nama pasien baru:',(namaPasien)=>{
      rl.question('masukkan diagnosis:',(diagnosis)=>{
        let id=this.patients[this.patients.length-1].id+1
        let pasienBaru=new Patient(id,namaPasien,diagnosis)
        this.patients.push(pasienBaru)
        console.log(this.patients);
        this.menuAdmin()
      })
    })
  }
  hapusPasien(){
    rl.question('Masukkan ID pasien yang akan di hapus:',(input)=>{
    this.patients.splice(input-1,1)
      console.log(this.patients);
      this.menuAdmin()
    })
  }
  daftarPegawai(){
    console.log(this.employees);
    menuDoctor()
  }

  tambahPegawai(){
    let tambah=[]
    rl.question('Masukkan nama pasien baru:',(namaPegawai)=>{
        rl.question('masukkan Posisi employee:',(position)=>{
      rl.question('masukkan username:',(username)=>{
        rl.question('Masukkan password:',(password)=>{
        let id=this.employees[this.employees.length-1].id+1
        let pegawaiBaru=new Employee(namaPegawai,position,username,password)
        this.employees.push(pegawaiBaru)
        console.log(this.employees);
        this.menuDoctor()
      })
      })
        })
    })
  }
  hapusPegawai(){
    rl.question('Masukkan ID pegawai yang akan dipecat:',(input)=>{
      this.employees.splice(input-1,1)
      console.log(this.employees);
    })
  }


  //======================dokter=======================
  menuDoctor(){
    console.log('------------------------------------')
    console.log('-----------RS.PRIMA HUSADA----------')
    console.log('----------------Dokter--------------')
    console.log(`[1] Daftar Pasien`)
    console.log(`[2] Detil Pasien`)
    console.log(`[3] Logout`)
    rl.question('masukkan:',(option)=>{
      switch (option) {
        case '1':
        // console.log('akasjd');
          this.daftarPasien()
          break;
        case '2':
          this.detilPasien()
          break;
        case '3':
          this.index()
          break;
          default:
        }
    })
  }
  menuOb(){
    console.log('------------------------------------')
    console.log('-----------RS.PRIMA HUSADA----------')
    console.log('--------------OfficeBoy-------------')
    console.log(`[1]Logout`);
    rl.question('Pilih: ', (input) => {
      if (input == 1) {
        this.index()
        this.tamp = {}
      }
    })
  }

}
let employee1 = new Employee('Chandra', 'Doctor', 'chandra', 'chandra')
let employee2 = new Employee('Buwana', 'Doctor', 'buwana', 'buwana')
let employee3 = new Employee('Muhammad', 'Doctor', 'muhammad', 'muhammad')
let employee4 = new Employee('Yanti', 'Administration', 'yanti', 'yanti')
let employee5 = new Employee('Sukro', 'OfficeBoy', 'sukro', 'sukro')
let patient1 = new Patient(1, 'Budi', 'Jantung')
let patient2 = new Patient(2, 'Badu', 'Stroke')
let patient3 = new Patient(3, 'Tono', 'Tipes')
let arrPatient=[patient1,patient2,patient3]
let arrEmployees=[employee1,employee1,employee1,employee4,employee5]
let hospital = new Hospital('RS PRIMA HUSADAD', 'Kebayoran',arrEmployees,arrPatient)
hospital.index()

module.exports = Hospital
