import sheetReader from '../../../api/google_sheet/gsheet_reader.js'
import BusinessEnums from "../../../../tasks.manager/business.enums"
import changeArray from "../change.array";
const EventEmitter = require('events').EventEmitter;
const eventEmitter = new EventEmitter;
const events = new BusinessEnums().emitedEvents;

let gsheetKey = '1xdd4OySbtCPXEudOx8eWkUbHYvgG-nI65hyuJ9pHKQQ'
let gsheetCreds = require('./integration/api/google_sheet/creds/shop-test-260410-a80eb8abee2e.json');

let spreadsheet = new sheetReader(gsheetKey, gsheetCreds, eventEmitter);
let test = new ChangeArrayTest(eventEmitter);

async function writeFreshItemList() {
    await test.addItemsToChangeArray(spreadsheet.freshItemList)
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

class ChangeArrayTest {

    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.today = new Date();
    }

    async addItemsToChangeArray() {
        await this.addItemsThenFail()
        await this.failThenAddItems()
        await this.addItemsSuccess()
    }

    async addItemsThenFail() {

    }

    async failThenAddItems() {

    }

    async addItemsSuccess() {

    }

}

