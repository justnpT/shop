import ActionsClick from "../../utils/actions/actions-click"
import ActionsType from "../../utils/actions/actions-fill"
import ActionsSelect from "../../utils/actions/actions-select"
import Movement from "../../utils/monitoring/movement"
import ActionsScroll from "../../utils/actions/actions-scroll"
const  actionsScroll = new ActionsScroll()
const  movement = new Movement()
const  actionsSelect = new ActionsSelect()
const  actionsClick = new ActionsClick()
const  actionsType = new ActionsType()

export default class BaseAssertion {

    constructor(page){
        this.page = page
    }

    async getText(selector) {
        await this.page.waitForSelector(selector, {visible: true});
        let text = await this.page.evaluate((sel) => document.querySelector(sel).textContent, selector);
        return text
    }
}

