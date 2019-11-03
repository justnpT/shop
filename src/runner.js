import sheetReader from './integration/api/google_sheet/gsheet_reader.js'
import olxManager from './integration/user/olx/olx_writer.js'
import BusinessEnums from "./tasks_manager/businessEnums"
const EventEmitter = require('events').EventEmitter;
const finishedUpdate = new EventEmitter;
const events = new BusinessEnums().emitedEvents;

let spreadsheet = new sheetReader('1R0pNdZ3JhVjYbfsT9z7EEkqlfwqsVgBEUfjQIf6gtV4', finishedUpdate);

async function writeFreshItemList() {
    let olx = new olxManager(spreadsheet.freshItemList);
    await olx.manageOlx()
}

(async() => {
    finishedUpdate.on(events.itemListUpdated, writeFreshItemList)
    // await spreadsheet.updateFreshItemList();
    await spreadsheet.updateFreshItemListMock();
})();
