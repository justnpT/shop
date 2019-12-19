import BusinessEnums from "../data/business.enums"
import ChangeArrayActions from "../data/olx.business.rules/changeArrayActions";
import GoogleSheetConditions from "../data/olx.business.rules/google.sheet.conditions";
import GsheetData from "../data/gsheet.data";
import {handleError} from "./decorators";
const events = new BusinessEnums().emitedEvents;

const gsheetConditions = new GoogleSheetConditions()
let editGoogleSheet = new ChangeArrayActions();

export default class FailThenActionTest {

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

    @handleError()
    async failThenAddItems(item) {
        //TODO: apply decorator to the methods so that the error handling is ensured by the decorator:
        // https://www.sitepoint.com/javascript-decorators-what-they-are/
        throw new Error("mock/test: error thrown before adding item")
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.addItem(item, this.gsheetData, "testEditLink")
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
    }

    @handleError()
    async failThenRenewItems(item) {
        throw new Error("mock/test: error thrown before renewing item")
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.renewItem(item, this.gsheetData)
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
    }

    @handleError()
    async failThenUpdateItems(item) {
        throw new Error("mock/test: error thrown before update item")
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.updateItem(item, this.gsheetData)
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
    }

    @handleError()
    async failThenRemoveItems(item) {
        throw new Error("mock/test: error thrown before remove item")
        console.log("mock/test: appropriate actions are being done by the shop system, then write to gsheet")
        await editGoogleSheet.removeItem(item, this.gsheetData)
        this.eventEmitter.emit(events.changeArrayReadyToWrite)
    }

}

