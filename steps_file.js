// in this file you can append custom step methods to 'I' object

module.exports = function() {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

    loginUserAdmin(){
      this.amOnPage(process.env.url)
      this.fillField('#loginform-username', process.env.useradmin)
      this.fillField('#loginform-password', process.env.passadmin)
      this.click('Login')
      this.waitForText('Dashboard',10)
      this.see(process.env.useradmin)
    }

  });
}
