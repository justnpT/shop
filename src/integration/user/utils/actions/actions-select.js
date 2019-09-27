import ActionsClick from "./actions-click";
let actionsClick = new ActionsClick()

export default class ActionsSelect {

    async selectByOptionText(page, selectors, selector, optionText) {
        let elements = await page.$$(selectors);
        for(let i=1; i <= elements.length; i++){
            let sel = selector.replace("$index", i)
            let text = await page.evaluate((sel) => document.querySelector(sel).textContent, sel);
            if(text.includes(optionText)) {
                console.log('AUTOTESTS: select dropdown option with selector: %s', sel)
                await actionsClick.clickAfter_expAnimMaxImp(page, sel, {delay: 100});
                return sel;
            }
        }
        throw Error('option '+ optionText + ' not found among selectors: '+selectors)
    }

    async selectByTextFromDropdown(page, dropdownSelector, selectors, selector, optionText) {
        await actionsClick.clickAfter_expAnim(page, dropdownSelector);
        let sel = await this.selectByOptionText(page, selectors, selector, optionText);
        await page.waitForSelector(sel, {hidden: true});
    }

    async selectBySelector(page, field_selector, option_selector) {
        await actionsClick.clickAfter_expAnim(page, field_selector)
        await actionsClick.clickAfter_expAnim_thenAwaitHidden(page, option_selector)
    }

    async getListOfCurrentOptions(page, selector_of_many, selector_of_one) {
        let elements = await page.$$(selector_of_many)
        let list = []
        for(let i=1; i< elements.length; i++){
            let sel = selector_of_one.replace("$var", i)
            await page.waitForSelector(sel);
            let text = await page.evaluate((sel) => document.querySelector(sel).textContent, sel);
            let noSpacesText = text.replace(/ /g,'');
            list.push(noSpacesText)
        }
        return list
    }

    async selectPhonePrefixOnMobile(page, select_selector, phonePrefix) {
        let elements = await page.$$(select_selector+ ' option');
        let option_selector = select_selector + ' option:nth-child($var)';
        for(let i=1; i< elements.length; i++){
            let sel = option_selector.replace("$var", i)
            let text = await page.evaluate((sel) => document.querySelector(sel).textContent, sel);
            // text ends with phonePrefix, this excludes choosing phonePrefix '+1234' when demanding '+1'
            if(text.substr(text.length-phonePrefix.length-1, text.length) == ' '+phonePrefix) {
                let selectElem = await page.$(select_selector);
                await selectElem.type(text);
                return
            }
        }
        throw Error('option '+ phonePrefix + ' not found among selectors: '+select_selector)
    }

}