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

export default class BasePage {

    constructor(page){
        this.page = page
    }

    async baseClickButton(selector) {
        await actionsClick.clickAfter_expAnim(this.page, selector)
    }

    async baseFillInput(selector, value) {
        await actionsType.typeAfter_expAnim(this.page, selector, value)
    }

    async baseWaitForMovementToFinish(selector) {
        await movement.waitForMovementToFinishAfterExp(this.page, selector)
    }

    async baseScrollTo(selector) {
        await actionsScroll.scrollTo(this.page, selector)
    }

    async baseUploadFile(selector, filePath) {
        await this.baseWaitForMovementToFinish(selector)
        let input = await this.page.$(selector)
        await input.uploadFile(filePath)
    }

    /**
    * @field_selector click on this elem opens options list
    * @option_selector click on the desired option
    */
    async baseSelect(field_selector, option_selector) {
        await actionsSelect.selectBySelector(this.page, field_selector, option_selector)
    }

    async baseFillDropdownInput(input, value) {
    }

    async baseFillDateInput(dateSelector, date) {
    }

}

