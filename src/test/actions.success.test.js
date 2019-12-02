import sheetReader from '../integration/api/google_sheet/google.sheet.reader.js'
import BusinessEnums from "../data/business.enums"
import GsheetData from "../data/gsheet.data";
import EditGoogleSheet from "../data/olx.business.rules/edit.google.sheet";
import GoogleSheetConditions from "../data/olx.business.rules/google.sheet.conditions";
const EventEmitter = require('events').EventEmitter;
const eventEmitter = new EventEmitter;
const events = new BusinessEnums().emitedEvents;

let gsheetKey = '1xdd4OySbtCPXEudOx8eWkUbHYvgG-nI65hyuJ9pHKQQ'
let gsheetCreds = require('./integration/api/google_sheet/creds/shop-test-260410-a80eb8abee2e.json');
const gsheetConditions = new GoogleSheetConditions()
let spreadsheet = new sheetReader(gsheetKey, gsheetCreds, eventEmitter);
let test = new ActionsSuccessTest(eventEmitter);
let editGoogleSheet = new EditGoogleSheet();

class ActionsSuccessTest {

    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.gsheetData = new GsheetData();
    }

    async startBusinessTasks(itemList) {
        if (!itemList) {throw new Error("no items in itemList");}
        this.itemList = itemList

        for (let item of this.itemList) {
            if (gsheetConditions.addItem(item)) {await this.addItemsSuccess(item)}
            if (gsheetConditions.renewItem(item)) {await this.renewItemsSuccess(item)}
            if (gsheetConditions.updateItem(item)) {await this.updateItemsSuccess(item)}
            if (gsheetConditions.removeItem(item)) {await this.removeItemsSuccess(item)}
        }

        //TODO: compare the resulted gsheet to what is there
        //TODO: restore the initial gsheet
    }

    async addItemsSuccess(item) {
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.addItem(item, this.gsheetData, "testEditLink")
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
    }

    async renewItemsSuccess(item) {
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.renewItem(item, this.gsheetData)
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
    }

    async updateItemsSuccess(item) {
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.updateItem(item, this.gsheetData)
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
    }

    async removeItemsSuccess(item) {
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.removeItem(item, this.gsheetData)
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
    }

}

