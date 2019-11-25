import * as options from "../../pupp.conf";
import Movement from "../monitoring/movement";
let movement = new Movement()

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

    /**
     * Clicks on an element that contains a text and is part of a larger list
     * @selectorOfList selector that returns the list of the elements to search through
     * @nthElemWithText selector of elem with text. should contain $index$ in the place of nth-child($index$)
     * @text the desired text to search for on the list
     * @nthElemToClick provide if click happens on other nth-elem, at the same level but not the one with text
     */
    async clickByOptionText(page, selectorOfList, nthElemWithText, text, nthElemToClick = null) {
        await page.waitForSelector(selectorOfList, {visible: true})
        let elements = await page.$$(selectorOfList);
        for(let i=1; i <= elements.length; i++){
            let sel = nthElemWithText.replace("$index$", i)
            let elemText = await page.evaluate((sel) => document.querySelector(sel).textContent, sel);
            if(elemText.includes(text)) {
                if (nthElemToClick) {sel = nthElemToClick.replace("$index$", i)}
                console.log('AUTOTESTS: click on option with text: %s by selector: %s', elemText, sel)
                await this.clickAfter_expAnimMaxImp(page, sel, {delay: 100});
                return sel;
            }
        }
        throw Error('option '+ text + ' not found among selectors: '+selectorOfList)
    }

    async selectByTextFromDropdown(page, dropdownSelector, selectors, selector, optionText) {
        await this.clickAfter_expAnim(page, dropdownSelector);
        let sel = await this.clickByOptionText(page, selectors, selector, optionText);
        await page.waitForSelector(sel, {hidden: true});
    }

}