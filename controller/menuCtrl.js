const Menu = require('../views/menu');

class MenuCtrl {
  constructor(rl, hospital) {
    this.menu = new Menu(rl);
    this.hospital = hospital;
  }

  index(employee) {
    this.menu.menuView(this.hospital, employee);
  }
}

module.exports = MenuCtrl;
