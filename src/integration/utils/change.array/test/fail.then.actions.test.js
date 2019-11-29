import sheetReader from '../../../api/google_sheet/google.sheet.reader.js'
import BusinessEnums from "../../../../tasks.manager/business.enums"
import changeArray from "../change.array";
import GsheetData from "../../../../data/gsheet.data";
import EditGoogleSheet from "../../../../tasks.manager/olx.business.rules/edit.google.sheet";
import GoogleSheetConditions from "../../../../tasks.manager/olx.business.rules/google.sheet.conditions";
const EventEmitter = require('events').EventEmitter;
const eventEmitter = new EventEmitter;
const events = new BusinessEnums().emitedEvents;

let gsheetKey = '1xdd4OySbtCPXEudOx8eWkUbHYvgG-nI65hyuJ9pHKQQ'
let gsheetCreds = require('./integration/api/google_sheet/creds/shop-test-260410-a80eb8abee2e.json');
const gsheetConditions = new GoogleSheetConditions()
let spreadsheet = new sheetReader(gsheetKey, gsheetCreds, eventEmitter);
let test = new ActionThenFailTest(eventEmitter);
let editGoogleSheet = new EditGoogleSheet();

/*
* writeFreshItemList function represents what happens eg. during the OLX write manager run
* This should be able to handle errors in elegant way, so that in the end the ChangeArray gets written to google doc
* */
async function performBusinessTasks() {
    await test.startBusinessTasks(spreadsheet.freshItems)
}

//TODO: check if this method is necessary or maybe it can be put into async withouth the additional function
async function writeToGoogleSheet() {
    await spreadsheet.writeNewValues()
}

(async() => {
    eventEmitter.on(events.finishedReadingGsheet, performBusinessTasks)
    eventEmitter.on(events.changeArrayReadyToWrite, writeToGoogleSheet)
    await spreadsheet.readFreshItems();
})();

class ActionThenFailTest {

    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.gsheetData = new GsheetData();
    }

    async startBusinessTasks(itemList) {
        if (!itemList) {throw new Error("no items in itemList");}
        this.itemList = itemList

        for (let item of this.itemList) {
            if (gsheetConditions.addItem(item)) {await this.failThenAddItems()}
            if (gsheetConditions.renewItem(item)) {await this.failThenRenewItems(item)}
            if (gsheetConditions.updateItem(item)) {await this.failThenUpdateItems(item)}
            if (gsheetConditions.removeItem(item)) {await this.failThenRemoveItems(item)}
        }

        //TODO: compare the resulted gsheet to what is there
        //TODO: restore the initial gsheet
    }

    async failThenAddItems(item) {
        throw new Error("mock/test: error thrown after adding item")
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.addItem(item, this.gsheetData, "testEditLink")
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
    }

    async failThenRenewItems(item) {
        throw new Error("mock/test: error thrown after renewing item")
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.renewItem(item, this.gsheetData)
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
    }

    async failThenUpdateItems(item) {
        throw new Error("mock/test: error thrown after update item")
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.updateItem(item, this.gsheetData)
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
    }

    async failThenRemoveItems(item) {
        throw new Error("mock/test: error thrown after remove item")
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.removeItem(item, this.gsheetData)
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
    }

}

