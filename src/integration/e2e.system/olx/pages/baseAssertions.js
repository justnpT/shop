import ActionsGet from "../../utils/actions/actions.get";
const  actionsGet = new ActionsGet()

export default class BaseAssertions {

    constructor(page){
        this.page = page
    }

    async getText(selector) {
        await this.page.waitForSelector(selector, {visible: true});
        let text = await this.page.evaluate((sel) => document.querySelector(sel).textContent, selector);
        return text
    }

    async baseGetListOfTexts(selectorOfList, nthSelectorInTheList, noSpacesText = false, everyNthElem = 1) {
        return await actionsGet.getListOfCurrentOptions(this.page, selectorOfList, nthSelectorInTheList, noSpacesText, everyNthElem)
    }

}

