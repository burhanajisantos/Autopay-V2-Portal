const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
require("dotenv").config();
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: 'testCase/*.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: process.env.url,
      show: true,
      //windowSize: '1200x900'
      chrome: {
        // userDataDir: "session",
        args: ["--start-maximized", "--cast-initial-screen-width"],
        defaultViewport: null,
      }
    }
  },
  include: {
    I: './steps_file.js'
  },
  plugins: {
    autoDelay: {
      enabled: true
    },
    autoLogin: {
      enabled: true,
      saveToFile: true,
      inject: 'login',
      users: {
        admin: {
          // loginAdmin function is defined in `steps_file.js`
          login: (I) => I.loginUserAdmin(),
          // if we see `Admin` on page, we assume we are logged in
          check: (I) => {
             I.amOnPage('/');
             I.seeCurrentUrlEquals(process.env.url + "/");
          }
        }
      }
    }
 },
 
  name: 'V2_Portal'
}