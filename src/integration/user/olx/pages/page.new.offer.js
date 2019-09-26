import ActionsClick from "../../utils/actions/actions-click"
import ActionsType from "../../utils/actions/actions-fill"
import ActionsSelect from "../../utils/actions/actions-select"
const  actionsSelect = new ActionsSelect()
const  actionsClick = new ActionsClick()
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
    
    get buttonCategory() { return "dl.dropdown" }
    
    get inputPrice() { return "input.price" }

    get dropdownBusinessType() { return "input.price" }
    get businessTypePrivate() { return "#targetid_private_business li:nth-child(2) a" }
    get businessTypeCompany() { return "#targetid_private_business li:nth-child(3) a" }

    async selectPrivateBusinessType() {
        await actionsSelect.selectBySelector(this.page, this.dropdownBusinessType, this.businessTypePrivate)
    }

    async fillInputPrice(price) {
        await actionsType.typeAfter_expAnim(this.page, this.inputPrice, price)
    }
    
    async clickButtonCategory() {
        await actionsClick.clickAfter_expAnim(this.page, this.buttonCategory)
    }
    
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

