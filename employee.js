class Employee {
  constructor(name, position, username, password) {
    this.name = name
    this.position = position
    this.username = username
    this.password = password
  }

  login(command, password) {
  	rl.question('#Please enter your username: ', (username) => {
	  if (username == 'zuhri') {
	  	hospital.validate(password);		
	  } else {
	  	console.log('Invalid username');
		hospital.login(command);
	  }
  	});
  }

  validate(password) {
  	rl.question('#Please enter your password: ', (password) => {
  	  if (password == 'nurhuda') {
  	  	hospital.reset_board();
	    console.log(`Welcome,. Your access level is: DOCTOR`);
	    hospital.option();
	  } else {
	    console.log('incorrect password');
	    hospital.validate(password);
	  }
	});
  }

  option() {
  	console.log('----------------------------------------\n' +
  		'What would you like to do?\n' +
  		'Options:\n' +
  		'- list_patients\n' +
  		'- view_records <patients_id>\n' +
  		'- add_records <patients_id>\n' +
  		'- remove_records <patients_id> <record_id>\n');
  }

  reset_board() {
    console.log('\x1B[2J');
  }
}

module.exports = Employee;
