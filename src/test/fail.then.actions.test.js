import sheetReader from '../integration/api/google_sheet/google.sheet.reader.js'
import BusinessEnums from "../data/business.enums"
import GsbheetData from "../data/gsheet.data";
import EditGoogleSheet from "../data/olx.business.rules/edit.google.sheet";
import GoogleSheetConditions from "../data/olx.business.rules/google.sheet.conditions";
import FileManager from "../utils/files.manager/file.manager";
import changeArray from "../utils/change.array/change.array";
const EventEmitter = require('events').EventEmitter;
const eventEmitter = new EventEmitter;
const events = new BusinessEnums().emitedEvents;

let gsheetKey = '1xdd4OySbtCPXEudOx8eWkUbHYvgG-nI65hyuJ9pHKQQ'
let gsheetCreds = require('./integration/api/google_sheet/creds/shop-test-260410-a80eb8abee2e.json');
const gsheetConditions = new GoogleSheetConditions()
let spreadsheet = new sheetReader(gsheetKey, gsheetCreds, eventEmitter);
let test = new ActionThenFailTest(eventEmitter);
let editGoogleSheet = new EditGoogleSheet();
let fileManger = new FileManager()
let pathToMock = "./tempItemList.txt"

async function compareGsheet() {
    eventEmitter.removeEventListener(events.finishedReadingGsheet, compareGsheet)
    changeArray.writeDataFromMock(pathToMock)
    let mock = JSON.stringify(changeArray.get())
    let result = JSON.stringify(spreadsheet.freshItems)
    console.log((mock == result) ? true : false)
}

async function performBusinessTasks() {
    eventEmitter.removeEventListener(events.finishedReadingGsheet, performBusinessTasks)
    await fileManger.createFileAsync(pathToMock, this.itemList)
    await test.startBusinessTasks(spreadsheet.freshItems)
    eventEmitter.on(events.finishedReadingGsheet, compareGsheet)
    await spreadsheet.readFreshItems();
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
    }

    async failThenAddItems(item) {
        throw new Error("mock/test: error thrown before adding item")
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.addItem(item, this.gsheetData, "testEditLink")
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
    }

    async failThenRenewItems(item) {
        throw new Error("mock/test: error thrown before renewing item")
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.renewItem(item, this.gsheetData)
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
    }

    async failThenUpdateItems(item) {
        throw new Error("mock/test: error thrown before update item")
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.updateItem(item, this.gsheetData)
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
    }

    async failThenRemoveItems(item) {
        throw new Error("mock/test: error thrown before remove item")
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.removeItem(item, this.gsheetData)
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
    }

}

