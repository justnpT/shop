import ActionsClick from "../../utils/actions/actions-click"
import ActionsType from "../../utils/actions/actions-fill"
import ActionsSelect from "../../utils/actions/actions-select"
import Movement from "../../utils/monitoring/movement"
const  movement = new Movement()
const  actionsSelect = new ActionsSelect()
const  actionsClick = new ActionsClick()
const  actionsType = new ActionsType()

export default class NewOffer {

    constructor(page){
        this.page = page
    }

    get inputTitle() { return "#add-title" }
    get inputDescription() { return "#add-description" }
    get buttonAcceptTerms() { return ".agreement-label [for=newsletter-accept]" }
    get buttonNext() { return "#save" }
    get buttonCategory() { return "dl.dropdown" }
    get inputPrice() { return "input.price" }
    get dropdownBusinessType() { return "#targetid_private_business" }
    get businessTypePrivate() { return "#targetid_private_business li:nth-child(2) a" }
    get buttonSimplePhotoUpload() { return "#show-gallery-html" }
    get photoInput() { return "#simple_form_inputs div:nth-child($INDEX$) input.file" }

    async clickButtonSimplePhotoUpload() {
        await actionsClick.clickAfter_expAnim(this.page, this.buttonSimplePhotoUpload)
    }

    async uploadPhotoes(photoesArray, gdriveFolder, itemName) {
        for (let i = 1; i <= photoesArray.length; i++) {
            await this.uploadPhoto(i, gdriveFolder+"\\"+itemName+"\\"+photoesArray[i-1])
        }
    }

    async uploadPhoto(photoNumber, photoPath) {
        let sel = this.photoInput.replace("$INDEX$", photoNumber)
        await movement.waitForMovementToFinishAfterExp(this.page, sel)
        let input = await this.page.$(sel)
        await input.uploadFile(photoPath)
    }

    async selectPrivateBusinessType() {
        //TODO: scroll to this.dropdownBusinessType before click
        await actionsSelect.selectBySelector(this.page, this.dropdownBusinessType, this.businessTypePrivate)
    }

    async selectRelevantOptions() {
    //TODO: do a switch that iterates over all select elements sel="fieldset select", then based on ID of that elem performs action. param13 or id_private_business <- different actions
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

