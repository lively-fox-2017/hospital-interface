class Login {
  constructor(rl) {
    this.rl = rl;
  }
  loginView(hospital, callback) {
    console.log(`Welcome to ${hospital.name}\n${'='.repeat(30)}\n`);
    this.username((username) => {
      this.password('Password: ', username, (password) => {
        callback(username, password);
      })
    });
  }

  username(callback) {
    this.rl.question('Username: ', (username) => {
      callback(username);
    });
  }

  password(str, username, callback) {
    this.rl.question(str, (password) => {
      callback(password);
    });
  }
}

module.exports = Login;
