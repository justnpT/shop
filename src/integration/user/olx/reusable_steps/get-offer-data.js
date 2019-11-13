const setup = require('../../setup/setup');
let config = require('../config');
let cred = require(config.credentials);
let su = new setup(config.baseUrl);

let home = require('../pages/home.page');
let login = require('../pages/modal.login');
let advertisments = require('../pages/offers.page');
let offer = require('../pages/offer.page');

(async () => {
    const page = await su.start();
    await page.waitForSelector(home.logIn, {visible: true});
    await page.click(home.logIn);
    await page.waitForSelector(login.email, {visible: true});
    await page.type(login.email, cred.olx.email);
    await page.waitForSelector(login.password, {visible: true});
    await page.type(login.password, cred.olx.password);
    await page.waitForSelector(login.logIn, {visible: true});
    await page.click(login.logIn);
    await page.waitFor(3000);
    await page.waitForSelector(advertisments.zakonczone, {visible: true});
    await page.click(advertisments.zakonczone);
    await page.waitFor(3000);
    await page.waitForSelector(advertisments.previews, {visible: true});
    await page.click(advertisments.previews);

    //thread: https://github.com/GoogleChrome/puppeteer/issues/386

    // betterize
    const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
    await page.click('my-link');
    const newPage = await newPagePromise;
    // newPage.waitForSelector(...)
    //above improved:

    function getNewPageWhenLoaded() {
        return new Promise((x) => browser.once('targetcreated', async (target) => {
            const newPage = await target.page(); //<- may return null if devtools on ?
            const newPagePromise = new Promise(() => newPage.once('domcontentloaded', () => x(newPage)));
            const isPageLoaded = await newPage.evaluate(() => document.readyState);
            return isPageLoaded.match('complete|interactive') ? x(newPage) : newPagePromise;
        }));
    }

    // possible solution to devtools on ?
    // https://github.com/GoogleChrome/puppeteer/blob/v1.10.0/docs/api.md#browserwaitfortargetpredicate-options

    await page.waitForSelector(offer.category);
    await page.waitForSelector(offer.description);
    await page.waitForSelector(offer.price);
    await page.waitForSelector(offer.who);
    await page.waitForSelector(offer.title);
    await page.waitForSelector(offer.usage);
    let category = await page.evaluate((sel) => document.querySelector(sel).textContent, offer.category);
    let description = await page.evaluate((sel) => document.querySelector(sel).textContent, offer.description);
    let price = await page.evaluate((sel) => document.querySelector(sel).textContent, offer.price);
    let who = await page.evaluate((sel) => document.querySelector(sel).textContent, offer.who);
    let title = await page.evaluate((sel) => document.querySelector(sel).textContent, offer.title);
    let usage = await page.evaluate((sel) => document.querySelector(sel).textContent, offer.usage);
    print(usage)
//TODO: get text from fields and print

    await su.stop();
})();