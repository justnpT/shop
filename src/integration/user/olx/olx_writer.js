import Setup from '../setup/setup'
import Login from "./pages/modal.login"
import Home from "./pages/page.home"
import NewOffer from "./pages/page.new.offer"
import Category from "./pages/modal.category"
import BusinessRules from "./../../../tasks_manager/businessRules"
import ItemKeys from "./../../../tasks_manager/businessEnums"
let creds = require("../../../../credentials/credentials")
const itemKeys = new ItemKeys()
const businessRules = new BusinessRules()

export default class olxWriter {
    constructor(url) {
        this.url = url
        this.setup = new Setup(this.url)
        this.olxCreds = creds.olx;
        this.photoesPath = creds.gdrive.photoesPath;
    }

    async write(itemList) {
        if (itemList.length==0) {throw new Error("no items in itemList");}

        this.page  = await this.setup.start();
        const login = new Login(this.page)
        const home = new Home(this.page)
        await home.clickButtonLogin(this.page)
        await login.performLogin(this.olxCreds.password, this.olxCreds.email)

        for (let item of itemList) {

            if (businessRules.addItemToOlx(item)) {await this.addNewItem(item)}
            if (businessRules.renewItemOnOlx(item)) {await this.renewItem(item)}
            if (businessRules.updateItemToOlx(item)) {await this.updateItem(item)}
        }

        await this.setup.stop()

    }

    async renewItem(item) {
        await this.page.goto(item[itemKeys.olx_edit_link])

    }

    async updateItem(item) {
        // compare fields values to new ones and
    }

    async addNewItem(item) {
        let photoes = this.getPhotoes(item[itemKeys.name])
        await this.page.goto("https://www.olx.pl/nowe-ogloszenie/")
        const newOffer = new NewOffer(this.page)
        const category = new Category(this.page)
        await newOffer.fillInputTitle(item[itemKeys.title])
        await newOffer.clickButtonCategory()
        await category.clickButtonFirstCategory()
        await newOffer.fillInputPrice(item[itemKeys.price])
        await newOffer.fillInputDescription(item[itemKeys.description])
        await newOffer.selectPrivateBusinessType()
        await newOffer.clickButtonSimplePhotoUpload()
        await newOffer.uploadPhotoes(photoes, this.photoesPath, item[itemKeys.name])
        await newOffer.clickButtonAcceptTerms()
        await newOffer.clickButtonNext()
        //TODO: implement writing to gsheet fields after adding: olx_active=1, olx_expiration_date=, olx_edit_link=, update_olx=0
    }

    getPhotoes(itemName) {
        let fs = require('fs');
        let photoFiles = fs.readdirSync(this.photoesPath+"\\"+itemName);
        return photoFiles;
    }

}

// module.exports = olxWriter;