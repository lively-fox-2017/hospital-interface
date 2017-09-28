const readline = require('readline');

class Template {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }
}

let template = new Template()
module.exports = template.rl;
