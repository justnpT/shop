import Setup from '../setup/setup'
import config from './config'
import Login from "./pages/modal.login"
import Home from "./pages/home.page"
import NewOffer from "./pages/new.offer.page"
import Category from "./pages/modal.category"
import OlxBusinessRules from "../../../tasks_manager/olxBusinessRules"
import BusinessEnums from "./../../../tasks_manager/businessEnums"
import AssertionConfirmPage from "./pages/new.offer.confirmpage.assertion";
import ArchivePage from "./pages/archive/archive.page";
let creds = require("../../../../credentials/credentials")
const itemKeys = new BusinessEnums().itemKeys
const olxBusinessRules = new OlxBusinessRules()
const events = new BusinessEnums().emitedEvents
import changeArray from "./change.array"

export default class olxManager {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.olxCreds = creds.olx;
        this.gdrivePath = creds.gdrive.productsPath;
        this.today = new Date();
        this.itemExpirationDate = new Date(this.today)
        this.itemExpirationDate.setDate(this.itemExpirationDate.getDate() + 30)
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

            if (olxBusinessRules.addItem(item)) {await this.addNewItem(item)}
            if (olxBusinessRules.renewItem(item)) {await this.renewItem(item)}
            if (olxBusinessRules.updateItem(item)) {await this.updateItem(item)}
        }

        await this.stop()
        this.eventEmitter.emit(events.changeArrayReady, changeArray)
        // TODO: connect to gsheet writer and write all {changed: newValue} fields from current this.itemList
        // TODO: so make sure all desired updates are on changeArray and do: this.eventEmitter.emit(events.changeArrayReady, changeArray)

    }

    async renewItem(item) {
        await this.start();
        await this.page.goto(config.archive)
        const archivePage = new ArchivePage(this.page)
        await archivePage.clickButtonActivate(item[itemKeys.title])
        // TODO: add assertion for link reactivation
        changeArray.push({name: item[itemKeys.name], field: itemKeys.olx_active, new_value: 1})
        changeArray.push({name: item[itemKeys.name], field: itemKeys.olx_expiration_date, new_value: this.itemExpirationDate})
    }

    async updateItem(item) {
        // await this.start();
        // await this.page.goto(item[itemKeys.olx_edit_link])
        // const newOffer = new NewOffer(this.page)
        // await newOffer.clickButtonAcceptTerms()
        // await newOffer.clickButtonNext()
        // const confirmPage = new AssertionConfirmPage(this.page)
        // go to itemEditLink, check name, title, description, photoes
        // update photoes only if the field value = 1
        // TODO: for considered item, compare what is on olx page to what comes from gsheet, and add new values on olx and save
        // TODO: no need to save this to freshItemList in the end
    }

    async addNewItem(item) {
        await this.start();
        let photoes = this.getPhotoes(item[itemKeys.name])
        await this.page.goto(config.newOffer)
        const newOffer = new NewOffer(this.page)
        const category = new Category(this.page)
        await newOffer.clickButtonCategory()
        await newOffer.fillInputTitle(item[itemKeys.title])
        // await newOffer.clickButtonCategory()
        // await category.clickButtonFirstCategory()
        await newOffer.fillInputPrice(item[itemKeys.price])
        await newOffer.fillInputDescription(this.gdrivePath, item[itemKeys.description])
        await newOffer.selectPrivateBusinessType()
        await newOffer.clickButtonSimplePhotoUpload()
        await newOffer.uploadPhotoes(photoes, this.gdrivePath, item[itemKeys.name])
        await newOffer.clickButtonAcceptTerms()
        let promote = await newOffer.clickButtonNext()
        await promote.clickButtonAddWithoutPromotion()
        let editLink = 'i should get it from olx'
        changeArray.push({name: item[itemKeys.name], field: itemKeys.olx_active, new_value: 1})
        changeArray.push({name: item[itemKeys.name], field: itemKeys.olx_update, new_value: "0"})
        changeArray.push({name: item[itemKeys.name], field: itemKeys.olx_expiration_date, new_value: this.itemExpirationDate})
        changeArray.push({name: item[itemKeys.name], field: itemKeys.olx_edit_link, new_value: editLink})
    }

    getPhotoes(itemName) {
        let fs = require('fs');
        let photoFiles = fs.readdirSync(this.gdrivePath+"\\"+itemName);
        return photoFiles;
    }

}

// module.exports = olxManager;