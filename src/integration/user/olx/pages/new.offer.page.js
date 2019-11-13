import BasePage from "./base.page";
import Category from "./modal.category";
import Promote from "./promote/promote.page";

export default class NewOffer extends BasePage {

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
        await this.baseScrollTo(this.buttonSimplePhotoUpload)
        await this.baseClickButton(this.buttonSimplePhotoUpload)
    }

    async uploadPhotoes(photoesArray, gdriveFolder, itemName) {
        for (let i = 1; i <= photoesArray.length; i++) {
            await this.uploadPhoto(i, gdriveFolder+"\\"+itemName+"\\"+photoesArray[i-1])
        }
    }

    async uploadPhoto(photoNumber, photoPath) {
        await this.baseUploadFile(this.photoInput.replace("$INDEX$", photoNumber), photoPath)
    }

    async selectPrivateBusinessType() {
        await this.baseScrollTo(this.dropdownBusinessType)
        await this.baseSelect(this.dropdownBusinessType, this.businessTypePrivate)
    }

    async selectRelevantOptions() {
    //TODO: do a switch that iterates over all select elements sel="fieldset select", then based on ID of that elem performs action. param13 or id_private_business <- different actions
    }

    async fillInputPrice(price) {
        await this.baseFillInput(this.inputPrice, price)
    }
    
    async clickButtonCategory() {
        await this.baseClickButton(this.buttonCategory)
        return new Category(this.page)
    }

    async selectCategory(category) {
        let categoryPage = await this.clickButtonCategory()
        if(category=="autochoose") {await categoryPage.clickButtonFirstCategory()}
        else {

        }
    }
    
    async clickButtonNext() {
        await this.baseClickButton(this.buttonNext)
        return new Promote()
    }
    
    async clickButtonAcceptTerms() {
        await this.baseClickButton(this.buttonAcceptTerms)
    }

    async fillInputDescription(text) {
        await this.baseFillInput(this.inputDescription, text)
    }

    async fillInputTitle(text) {
        await this.baseFillInput(this.inputTitle, text)
    }

}