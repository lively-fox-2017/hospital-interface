const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/*rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
}); */

/*rl.on('line', (input) => {
  input = 'dasar lu' + input
  console.log(`Received: ${input}`);
  rl.close()
}); */

rl.question('username? ', (answer) => {
  rl.question('password? ', (answer) => {
    // TODO: Log the answer in a database

  });
});
