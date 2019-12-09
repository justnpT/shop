import sheetReader from '../integration/api/google_sheet/google.sheet.reader'
import BusinessEnums from "../data/business.enums"
import FileManager from "../utils/files.manager/file.manager";
import changeArray from "../utils/change.array/change.array";
import FailTestThenAction from "./fail.then.actions.test";
const EventEmitter = require('events').EventEmitter;
const eventEmitter = new EventEmitter;
const events = new BusinessEnums().emitedEvents;

let gsheetKey = '1xdd4OySbtCPXEudOx8eWkUbHYvgG-nI65hyuJ9pHKQQ'
let gsheetCreds = require('../integration/api/google_sheet/creds/shop-test-260410-a80eb8abee2e.json');
let spreadsheet = new sheetReader(gsheetKey, gsheetCreds, eventEmitter);
let test = new FailTestThenAction(eventEmitter);
let fileManger = new FileManager()
let pathToMock = "./src/test/tempItemList.txt"

async function compareGsheet() {
    eventEmitter.removeListener(events.finishedReadingGsheet, compareGsheet)
    changeArray.writeDataFromMock(pathToMock)
    let mock = JSON.stringify(changeArray.get())
    let result = JSON.stringify(spreadsheet.freshItems)
    console.log((mock == result) ? true : false)
}

async function performBusinessTasks() {
    eventEmitter.removeListener(events.finishedReadingGsheet, performBusinessTasks)
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