Feature('3_9_MM_User_Merchant_Retail_Add');

const fs = require("fs");
const faker = require('faker');

// Before(async ({ login }) => {
//     login("admin");
// });

Scenario.skip('Main Flow User Merchant Retail Add', async ({ I }) => {


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

Scenario.skip('Main Flow Login User Merchant', async ({ I }) => {

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

Scenario.skip('Main Flow Cek Menu Dashboard User Merchant Retail ', async ({ I }) => {

  //login
  I.amOnPage(process.env.url);
  const getData = I.loadJSON();
  I.fillField('#loginform-username',process.env.userRetail);
  I.fillField('#loginform-password',process.env.passRetail);
  I.click('Login');
  I.waitForText('Dashboard',10);
  I.see(process.env.userRetail);

  // Cek Menu
  I.click('Dashboard');
  let today = new Date();
  today = today.toISOString().substring(0, 10);
  let startdate = today.split("-");
  let bulan = parseInt(startdate[1] - 1);
  if (bulan == 0) {
    bulan = 12;
    startdate[0] = parseInt(startdate[0]) - 1;
  }
  await I.fillField("#start_date", startdate[0] + "-" + bulan + "-" + startdate[2]);
  await I.pressKey("Enter");
  await I.fillField("#end_date", today);
  await I.pressKey("Enter");

  //validation
  await I.see('IDR');


});

Scenario.skip('Main Flow Cek Menu Cust Management > Customer All User Merchant Retail ', async ({ I }) => {

  //login
  I.amOnPage(process.env.url);
  const getData = I.loadJSON();
  I.fillField('#loginform-username',process.env.userRetail);
  I.fillField('#loginform-password',process.env.passRetail);
  I.click('Login');
  I.waitForText('Dashboard',10);
  I.see(process.env.userRetail);

  // Cek Menu
  I.click('Cust Management');
  I.see('Customer All');
  I.click('Customer All');
  I.seeElement('#grid-id-container > table > tbody > tr:nth-child(1) > td:nth-child(3) > div > span');
  const elementSelector = '#grid-id-container > table > tbody > tr:nth-child(1) > td:nth-child(3) > div > span';
  const titleAttributeValue = await I.grabAttributeFrom(elementSelector, 'title');
  fs.readFile("pages/testData/testData.json", "utf8", (err, data) => {
    const information = JSON.parse(data);
    information[0].custIDMerchantRetail = titleAttributeValue;
    fs.writeFile(
      "pages/testData/testData.json",
      JSON.stringify(information, null, 2),
      (err) => {}
    );
  });

  await I.fillField('#customersearch-bank_card_token', getData[0].custIDMerchantRetail);
  await I.pressKey('Enter');
  let CustomerName = await I.grabTextFrom("#grid-id-container tr:nth-child(1) > td:nth-child(2)");
  let AccountNumber = await I.grabTextFrom("#grid-id-container tr:nth-child(1) > td:nth-child(4)");
  let LastDebitCard = await I.grabTextFrom("#grid-id-container tr:nth-child(1) > td:nth-child(5)");
  let Email = await I.grabTextFrom("#grid-id-container tr:nth-child(1) > td:nth-child(6)");
  const dateElementSelector = '#grid-id-container tr:nth-child(1) > td:nth-child(8)'; 
  const dateText = await I.grabTextFrom(dateElementSelector);
  //Cutting Character
  const manipulatedDate = dateText.slice(0, -8);
  await I.fillField('#customersearch-bank_account_number', AccountNumber);
  await I.pressKey('Enter');
  await I.fillField('#customersearch-last_debit_card', LastDebitCard);
  await I.pressKey('Enter');
  await I.fillField('#customersearch-email', Email);
  await I.pressKey('Enter');
  await I.fillField('#customersearch-datetime_created', manipulatedDate);
  await I.pressKey('Enter');

  //validation
  I.see(CustomerName);

});


Scenario('Main Flow Cek Menu Report > Payment History User Merchant Retail ', async ({ I }) => {

  //login
  I.amOnPage(process.env.url);
  const getData = I.loadJSON();
  I.fillField('#loginform-username', process.env.userRetail);
  I.fillField('#loginform-password', process.env.passRetail);
  I.click('Login');
  I.waitForText('Dashboard',10);
  I.see(process.env.userRetail);

  // Cek Menu
  I.click('Report');
  I.see('Payment History');
  I.click('Payment History');
  I.see('Payment History');
  let today = new Date();
  today = today.toISOString().substring(0, 10);
  let startdate = today.split("-");
  let bulan = parseInt(startdate[1] - 1);
  if (bulan == 0) {
    bulan = 12;
    startdate[0] = parseInt(startdate[0]) - 1;
  }
  I.fillField("#transactionsearch-start_date", startdate[0] + "-" + bulan + "-" + startdate[2]); //mengisi tanggal start date 1 bulan dari tanggal hari ini
  I.pressKey("Enter");
  I.fillField("#transactionsearch-end_date", today);
  I.pressKey("Enter");
  await I.seeElement('#grid-id-container > table > tbody > tr:nth-child(1) > td:nth-child(3) > div > span');

  const elementSelector = '#grid-id-container > table > tbody > tr:nth-child(1) > td:nth-child(3) > div > span';
  const titleAttributeValue = await I.grabAttributeFrom(elementSelector, 'title');
  fs.readFile("pages/testData/testData.json", "utf8", (err, data) => {
    const information = JSON.parse(data);
    information[0].custIDMerchantRetail = titleAttributeValue;
    fs.writeFile(
      "pages/testData/testData.json",
      JSON.stringify(information, null, 2),
      (err) => {}
    );
  });
  await I.click('#transactionsearch-bank_card_token');
  await I.fillField('#transactionsearch-bank_card_token', getData[0].custIDMerchantRetail);
  await I.pressKey('Enter');
  let CustomerName = await I.grabTextFrom("#grid-id-container tr:nth-child(1) > td:nth-child(4)");
  let JournalNumber = await I.grabTextFrom("#grid-id-container tr:nth-child(1) > td:nth-child(6)");
  let TransactionId = await I.grabTextFrom("#grid-id-container tr:nth-child(1) > td:nth-child(9)");
  let DeviceId = await I.grabTextFrom("#grid-id-container tr:nth-child(1) > td:nth-child(10)");
  let Currency = await I.grabTextFrom("#grid-id-container tr:nth-child(1) > td:nth-child(11)");
  let Remark = await I.grabTextFrom("#grid-id-container tr:nth-child(1) > td:nth-child(12)");
  let Status = await I.grabTextFrom("#grid-id-container tr:nth-child(1) > td:nth-child(13)");
  await I.fillField('#transactionsearch-account_number_name', CustomerName);
  await I.pressKey('Enter');
  await I.fillField('#transactionsearch-journal_number', JournalNumber);
  await I.pressKey('Enter');
  await I.fillField('#transactionsearch-partner_reference_no', TransactionId);
  await I.pressKey('Enter');
  await I.fillField('#transactionsearch-device_id', DeviceId);
  await I.pressKey('Enter');
  await I.click("#transactionsearch-currency");
  await I.click("//li[.='" + Currency + "']");
  await I.pressKey('Enter');
  await I.fillField('#transactionsearch-remark', Remark);
  await I.pressKey('Enter');
  await I.click("#transactionsearch-status");
  await I.click("//li[.='" + Status + "']");
  await I.pressKey('Enter');
  await I.see('Showing 1-1 of 1 item');
});