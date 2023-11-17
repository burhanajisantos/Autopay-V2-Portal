Feature('login');

Scenario('Main Flow',  ({ I }) => {
    I.amOnPage(process.env.url)
    I.fillField('#loginform-username', process.env.useradmin)
    I.fillField('#loginform-password', process.env.passadmin)
    I.click('Login')
    I.waitForText('Dashboard',10)
    I.see(process.env.useradmin)
});
