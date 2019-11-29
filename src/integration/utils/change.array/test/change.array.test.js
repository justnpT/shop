import sheetReader from '../../../api/google_sheet/google.sheet.reader.js'
import BusinessEnums from "../../../../tasks.manager/business.enums"
import changeArray from "../change.array";
import GsheetData from "../../../../data/gsheet.data";
import EditGoogleSheet from "../../../../tasks.manager/olx.business.rules/edit.google.sheet";
const EventEmitter = require('events').EventEmitter;
const eventEmitter = new EventEmitter;
const events = new BusinessEnums().emitedEvents;

let gsheetKey = '1xdd4OySbtCPXEudOx8eWkUbHYvgG-nI65hyuJ9pHKQQ'
let gsheetCreds = require('./integration/api/google_sheet/creds/shop-test-260410-a80eb8abee2e.json');

let spreadsheet = new sheetReader(gsheetKey, gsheetCreds, eventEmitter);
let test = new ChangeArrayTest(eventEmitter);
let editGoogleSheet = new EditGoogleSheet();

/*
* writeFreshItemList function represents what happens eg. during the OLX write manager run
* This should be able to handle errors in elegant way, so that in the end the ChangeArray gets written to google doc
* */
async function performBusinessTasks() {
    await test.addItemsToChangeArray(spreadsheet.currentValuesList)
}

//TODO: check if this method is necessary or maybe it can be put into async withouth the additional function
async function writeToGoogleSheet() {
    await spreadsheet.writeNewValues()
}

(async() => {
    eventEmitter.on(events.gsheetReadingFinished, performBusinessTasks)
    eventEmitter.on(events.changeArrayReadyToWrite, writeToGoogleSheet)
    await spreadsheet.readCurrentValues();
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
        await editGoogleSheet.addItem(item, this.gsheetData, "testEditLink")
    }

    async failThenAddItems() {
        //TODO: implement this test
    }

    async addItemsSuccess() {
        //TODO: implement this test
    }

}

