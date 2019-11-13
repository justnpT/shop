var GoogleSpreadsheet = require('google-spreadsheet')
var async = require('async');
import BusinessEnums from "./../../../tasks_manager/businessEnums"
const events = new BusinessEnums().emitedEvents

export default class sheetReader {
    constructor(spreadsheet_key, eventEmitter) {
        this.doc = new GoogleSpreadsheet(spreadsheet_key);
        this.creds = require('./creds/shop-250916-e18ae184fd04.json');
        this.first_col = 1; // A
        this.last_col = 20; // S
        this.captionRow = 4;
        this.freshItemList = [];
        this.eventEmitter = eventEmitter;
    }

    async readFreshItemListMock() {
        this.freshItemList = require("./mocks/mock6")
        this.eventEmitter.emit(events.itemListUpdated, this.freshItemList)
    }

    async readFreshItemList() {
        await this.manageGsheet(this.getFreshItemList)
    }

    /**
     * Inserts new_value to every of the specified fields.
     * @param {name: {name(ID)_of_the_item}, field: {itemKeys.field_name}, new_value: {whatever_you_wish}}
     */
    async updateItemList(changeArray) {
        this.changeArray = changeArray
        await this.manageGsheet(this.setItemList)
    }

    /**
     * Provide manageGsheet with proper function and execute that like in runner.js
     */
    async manageGsheet(manageCells) {
        async.series([
            function setAuth(step) {
                this.doc.useServiceAccountAuth(this.creds, step);
            }.bind(this),
            function getInfoAndWorksheets(step) {
                this.doc.getInfo(function (err, info) {
                    console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
                    this.sheet = info.worksheets[0];
                    console.log('sheet: ' + this.sheet.title + ' ' + this.sheet.rowCount + 'x' + this.sheet.colCount);
                    step();
                }.bind(this));
            }.bind(this),
            function workingWithCells(step) {
                this.sheet.getCells({
                    'min-col': this.first_col,
                    'max-col': this.last_col,
                    'min-row': this.captionRow,
                    'return-empty': false
                }, manageCells.bind(this));
            }.bind(this),
        ], function (err) {
            if (err) {
                console.log('Error: ' + err);
            }
        });
    }

    /**
     * Iterate over dashboard to get all items in their current state
     */
    getFreshItemList(err, cells) {
        let captionList = []
        let last_row = cells[cells.length - 1]['row']
        let captionCells = cells.filter((value) => value['row'] == this.captionRow)

        captionCells.forEach((elem) => captionList.push(elem['_value']))

        for (let currentRow = this.captionRow + 1; currentRow <= last_row; currentRow++) {

            let analyzedRow = cells.filter((value) => value['row'] == currentRow)
            this.freshItemList.push({})
            for (let captionIndex = 0; captionIndex < captionList.length; captionIndex++) {
                let cell = analyzedRow.filter((value => value['col'] == captionIndex + 1))
                if (cell[0]) {
                    let evaluatedItem = this.freshItemList.pop()
                    if (!cell[0]) {
                        console.log(cell[0])
                    }
                    evaluatedItem[captionList[captionIndex]] = cell[0]['_value']
                    this.freshItemList.push(evaluatedItem)
                }
            }
        }
        this.eventEmitter.emit(events.itemListUpdated, this.freshItemList)
        // step();
    }

    /**
     * this.changeArray needs to be field with at least one elemnet {} of such structure:
     * {name: {name(ID)_of_the_item}, field: {itemKeys.field_name}, new_value: {whatever_you_wish}}
     */
    setItemList(err, cells) {

        if (!this.changeArray) {
            throw new Error("no items in changeArray")
        }

        let captionCells = cells.filter((value) => value['row'] == this.captionRow)

        this.changeArray.forEach(function (changeObj) {
            let changedCellCol = captionCells.filter((value) => value['_value'] == changeObj.field)
            let desiredCol = changedCellCol[0].col
            let desiredRow = 0
            let desiredIndex = 0

            function getDesiredRow(cell) {if ((cell.col == 1) && (cell._value == changeObj.name)) {
                desiredRow = cell.row
            }}
            function getDesiredIndex(cell, index) {if ((cell.col == desiredCol) && (cell.row == desiredRow)) {
                desiredIndex = index
            }}
            cells.forEach(getDesiredRow)
            cells.forEach(getDesiredIndex)
            let desiredCell = cells[desiredIndex]
            desiredCell.value = changeObj.new_value;
            desiredCell.save();
            console.log("saved value %s for item: %s in the field: %s", changeObj.new_value,changeObj.name,changeObj.field)
        })
        // INFO: bulkUpdateCells updates many cells at once: https://www.npmjs.com/package/google-spreadsheet
        // this.sheet.bulkUpdateCells(cells); <= not tested
    }
}