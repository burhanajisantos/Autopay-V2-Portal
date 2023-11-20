Feature('Forgot_Password');

const MailosaurClient = require("mailosaur");
const mailosaur = new MailosaurClient(process.env.MS_clientID);
const serverId = process.env.MS_serverID;

const nameUser = "forgotpassword";
const userEmail = "mass-other" + process.env.MS_serverDomain;

Scenario.skip('Forgot Password Main Flow', async ({ I }) => {
    I.amOnPage(process.env.url);
    I.click("//a[contains(.,'Forgot your password?')]"); // klik forgot password
    I.waitForText("Enter your Email and instructions will be sent to you!");
    I.fillField("#forgotpasswordform-email", userEmail);
    I.click("Submit");
    // const testStart = date.toLocaleString();
    I.wait(5);
    const testStart = new Date();
  
    //Check Email to get reset link password
    const message = await mailosaur.messages.get(
      serverId,
      {
        sentTo: "mass-other@olrgeo6k.mailosaur.net",
      },
      {
        // Find messages received since Jan 1st 2020.
        // Note, this will be slower than the default, so we recommend
        // you only use this during initial configuration/setup.
        page: 0,
        itemsPerPage: 1,
        receivedAfter: testStart,
        timeout: 60000,
      }
    );
    // Save url reset password
    const resetPasswordLink = message.html.links[0];
    //console.log("link: " +resetPasswordLink.href)
    console.log(resetPasswordLink);
    //Reset Password
    I.amOnPage(resetPasswordLink.href);
    // const getData = I.loadJSON();
    // const resetPass = I.getResetPassword(getData[0].forgotPassword);
    I.waitForText("Enter new password for your Account!");
    I.fillField("#forgotpassword-password", process.env.resetPass);
    I.fillField("#forgotpassword-retypepassword", process.env.resetPass);
  
    I.click("Submit");
    I.waitForText("Password has been changed!");
  
    I.amOnPage(process.env.url);
    I.fillField("#loginform-username", nameUser);
    I.fillField("#loginform-password", process.env.resetPass);
    I.click("Login");
    I.waitForText("Dashboard", 10);
    I.see(nameUser);

});
