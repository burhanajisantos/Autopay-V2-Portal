Feature('3_2_MM_Pending_Approval_Filter_Data');

Before(async ({ login }) => {
    login("admin");
});

Scenario('Main Flow Pending Approval Filter Data', async ({ I }) => {
    var today = new Date();
    var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

    await I.click("Merchant Management")
    await I.see("Merchant Management")
    await I.click("Pending Approval")
    await I.see("Pending Approval")

    let MerchantName = await I.grabTextFrom("#grid-id-container > table > tbody > tr:nth-child(1) > td:nth-child(3)");
    let OldBNIGiro = await I.grabTextFrom("#grid-id-container > table > tbody > tr:nth-child(1) > td:nth-child(5)");
    let NewBNIGiro = await I.grabTextFrom("#grid-id-container > table > tbody > tr:nth-child(1) > td:nth-child(6)");
    await I.click("#grid-id-filters > td:nth-child(1) > span > span.selection > span");
    await I.click("//li[.='" + MerchantName + "']");
    await I.fillField("#merchantapprovalsearch-old_value", OldBNIGiro);
    await I.pressKey("Enter");
    await I.fillField("#merchantapprovalsearch-new_value", NewBNIGiro);
    await I.pressKey("Enter");
    await I.see("Showing 1-1 of 1 item.");
});
