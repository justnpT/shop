import ActionsClick from "../../../utils/actions/actions-click"
const  actionsClick = new ActionsClick()
import ActionsType from "../../../utils/actions/actions-fill"
const  actionsType = new ActionsType()

export default class NewOffer {

    constructor(page){
        this.page = page
    }

    get category() {return "tr:nth-child(1) .col:nth-child(1) a"}


    get inputTitle() { return "#add-title" }

    get inputDescription() { return "#description textarea" }

    get buttonAcceptTerms() { return "fieldset .focusbox label" }

    get buttonNext() { return "#save" }
    
    async clickButtonNext() {
        await actionsClick.clickAfter_expAnim(this.page, this.buttonNext)
    }
    
    async clickButtonAcceptTerms() {
        await actionsClick.clickAfter_expAnim(this.page, this.buttonAcceptTerms)
    }

    async fillInputDescription(text) {
        await actionsType.typeAfter_expAnim(this.page, this.inputDescription, text)
    }

    async fillInputTitle(text) {
        await actionsType.typeAfter_expAnim(this.page, this.inputTitle, text)
    }

}

