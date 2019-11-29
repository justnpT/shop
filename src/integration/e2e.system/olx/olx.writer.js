import SetupPuppeteer from '../setup/setup.puppeteer'
import config from './config'
import Login from "./pages/modal.login"
import Home from "./pages/home.page"
import NewOffer from "./pages/new.offer.page"
import GoogleSheetConditions from "../../../tasks.manager/olx.business.rules/google.sheet.conditions"
import BusinessEnums from "../../../tasks.manager/business.enums"
import ArchivePage from "./pages/archive/archive.page";
import changeArray from "../../utils/change.array/change.array"
import ActivePage from "./pages/active/active.page";
import EditGoogleSheet from "../../../tasks.manager/olx.business.rules/edit.google.sheet";
import GsheetData from "../../../data/gsheet.data";
let creds = require("../../../../credentials/credentials")
const itemKeys = new BusinessEnums().itemKeys
const gsheetConditions = new GoogleSheetConditions()
const events = new BusinessEnums().emitedEvents
const gsheetNewValues = new EditGoogleSheet()

export default class olxManager {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.olxCreds = creds.olx;
        this.gdrivePath = creds.gdrive.productsPath;
        this.gsheetData = new GsheetData();
    }

    async start() {
        if (this.page) {return false}
        else {
            this.setup = new SetupPuppeteer(config.baseUrl)
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

            if (gsheetConditions.addItem(item)) {await this.addNewItem(item)}
            if (gsheetConditions.renewItem(item)) {await this.renewItem(item)}
            if (gsheetConditions.updateItem(item)) {await this.updateItem(item)}
            if (gsheetConditions.removeItem(item)) {await this.removeItem(item)}
        }

        await this.stop()
        // TODO: make sure all desired updates are on changeArray and do: this.eventEmitter.emit(events.changeArrayReady, changeArray)

    }

    async renewItem(item) {
        await this.start();
        await this.page.goto(config.archive)
        const archivePage = new ArchivePage(this.page)
        await archivePage.clickButtonActivate(item[itemKeys.title])
        // TODO: add assertion for link reactivation message
        await gsheetNewValues.renewItem(item, this.gsheetData)
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
    }

    async updateItem(item) {
        // go to itemEditLink, check name, title, description, photoes
        // update photoes only if the field value = 1
        // TODO: for considered item, compare what is on olx page to what comes from gsheet, and add new values on olx and save
        // TODO: no need to save this to freshItemList in the end
    }

    async removeItem(item) {
        await this.start();
        await this.page.goto(config.active)
        const archivePage = new ActivePage(this.page)
        const itemRemovedModal = await archivePage.clickButtonRemove(item[itemKeys.title])
        const offerEndedModal = await itemRemovedModal.clickButtonHasBeenSold()
        await offerEndedModal.clickButtonCancel()
        // TODO: 2 weeks after sell, add removing photoes from gdrive, keep the folder and description for future use
        // TODO: 2 weeks after sell, add moving the whole sold item from admin tab to sold tab in gsheet
        await gsheetNewValues.removeItem(item, this.gsheetData)
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
    }

    async addNewItem(item) {
        await this.start();
        let photoes = this.getPhotoes(item[itemKeys.name])
        await this.page.goto(config.newOffer)
        const newOffer = new NewOffer(this.page)
        await newOffer.fillInputTitle(item[itemKeys.title])
        await newOffer.selectCategory(item)
        await newOffer.fillInputPrice(item[itemKeys.price])
        await newOffer.selectPrivateBusinessType()
        await newOffer.clickButtonSimplePhotoUpload()
        await newOffer.uploadPhotoes(photoes, this.gdrivePath, item[itemKeys.name])
        await newOffer.clickButtonAcceptTerms()
        await newOffer.selectStateUsed()
        await newOffer.fillInputDescriptionFromGdrive(this.gdrivePath, item)
        let promote = await newOffer.clickButtonNext()
        await promote.clickButtonAddWithoutPromotion()
        let editLink = 'i should get it from olx at some point of adding new item' // TODO: get editLink at some point
        await gsheetNewValues.addItem(item, this.gsheetData, editLink)
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
    }

    getPhotoes(itemName) {
        let fs = require('fs');
        let photoFiles = fs.readdirSync(this.gdrivePath+"\\"+itemName+"\\photoes\\");
        return photoFiles;
    }

}

// module.exports = olxManager;