Feature('3_10_MM_User_Merchant_Billing_Inquiry_Add');

const fs = require("fs");
const faker = require('faker');

// Before(async ({ login }) => {
//     login("admin");
// });

Scenario('Main Flow User Merchant Billing Inquiry Add', async ({ I }) => {


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
    await I.fillField("#merchantsearch-merchant_id", getData[0].merchantBillingInquiry);
    await I.pressKey("Enter");
    await I.see(getData[0].merchantBillingInquiry);
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
    const customer_management_menu = 'customer-management-menu-billing';
    const dashboard_menu = 'dashboard-menu';
    const report_menu = 'report-menu';
    await I.click({name: customer_management_menu});
    await I.click({name: dashboard_menu});
    await I.click({name: report_menu});
    await I.click("Save");

    fs.readFile("pages/testData/testData.json", "utf8", (err, data) => {
      const information = JSON.parse(data);
      information[0].userMerchantBillingInquiry = "autouser"+ randNumber;
      information[0].emailMerchantBillingInquiry = "autouser"+randNumber + process.env.MS_serverDomain;
      information[0].passMerchantBillingInquiry = "Spe@2023";
      fs.writeFile(
        "pages/testData/testData.json",
        JSON.stringify(information, null, 2),
        (err) => {}
      );
    });

    // Validation
    await I.fillField("#usermerchantsearch-username",getData[0].userMerchantBillingInquiry);
    await I.pressKey("Enter");
    await I.waitForText(getData[0].userMerchantBillingInquiry);

});

Scenario('Main Flow Login User Merchant', async ({ I }) => {

  const randNumber = faker.random.number({min: 1111, max: 9999});
  //login
  I.amOnPage(process.env.url);
  const getData = I.loadJSON();
  I.fillField('#loginform-username',getData[0].userMerchantBillingInquiry);
  I.fillField('#loginform-password', getData[0].passMerchantBillingInquiry);
  I.click('Login');
  I.waitForText('Dashboard',10);
  I.see(getData[0].userMerchantBillingInquiry);

  //changepassword 
  I.fillField('#changepasswordform-current_password', getData[0].passMerchantBillingInquiry);
  I.fillField('#changepasswordform-new_password', process.env.resetPass);
  I.fillField('#changepasswordform-repeat_new_password', process.env.resetPass);
  I.click('Submit');

  //Login again
  I.fillField('#loginform-username',getData[0].userMerchantBillingInquiry);
  I.fillField('#loginform-password', process.env.resetPass);
  I.click('Login');
  I.waitForText('Dashboard',10);

  //validation
  I.see('Dashboard');
  I.click('Cust Management');
  I.see('Customer Billing Inquiry');
  I.click('Report')
  I.see('Payment History');

});
