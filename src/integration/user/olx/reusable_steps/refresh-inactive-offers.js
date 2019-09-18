const setup = require('../../setup/setup');
let config = require('../config');
let cred = require(config.credentials_path);
let su = new setup(config.olx_home);

let home = require('../elements/pages/page.home');
let login = require('../elements/pages/modal.login');
let advertisments = require('../elements/pages/page.ogloszenia');

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
    await page.waitForSelector(advertisments.zakonczone, {visible: true});
    await page.click(advertisments.zakonczone);
    await page.waitForSelector(advertisments.zakonczoneOgloszenia.aktywizujZaznaczoneCheckbox, {visible: true});
    await page.click(advertisments.zakonczoneOgloszenia.aktywizujZaznaczoneCheckbox);
    await page.waitForSelector(advertisments.zakonczoneOgloszenia.aktywizujZaznaczone, {visible: true});
    await page.click(advertisments.zakonczoneOgloszenia.aktywizujZaznaczone);

    await su.stop();
})();