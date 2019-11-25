let animation = require('../monitoring/animation/animation');

module.exports = {

    hoverAfter_explicit: async function (page, selector) {
        await page.waitForSelector(selector, {visible: true});
        await page.hover(selector);
    },

    hoverAfter_expAnim: async function (page, selector) {
        await page.waitForSelector(selector, {visible: true});
        await animation.waitForMovementToFinishAfterExp(page, selector)
        await page.hover(selector);
    },
}