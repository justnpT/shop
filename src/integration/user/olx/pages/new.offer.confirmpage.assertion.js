import ActionsClick from "../../utils/actions/actions-click"
import ActionsType from "../../utils/actions/actions-fill"
import ActionsSelect from "../../utils/actions/actions-select"
import Movement from "../../utils/monitoring/movement"
import ActionsScroll from "../../utils/actions/actions-scroll"
import BaseAssertion from "./base.assertion";
const  actionsScroll = new ActionsScroll()
const  movement = new Movement()
const  actionsSelect = new ActionsSelect()
const  actionsClick = new ActionsClick()
const  actionsType = new ActionsType()

export default class AssertionConfirmPage extends BaseAssertion {

    get inputInfoLink() { return "#add-title" }

    async getInfoLinkText() {
        await this.getText(this.inputInfoLink)
    }



}

