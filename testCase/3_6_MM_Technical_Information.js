Feature('3_6_MM_Technical_Information');

const faker = require('faker');
const fs = require("fs");

Before(async ({ login }) => {
    login("admin");
});

Scenario('Main Flow Technical Information', async ({ I }) => {

  await I.click("Merchant Management")
  await I.see("Merchant Management")
  const getData = I.loadJSON();
  I.fillField("#merchantsearch-merchant_id", getData[0].merchantRetail);
  await I.pressKey("Enter");

  await I.see(getData[0].merchantRetail);
  await I.click("#w0-container > table > tbody > tr > td.skip-export.kv-align-center.kv-align-middle.w0 > div.btn-group > span > a > i");

  //Validation
  await I.see(getData[0].merchantRetail);
  await I.see((getData[0].merchantRetailName))
       
});
