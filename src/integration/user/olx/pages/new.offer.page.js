import BasePage from "./base.page";
import Category from "./modal.category";
import Promote from "./promote/promote.page";
import BusinessEnums from "../../../../tasks_manager/businessEnums";
import changeArray from "../change.array";
const itemKeys = new BusinessEnums().itemKeys

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
            await this.uploadPhoto(i, gdriveFolder+"\\"+itemName+"\\photoes\\"+photoesArray[i-1])
        }
    }

    async fillInputDescription(text) {
        await this.baseFillInput(this.inputDescription, text)
    }

    async fillInputDescriptionFromGdrive(gdriveFolder, item) {
        if (item[itemKeys.description] != 1) {
            console.error(('Item has no description update decision: '+item[itemKeys.name]))
            return false
        } else {
        let fs = require('fs');
        let description = fs.readFileSync(gdriveFolder+"\\"+item[itemKeys.name]+"\\info.txt", "utf8");
        //TODO iconv-lite or iconv to support polish letters: https://stackoverflow.com/questions/14551608/list-of-encodings-that-node-js-supports
        //
        await this.fillInputDescription(description)
        changeArray.add({name: item[itemKeys.name], field: itemKeys.description, new_value: "updated"})
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

    async selectCategory(item) {
        let categoryPage = await this.clickButtonCategory()
        if(item[itemKeys.category]=="autochoose") {
            await categoryPage.clickButtonFirstCategory()
            let categories = categoryPage.getChoosenCategories()
            let newValue = {}
            for (let i = 0; i < categories.length; i++) {newValue['cat'+i+1] = categories[0]}
            changeArray.add({name: item[itemKeys.name], field: itemKeys.category, new_value: JSON.stringify(newValue)})
        }
        else {
            let categories = JSON.parse(item[itemKeys.category])
            for (let key in categories) {
                switch (key) {
                    case "cat1": {await categoryPage.clickButtonFirstLevelCategory(categories[key]); break}
                    case "cat2": {await categoryPage.clickButtonSecondLevelCategory(categories[key]); break}
                    case "cat3": {await categoryPage.clickButtonThirdLevelCategory(categories[key]); break}
                    default: console.error("key not found: "+key)
                }
            }
        }
    }
    
    async clickButtonNext() {
        await this.baseClickButton(this.buttonNext)
        return new Promote(this.page)
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