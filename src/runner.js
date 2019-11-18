import sheetReader from './integration/api/google_sheet/gsheet_reader.js'
import olxManager from './integration/user/olx/olx.writer.js'
import BusinessEnums from "./tasks_manager/businessEnums"
const EventEmitter = require('events').EventEmitter;
const eventEmitter = new EventEmitter;
const events = new BusinessEnums().emitedEvents;

let spreadsheet = new sheetReader('1R0pNdZ3JhVjYbfsT9z7EEkqlfwqsVgBEUfjQIf6gtV4', eventEmitter);
let olx = new olxManager(eventEmitter);

async function writeFreshItemList() {
    await olx.manageOlx(spreadsheet.freshItemList)
}

async function updateItemList() {
    await spreadsheet.updateItemList()
}

(async() => {
    eventEmitter.on(events.itemListUpdated, writeFreshItemList)
    eventEmitter.on(events.changeArrayReady, updateItemList)
    await spreadsheet.readFreshItemList();
    // await spreadsheet.readFreshItemListMock();
})();
