import * as options from "../../pupp.conf";

let movement = require('../monitoring/movement');

module.exports = {

    clickAfter_explicit: async function (page, selector) {
        await page.waitForSelector(selector, {visible: true});
        await page.click(selector);
    },

    clickAfter_explicit_thenAwaitHidden: async function (page, selector) {
        await page.waitForSelector(selector, {visible: true});
        await page.click(selector);
        await page.waitForSelector(selector, {hidden: true});
    },

    clickAfter_expAnim: async function (page, selector, stableFor50msMultipliedBy=6, logInfo=false) {
        await page.waitForSelector(selector, {visible: true});
        await movement.waitForMovementToFinishAfterExp(page, selector, stableFor50msMultipliedBy, logInfo)
        await page.click(selector);
    },

    clickAfter_expAnimImp: async function (page, selector) {
        await page.waitForSelector(selector, {visible: true});
        await movement.waitForMovementToFinishAfterExp(page, selector)
        await page.waitFor(options.middleImplicitWaitTimeout);
        await page.click(selector);
    },

    clickAfter_expAnimImp_thenAwaitHidden: async function (page, selector, expectedStabilityCount=6, logInfo=false) {
        await page.waitForSelector(selector, {visible: true});
        await movement.waitForMovementToFinishAfterExp(page, selector, expectedStabilityCount, logInfo)
        await page.waitFor(options.maximumImplicitWaitTimeout);
        await page.click(selector);
        await page.waitForSelector(selector, {hidden: true});
    },

    clickAfter_expAnimMaxImp: async function (page, selector, clickOptions={}) {
        await page.waitForSelector(selector, {visible: true});
        await movement.waitForMovementToFinishAfterExp(page, selector)
        await page.waitFor(options.maximumImplicitWaitTimeout);
        await page.click(selector, clickOptions);
    },

    clickAfter_expAnim_thenAwaitHidden: async function (page, selector) {
        await page.waitForSelector(selector, {visible: true});
        await movement.waitForMovementToFinishAfterExp(page, selector)
        await page.click(selector);
        await page.waitForSelector(selector, {hidden: true});
    },



}