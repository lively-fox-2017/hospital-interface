
class Employee {
  constructor(id, name, position, username, password) {
    this.id = id
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }
  menuAdmin(){
    console.log(`[1]Daftar Pasien`)
    console.log(`[2]Detil Pasien`)
    console.log(`[3]Tambah Pasien`)
    console.log(`[4]Hapus Pasien`)
    console.log(`[5]Daftar Pegawai`)
    console.log(`[6]Tambah Pegawai`)
    console.log(`[7]Hapus Pegawai`)
    console.log(`[x]Logout`)
  }

  menuDoctor(){
    console.log(`[list] Daftar Pasien`)
    console.log(`[detail] Detil Pasien`)
    console.log(`[x] Logout`)
  }

  menuOB(){
    console.log(`Maaf, anda tidak mempunyai akses ke menu utama`);
    console.log(`[x]Logout`);
  }

}

module.exports = Employee
