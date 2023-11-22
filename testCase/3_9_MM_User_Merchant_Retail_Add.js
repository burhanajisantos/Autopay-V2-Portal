Feature('3_9_MM_User_Merchant_Retail_Add');

const fs = require("fs");
const faker = require('faker');

Before(async ({ login }) => {
    login("admin");
});

Scenario('Main Flow User Merchant Retail Add', async ({ I }) => {

    const randNumber = faker.random.number({min: 1111, max: 9999});
    const ID = faker.phone.phoneNumber("#####");

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
    await I.see(getData[0].userMerchantRetail);

});
