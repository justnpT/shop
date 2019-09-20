import * as options from "../../pupp.conf";
let movement = require('../monitoring/movement');

export default class ActionsClick {

    async typeAfter_exp(page, selector, text) {
        await page.waitForSelector(selector, {visible: true});
        await this.typeWithStringConversion(page, selector, text)
    }

    async typeAfter_expImp(page, selector, text) {
        await page.waitForSelector(selector, {visible: true});
        await page.waitFor(options.maximumImplicitWaitTimeout);
        await this.typeWithStringConversion(page, selector, text)
    }

    async typeAfter_expAnim(page, selector, text) {
        await page.waitForSelector(selector, {visible: true});
        await movement.waitForMovementToFinishAfterExp(page, selector);
        await this.typeWithStringConversion(page, selector, text)
    }

    async typeAfter_expAnimImp(page, selector, text) {
        await page.waitForSelector(selector, {visible: true});
        await movement.waitForMovementToFinishAfterExp(page, selector);
        await page.waitFor(options.maximumImplicitWaitTimeout);
        await this.typeWithStringConversion(page, selector, text)
    }

    async typeWithStringConversion(page, selector, text) {
        await page.type(selector, String(text))
    }

}