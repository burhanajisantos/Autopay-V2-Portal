Feature('3_1_MM_Filter_Data');

Before(async ({ login }) => {
    login("admin");
});
Scenario('Main Flow Filter Data', async ({ I }) => {
    var today = new Date();
    var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

    await I.click("Merchant Management")
    await I.see("Merchant Management")

  let MerchantID = await I.grabTextFrom("#w0-container > table > tbody > tr:nth-child(1) > td:nth-child(2)");
  let MerchantName = await I.grabTextFrom("#w0-container > table > tbody > tr:nth-child(1) > td:nth-child(3)");
  let MerchantType = await I.grabTextFrom("#w0-container > table > tbody > tr:nth-child(1) > td:nth-child(4)");
  let BranchCode = await I.grabTextFrom("#w0-container > table > tbody > tr:nth-child(1) > td:nth-child(5)");
  let Email = await I.grabTextFrom("#w0-container > table > tbody > tr:nth-child(1) > td:nth-child(6)");
  let AccountNumber = await I.grabTextFrom(
    "#w0-container > table > tbody > tr:nth-child(1) > td:nth-child(8)"
  );
  let CreateAt = await I.grabTextFrom("#w0-container > table > tbody > tr:nth-child(1) > td:nth-child(09)");
  let status = await I.grabTextFrom("#w0-container > table > tbody > tr:nth-child(1) > td:nth-child(10)");
  let result = CreateAt.substring(0, 9);
  await I.fillField("#merchantsearch-start_date_filter", result);
  await I.pressKey("Enter");
  await I.fillField("#merchantsearch-end_date_filter", date);
  await I.pressKey("Enter");
  await I.fillField("#merchantsearch-merchant_id", MerchantID);
  await I.pressKey("Enter");
  await I.fillField("#merchantsearch-merchant_name", MerchantName);
  await I.pressKey("Enter");
  await I.click("#select2-merchantsearch-merchant_type-container > span");
  await I.click("//li[.='" + MerchantType + "']");
  await I.fillField("#merchantsearch-branch_code", BranchCode);
  await I.pressKey("Enter");
  await I.fillField("#merchantsearch-email", Email);
  await I.pressKey("Enter");
  await I.fillField("#merchantsearch-account_number", AccountNumber);
  await I.pressKey("Enter");
  await I.click("#merchantsearch-status");
  await I.click("//li[.='" + status + "']");
});
