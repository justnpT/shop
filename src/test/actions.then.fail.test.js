import sheetReader from '../integration/api/google_sheet/google.sheet.reader.js'
import BusinessEnums from "../data/business.enums"
import GsheetData from "../data/gsheet.data";
import ChangeArrayActions from "../data/olx.business.rules/changeArrayActions";
import GoogleSheetConditions from "../data/olx.business.rules/google.sheet.conditions";
const EventEmitter = require('events').EventEmitter;
const eventEmitter = new EventEmitter;
const events = new BusinessEnums().emitedEvents;

let gsheetKey = '1xdd4OySbtCPXEudOx8eWkUbHYvgG-nI65hyuJ9pHKQQ'
let gsheetCreds = require('./integration/api/google_sheet/creds/shop-test-260410-a80eb8abee2e.json');
const gsheetConditions = new GoogleSheetConditions()
let spreadsheet = new sheetReader(gsheetKey, gsheetCreds, eventEmitter);
let test = new ActionsThenFailTest(eventEmitter);
let editGoogleSheet = new ChangeArrayActions();

class ActionsThenFailTest {

    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.gsheetData = new GsheetData();
    }

    async startBusinessTasks(itemList) {
        if (!itemList) {throw new Error("no items in itemList");}
        this.itemList = itemList

        for (let item of this.itemList) {
            if (gsheetConditions.addItem(item)) {await this.addItemsThenFail()}
            if (gsheetConditions.renewItem(item)) {await this.renewItemsThenFail(item)}
            if (gsheetConditions.updateItem(item)) {await this.updateItemsThenFail(item)}
            if (gsheetConditions.removeItem(item)) {await this.removeItemsThenFail(item)}
        }

        //TODO: compare the resulted gsheet to what is there
        //TODO: restore the initial gsheet
    }

    async addItemsThenFail(item) {
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.addItem(item, this.gsheetData, "testEditLink")
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
        throw new Error("mock/test: error thrown after adding item")
    }

    async renewItemsThenFail(item) {
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.renewItem(item, this.gsheetData)
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
        throw new Error("mock/test: error thrown after renewing item")
    }

    async updateItemsThenFail(item) {
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.updateItem(item, this.gsheetData)
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
        throw new Error("mock/test: error thrown after update item")
    }

    async removeItemsThenFail(item) {
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.removeItem(item, this.gsheetData)
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
        throw new Error("mock/test: error thrown after remove item")
    }

}

