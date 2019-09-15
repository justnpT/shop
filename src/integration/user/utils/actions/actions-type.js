let maxImplicitWait = require('../../config/config-global').static.maximumImplicitWaitTimeout;
let animation = require('../monitoring/animation/animation');

module.exports = {

    typeAfter_exp: async function (page, selector, text) {
        await page.waitForSelector(selector, {visible: true});
        await this.typeWithStringConversion(page, selector, text)
    },

    typeAfter_expImp: async function (page, selector, text) {
        await page.waitForSelector(selector, {visible: true});
        await page.waitFor(maxImplicitWait);
        await this.typeWithStringConversion(page, selector, text)
    },

    typeAfter_expAnim: async function (page, selector, text) {
        await page.waitForSelector(selector, {visible: true});
        await animation.waitForMovementToFinishAfterExp(page, selector);
        await this.typeWithStringConversion(page, selector, text)
    },

    typeAfter_expAnimImp: async function (page, selector, text) {
        await page.waitForSelector(selector, {visible: true});
        await animation.waitForMovementToFinishAfterExp(page, selector);
        await page.waitFor(maxImplicitWait);
        await this.typeWithStringConversion(page, selector, text)
    },

    typeWithStringConversion: async function (page, selector, text) {
        await page.type(selector, String(text))
    },

}