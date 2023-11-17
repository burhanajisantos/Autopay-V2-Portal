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
      url: 'http://localhost',
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
  name: 'V2_Portal'
}