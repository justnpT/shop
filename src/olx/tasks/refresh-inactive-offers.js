const setup = require('../../setup/setup');
let config = require('../config');
let cred = require(config.credentials_path);
let su = new setup(config.olx_home);

let home = require('../elements/desktop/logged_out/home');
let login = require('../elements/desktop/logged_out/modals/login');

(async () => {
    const page = await su.start();
    await page.waitForSelector(home.logIn, {visible: true});
    await page.click(home.logIn);
    await page.waitForSelector(login.email, {visible: true});
    await page.type(login.email, cred.olx.username);
    await page.waitForSelector(login.password, {visible: true});
    await page.type(login.password, cred.olx.password);
    await page.waitForSelector(login.logIn, {visible: true});
    await page.click(login.logIn);

    await su.stop();
})();