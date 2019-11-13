import Setup from '../setup/setup'
import config from './config'
import Login from "./pages/modal.login"
import Home from "./pages/home.page"
import NewOffer from "./pages/new.offer.page"
import Category from "./pages/modal.category"
import BusinessRules from "./../../../tasks_manager/businessRules"
import BusinessEnums from "./../../../tasks_manager/businessEnums"
import AssertionConfirmPage from "./pages/new.offer.confirmpage.assertion";
let creds = require("../../../../credentials/credentials")
const itemKeys = new BusinessEnums().itemKeys
const businessRules = new BusinessRules()
const events = new BusinessEnums().emitedEvents

export default class olxManager {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.changeArray = []
        this.olxCreds = creds.olx;
        this.photoesPath = creds.gdrive.photoesPath;
    }

    async start() {
        if (this.page) {return false}
        else {
            this.setup = new Setup(config.baseUrl)
            this.page  = await this.setup.start();
            const login = new Login(this.page)
            const home = new Home(this.page)
            await home.clickButtonLogin(this.page)
            await login.performLogin(this.olxCreds.password, this.olxCreds.email)
        }
    }

    async stop() {
        if (this.page) {await this.setup.stop()}
    }

    async manageOlx(itemList) {
        if (!itemList) {throw new Error("no items in itemList");}
        this.itemList = itemList

        for (let item of this.itemList) {

            if (businessRules.addItemToOlx(item)) {await this.addNewItem(item)}
            if (businessRules.renewItemOnOlx(item)) {await this.renewItem(item)}
            if (businessRules.updateItemToOlx(item)) {await this.updateItem(item)}
        }

        await this.stop()
        // TODO: connect to gsheet writer and write all {changed: newValue} fields from current this.itemList

    }

    async renewItem(item) {
        await this.start();
        await this.page.goto(config.archive)
        //TODO: wyszukac item na liscie zakonczonych ogloszen i aktywowac
        let link = "https://www.olx.pl/oferta/niezwykla-wiertarka-wahadlowa-CID628-IDBMP9S.html"
        this.changeArray.push({name: item[itemKeys.name], field: itemKeys.olx_info_link, new_value: link})
        this.eventEmitter.emit(events.changeArrayReady, this.changeArray)
    }

    async updateItem(item) {
        // await this.start();
        // await this.page.goto(item[itemKeys.olx_edit_link])
        // const newOffer = new NewOffer(this.page)
        // await newOffer.clickButtonAcceptTerms()
        // await newOffer.clickButtonNext()
        // const confirmPage = new AssertionConfirmPage(this.page)
        // go to itemEditLink, check name, title, description, photoes
        // TODO: for considered item, compare what is on olx page to what comes from gsheet, and add new values on olx and save
        // TODO: no need to save this to freshItemList in the end
    }

    async addNewItem(item) {
        await this.start();
        let photoes = this.getPhotoes(item[itemKeys.name])
        await this.page.goto(config.newOffer)
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
        //TODO: for considered item, implement updating this.itemList with fields: olx_active=1, olx_expiration_date=, olx_edit_link=, update_olx=0
    }

    getPhotoes(itemName) {
        let fs = require('fs');
        let photoFiles = fs.readdirSync(this.photoesPath+"\\"+itemName);
        return photoFiles;
    }

}

// module.exports = olxManager;