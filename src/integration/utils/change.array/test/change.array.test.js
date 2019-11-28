import sheetReader from '../../../api/google_sheet/gsheet_reader.js'
import BusinessEnums from "../../../../tasks.manager/business.enums"
import changeArray from "../change.array";
import GsheetData from "../../../../data/gsheet.data";
import GsheetNewValues from "../../../../tasks.manager/olx.business.rules/gsheet.new.values";
const EventEmitter = require('events').EventEmitter;
const eventEmitter = new EventEmitter;
const events = new BusinessEnums().emitedEvents;

let gsheetKey = '1xdd4OySbtCPXEudOx8eWkUbHYvgG-nI65hyuJ9pHKQQ'
let gsheetCreds = require('./integration/api/google_sheet/creds/shop-test-260410-a80eb8abee2e.json');

let spreadsheet = new sheetReader(gsheetKey, gsheetCreds, eventEmitter);
let test = new ChangeArrayTest(eventEmitter);
let gsheetNewValues = new GsheetNewValues();

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
        this.gsheetData = new GsheetData();
    }

    async addItemsToChangeArray(itemList) {
        await this.addItemsThenFail()
        await this.failThenAddItems()
        await this.addItemsSuccess()
    }

    async addItemsThenFail(item) {
        //TODO: implement this test
        await gsheetNewValues.addItem(item, this.gsheetData, "testEditLink")
    }

    async failThenAddItems() {
        //TODO: implement this test
    }

    async addItemsSuccess() {
        //TODO: implement this test
    }

}

