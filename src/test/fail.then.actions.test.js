import BusinessEnums from "../data/business.enums"
import EditGoogleSheet from "../data/olx.business.rules/edit.google.sheet";
import GoogleSheetConditions from "../data/olx.business.rules/google.sheet.conditions";
import GsheetData from "../data/gsheet.data";
const events = new BusinessEnums().emitedEvents;

const gsheetConditions = new GoogleSheetConditions()
let editGoogleSheet = new EditGoogleSheet();

export default class FailTestThenAction {

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

