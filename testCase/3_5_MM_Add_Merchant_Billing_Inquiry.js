Feature('3_5_MM_Add_Merchant_Billing_Inquiry');

const fs = require("fs");
const faker = require('faker');

Before(async ({ login }) => {
    login("admin");
});

Scenario('Main Flow Add Merchant Billing Inquiry', async ({ I }) => {

    const randNumber = faker.random.number({min: 111111111, max: 9999999999});
    const ID = faker.phone.phoneNumber("#####");

    await I.click("Merchant Management");
    await I.see("Merchant Management");
    await I.click("Add Merchant");
    await I.see("Add Merchant");
    await I.click(
        "#merchant-form > div:nth-child(2) > div.card-body > div.form-group.row.highlight-addon.field-merchant-merchant_type.required > div > span > span.selection > span"
      );
    await I.click("//li[.='Billing Inquiry']");
    await I.fillField("#merchant-merchant_name", "automation burhan"+ randNumber);
    await I.click("#select2-merchant-prefix-container")
    await I.click("//li[.='987']");
    await I.fillField("#suff_merchant_id", ID);
    await I.fillField("#merchant-merchant_alias", "alias" + randNumber);
    await I.fillField("#merchant-branch_code", '0110');
    await I.fillField("#merchant-account_number", + randNumber);
    await I.click(
        "#select2-merchant-debit_method-container"
      );
    await I.click("//li[.='Invoice']");
    await I.fillField("#merchant-debit_account_number", + randNumber);
    await I.fillField("#merchant-email",randNumber + process.env.MS_serverDomain);
    await I.fillField("#merchant-phone_number",faker.phone.phoneNumber('628##########'));
    await I.fillField("#merchant-address", "Bekasi");
    await I.click(
        "#select2-merchant-currency-container"
      );
    await I.click("//li[.='IDR']");
    await I.fillField("#merchant-allowed_ip", "127.0.0.1");
    await I.click(
        "#merchant-form > div:nth-child(3) > div.card-body > div.form-group.row.highlight-addon.field-merchant-callback_partner_client_id > div > div > div > button"
    );
    let clientID = await I.grabValueFrom("#merchant-callback_partner_client_id");
    await I.fillField("#merchant-client_id", clientID);
    await I.click(
        "#merchant-form > div:nth-child(3) > div.card-body > div.form-group.row.highlight-addon.field-merchant-callback_partner_client_secret > div > div > div > button"
    );
    let clientSecret = await I.grabValueFrom("#merchant-callback_partner_client_secret");
    await I.fillField("#merchant-client_secret", clientSecret);
    await I.click("#key-size");
    await I.click(
        "#merchant-form > div:nth-child(3) > div.card-body > div.form-group.row.mb-1 > div > div > div > div > a:nth-child(1)"
    );
    await I.click("Generate New Keys");
    let privateKey = await I.grabValueFrom("#merchant-callback_partner_private_key");
    let publicKey = await I.grabValueFrom("#merchant-callback_partner_public_key");
    await I.fillField("#merchant-private_key", privateKey);
    await I.fillField("#merchant-public_key", publicKey);
    await I.fillField("#merchant-callback_partner_url","https://api-alpha-autopay.bni-ecollection.com/dummy-merchant/v1.0/debit/callback");
    await I.fillField("#merchant-callback_partner_url_token","https://api-alpha-autopay.bni-ecollection.com/dummy-merchant/api/v1.0/access-token/b2b");
    await I.click("#select2-merchant-fee_charge-container");
    await I.click("//li[.='Merchant']");
    await I.fillField("#merchant-fee_transaction", faker.phone.phoneNumber('###'));
    await I.fillField("#merchant-fee_spe", faker.phone.phoneNumber('##'));
    await I.fillField("#merchant-fee_3rd", faker.phone.phoneNumber('#'));
    await I.fillField("#merchant-third_party_name", "auto"+ randNumber);
    await I.click(
        "#merchant-form > div:nth-child(5) > div.card-body > div.form-group.row.highlight-addon.field-merchant-disable_otp_unbinding > div > label"
    );
    await I.click(
      "#merchant-form > div:nth-child(5) > div.card-body > div.form-group.non-retail.billing-inquiry.highlight-addon.row.field-merchant-disable_otp_force_debit > div > label"
      );
    await I.fillField("#merchant-limit_billing_amount","100000000");
    await I.click("#select2-merchant-rule_type-container");
    await I.click("//li[.='Daily']");
    await I.fillField("#merchant-rule_time", "0700");
    //Button debit secondary
    // await I.click(
    //   "#merchant-form > div:nth-child(5) > div.card-body > div.form-group.non-retail.billing-inquiry.highlight-addon.row.field-merchant-use_secondary_debit_time > div > label"
    // );
    // await I.click(
    //   "#merchant-form > div:nth-child(5) > div.card-body > div.form-group.non-retail.billing-inquiry.highlight-addon.row.field-merchant-use_secondary_debit_time > div > label"
    // );
    await I.fillField("#merchant-secondary_debit_time", "13");
    await I.click("Uncheck All");
    await I.click("Check All");
    await I.click("Save");
    // Validasi
    await I.fillField("#merchantsearch-merchant_name", "automation burhan"+ randNumber);
    await I.pressKey("Enter");
    await I.see("automation burhan"+ randNumber);
    await I.see("Showing 1-1 of 1 item.");

    // save merchant retail ke file json
  fs.readFile("pages/testData/testData.json", "utf8", (err, data) => {
    const information = JSON.parse(data);
    information[0].merchantBillingInquiry = "987" + ID;
    information[0].merchantBillingInquiryName = "automation burhan"+ randNumber;
    fs.writeFile(
      "pages/testData/testData.json",
      JSON.stringify(information, null, 2),
      (err) => {}
    );
  });
       
});
