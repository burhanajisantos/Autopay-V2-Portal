Feature('3_7_MM_Edit_Merchant_Retail');

const fs = require("fs");
const faker = require('faker');

Before(async ({ login }) => {
    login("admin");
});

Scenario('Main Flow Edit Merchant Retail', async ({ I }) => {

    const randNumber = faker.random.number({min: 111111111, max: 9999999999});
    const ID = faker.phone.phoneNumber("#####");

    await I.click("Merchant Management");
    await I.see("Merchant Management");

    // Search Merchant
    const getData = I.loadJSON();
    await I.fillField("#merchantsearch-merchant_id", getData[0].merchantRetail);
    await I.pressKey("Enter");
    await I.see(getData[0].merchantRetail);
    await I.click(
      "#w0-container a:nth-child(2)"
    );
    await I.see("Update");

    // Update Merchant
    await I.fillField("#merchant-branch_code", '1111');
    await I.fillField("#merchant-email","update"+randNumber + process.env.MS_serverDomain);
    await I.fillField("#merchant-phone_number",faker.phone.phoneNumber('628#########'));
    await I.fillField("#merchant-address", faker.address.cityName()+"-updated");
    await I.fillField("#merchant-allowed_ip", faker.internet.ip());
    await I.fillField("#merchant-fee_transaction", faker.phone.phoneNumber('####'));
    await I.fillField("#merchant-fee_spe", faker.phone.phoneNumber('###'));
    await I.fillField("#merchant-fee_3rd", faker.phone.phoneNumber('##'));
    await I.click("Save");

    //validation
    await I.fillField("#merchantsearch-merchant_id", getData[0].merchantRetail);
    await I.pressKey("Enter");
    await I.see("Showing");
    await I.see("1111");

});
