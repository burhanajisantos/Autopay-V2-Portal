Feature('3_9_MM_User_Merchant_Retail_Add');

const fs = require("fs");
const faker = require('faker');

// Before(async ({ login }) => {
//     login("admin");
// });

Scenario('Main Flow User Merchant Retail Add', async ({ I }) => {


    const randNumber = faker.random.number({min: 1111, max: 9999});
    //login
    I.amOnPage(process.env.url)
    I.fillField('#loginform-username', process.env.useradmin)
    I.fillField('#loginform-password', process.env.passadmin)
    I.click('Login')
    I.waitForText('Dashboard',10)
    I.see(process.env.useradmin)

    await I.click("Merchant Management");
    await I.see("Merchant Management");

    // Search Merchant
    const getData = I.loadJSON();
    await I.fillField("#merchantsearch-merchant_id", getData[0].merchantRetail);
    await I.pressKey("Enter");
    await I.see(getData[0].merchantRetail);
    await I.click(
      "#w0-container a:nth-child(3) > i"
    );
    await I.see("Users Data");

    //Add User Merchant
    await I.click("Add User");
    await I.see("Add User");
    await I.fillField("#usermerchant-username","autouser"+ randNumber);
    await I.fillField("#usermerchant-email","autouser"+randNumber + process.env.MS_serverDomain);
    await I.fillField("#usermerchant-password", "Spe@2023");
    const customer_management_menu = 'customer-management-menu';
    const dashboard_menu = 'dashboard-menu';
    const report_menu = 'report-menu';
    await I.click({name: customer_management_menu});
    await I.click({name: dashboard_menu});
    await I.click({name: report_menu});
    await I.click("Save");

    fs.readFile("pages/testData/testData.json", "utf8", (err, data) => {
      const information = JSON.parse(data);
      information[0].userMerchantRetail = "autouser"+ randNumber;
      information[0].emailMerchantRetail = "autouser"+randNumber + process.env.MS_serverDomain;
      information[0].passMerchantRetail = "Spe@2023";
      fs.writeFile(
        "pages/testData/testData.json",
        JSON.stringify(information, null, 2),
        (err) => {}
      );
    });

    // Validation
    await I.fillField("#usermerchantsearch-username",getData[0].userMerchantRetail);
    await I.pressKey("Enter");
    await I.waitForText(getData[0].userMerchantRetail);

});

Scenario('Main Flow Login User Merchant', async ({ I }) => {

  const randNumber = faker.random.number({min: 1111, max: 9999});
  //login
  I.amOnPage(process.env.url);
  const getData = I.loadJSON();
  I.fillField('#loginform-username',getData[0].userMerchantRetail);
  I.fillField('#loginform-password', getData[0].passMerchantRetail);
  I.click('Login');
  I.waitForText('Dashboard',10);
  I.see(getData[0].userMerchantRetail);

  //changepassword 
  I.fillField('#changepasswordform-current_password', getData[0].passMerchantRetail);
  I.fillField('#changepasswordform-new_password', process.env.resetPass);
  I.fillField('#changepasswordform-repeat_new_password', process.env.resetPass);
  I.click('Submit');

  //Login again
  I.fillField('#loginform-username',getData[0].userMerchantRetail);
  I.fillField('#loginform-password', process.env.resetPass);
  I.click('Login');
  I.waitForText('Dashboard',10);

  //validation
  I.see('Dashboard');
  I.click('Cust Management');
  I.see('Customer All');
  I.click('Report')
  I.see('Payment History');

});
