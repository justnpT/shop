import sheetReader from './integration/api/google_sheet/gsheet_reader.js'
import olxWriter from './integration/user/olx/olx_writer.js'
import config from './integration/user/olx/config'
import EmitedEvents from "./tasks_manager/businessEnums"
const EventEmitter = require('events').EventEmitter;
const finishedUpdate = new EventEmitter;
const events = new EmitedEvents();

let spreadsheet = new sheetReader('1R0pNdZ3JhVjYbfsT9z7EEkqlfwqsVgBEUfjQIf6gtV4', finishedUpdate);
let olx = new olxWriter(config.baseUrl);

async function writeFreshItemList() {
    await olx.write(spreadsheet.freshItemList)
}

(async() => {
    finishedUpdate.on(events.itemListUpdated, writeFreshItemList)
    // await spreadsheet.updateFreshItemList();
    await spreadsheet.updateFreshItemListMock();
})();
