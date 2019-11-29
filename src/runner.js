import sheetReader from './integration/api/google_sheet/google.sheet.reader.js'
import olxManager from './integration/e2e.system/olx/olx.writer.js'
import BusinessEnums from "./tasks.manager/business.enums"
import changeArray from "./integration/utils/change.array/change.array";
const EventEmitter = require('events').EventEmitter;
const eventEmitter = new EventEmitter;
const events = new BusinessEnums().emitedEvents;
let gsheetKey = '1R0pNdZ3JhVjYbfsT9z7EEkqlfwqsVgBEUfjQIf6gtV4'
let gsheetCreds = require('./integration/api/google_sheet/creds/shop-250916-e18ae184fd04.json');

let spreadsheet = new sheetReader(gsheetKey, gsheetCreds, eventEmitter);
let olx = new olxManager(eventEmitter);

async function performBusinessTasks() {
    await olx.manageOlx(spreadsheet.currentValuesList)
}

async function writeToGoogleSheet() {
    await spreadsheet.writeNewValues()
}

(async() => {
    eventEmitter.on(events.gsheetReadingFinished, performBusinessTasks)
    eventEmitter.on(events.changeArrayReadyToWrite, writeToGoogleSheet)
    await spreadsheet.readCurrentValues();
    // await spreadsheet.readFreshItemListMock();
})();
