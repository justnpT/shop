import sheetReader from './integration/api/google_sheet/gsheet_reader.js'
import olxManager from './integration/e2e.system/olx/olx.writer.js'
import BusinessEnums from "./tasks.manager/businessEnums"
import changeArray from "./integration/utils/change.array/change.array";
const EventEmitter = require('events').EventEmitter;
const eventEmitter = new EventEmitter;
const events = new BusinessEnums().emitedEvents;

let spreadsheet = new sheetReader('1R0pNdZ3JhVjYbfsT9z7EEkqlfwqsVgBEUfjQIf6gtV4', eventEmitter);
let olx = new olxManager(eventEmitter);

async function writeFreshItemList() {
    await olx.manageOlx(spreadsheet.freshItemList)
}

async function updateItemList() {
    await changeArray.saveInFile()
    await spreadsheet.updateItemList()
    await changeArray.emptyData()
}

(async() => {
    eventEmitter.on(events.itemListUpdated, writeFreshItemList)
    eventEmitter.on(events.changeArrayReady, updateItemList)
    await spreadsheet.readFreshItemList();
    // await spreadsheet.readFreshItemListMock();
})();
