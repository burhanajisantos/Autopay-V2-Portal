Feature('3_3_MM_Pending_Approval_Resend_Email');

Before(async ({ login }) => {
    login("admin");
});

Scenario('Main Flow Resend Partial', async ({ I }) => {

    await I.click("Merchant Management")
    await I.see("Merchant Management")
    await I.click("Pending Approval")
    await I.see("Pending Approval")
    await I.waitForElement("#grid-id-container > table > tbody > tr:nth-child(1) > td.skip-export.kv-align-center.kv-align-middle.grid-id.kv-row-select > input")
    await I.checkOption("#grid-id-container > table > tbody > tr:nth-child(1) > td.skip-export.kv-align-center.kv-align-middle.grid-id.kv-row-select > input")
    await I.waitForElement("#grid-id-container > table > tbody > tr:nth-child(3) > td.skip-export.kv-align-center.kv-align-middle.grid-id.kv-row-select > input")
    await I.checkOption("#grid-id-container > table > tbody > tr:nth-child(3) > td.skip-export.kv-align-center.kv-align-middle.grid-id.kv-row-select > input")
    await I.click("Resend Approval Email")
    await I.acceptPopup()
    // await I.aler("Email has been sent")
});

Scenario('Main Flow Resend All', async ({ I }) => {

    await I.click("Merchant Management")
    await I.see("Merchant Management")
    await I.click("Pending Approval")
    await I.see("Pending Approval")
    await I.waitForElement("#grid-id-container > table > thead > tr:nth-child(1) > th.kv-all-select.kv-align-center.kv-align-middle.skip-export.kv-merged-header > input")
    await I.checkOption("#grid-id-container > table > thead > tr:nth-child(1) > th.kv-all-select.kv-align-center.kv-align-middle.skip-export.kv-merged-header > input")
    await I.click("Resend Approval Email")
    await I.acceptPopup()
    // await I.aler("Email has been sent")
});
