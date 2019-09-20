import * as options from "../../pupp.conf";
let movement = require('../monitoring/movement');

export default class ActionsClick {

    async clickAfter_explicit(page, selector) {
        await page.waitForSelector(selector, {visible: true});
        await page.click(selector);
    }

    async clickAfter_explicit_thenAwaitHidden(page, selector) {
        await page.waitForSelector(selector, {visible: true});
        await page.click(selector);
        await page.waitForSelector(selector, {hidden: true});
    }

    async clickAfter_expAnim(page, selector, stableFor50msMultipliedBy=6, logInfo=false) {
        await page.waitForSelector(selector, {visible: true});
        await movement.waitForMovementToFinishAfterExp(page, selector, stableFor50msMultipliedBy, logInfo)
        await page.click(selector);
    }

    async clickAfter_expAnimImp(page, selector) {
        await page.waitForSelector(selector, {visible: true});
        await movement.waitForMovementToFinishAfterExp(page, selector)
        await page.waitFor(options.middleImplicitWaitTimeout);
        await page.click(selector);
    }

    async clickAfter_expAnimImp_thenAwaitHidden(page, selector, expectedStabilityCount=6, logInfo=false) {
        await page.waitForSelector(selector, {visible: true});
        await movement.waitForMovementToFinishAfterExp(page, selector, expectedStabilityCount, logInfo)
        await page.waitFor(options.maximumImplicitWaitTimeout);
        await page.click(selector);
        await page.waitForSelector(selector, {hidden: true});
    }

    async clickAfter_expAnimMaxImp(page, selector, clickOptions={}) {
        await page.waitForSelector(selector, {visible: true});
        await movement.waitForMovementToFinishAfterExp(page, selector)
        await page.waitFor(options.maximumImplicitWaitTimeout);
        await page.click(selector, clickOptions);
    }

    async clickAfter_expAnim_thenAwaitHidden(page, selector) {
        await page.waitForSelector(selector, {visible: true});
        await movement.waitForMovementToFinishAfterExp(page, selector)
        await page.click(selector);
        await page.waitForSelector(selector, {hidden: true});
    }

}