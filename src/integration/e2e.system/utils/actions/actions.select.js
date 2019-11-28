import ActionsClick from "./actions.click";
let actionsClick = new ActionsClick()

export default class ActionsSelect {

    /**
     * @field_selector click on this elem opens options list
     * @option_selector click on the desired option
     */
    async selectBySelector(page, field_selector, option_selector) {
        await actionsClick.clickAfter_expAnim(page, field_selector)
        await actionsClick.clickAfter_expAnim_thenAwaitHidden(page, option_selector)
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