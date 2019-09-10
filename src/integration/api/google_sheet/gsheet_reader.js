var GoogleSpreadsheet = require('google-spreadsheet')
var async = require('async');

class sheetReader {
    constructor(spreadsheet_key) {
        this.doc = new GoogleSpreadsheet(spreadsheet_key);
        this.creds = require('./creds/shop-250916-e18ae184fd04.json');
        this.first_col = 1;
        this.last_col = 17;
        this.captionRow = 4;
        this.freshItemList = [];
    }

    async setAuth() {

        let step = function(err){
            if( err ) {
              console.log('Error: '+err);
            }
        }
        this.doc.useServiceAccountAuth(this.creds, step);
    }

    async getInfoAndWorksheets() {
        this.doc.getInfo( function(err, info) {
            console.log('doc: '+info.title+' by '+info.author.email);
            this.sheet = info.worksheets[0];
            console.log('sheet 1: ' + this.sheet.title + ' ' +this.sheet.rowCount + 'x' + this.sheet.colCount);
        }.bind(this));
    }

    async updateFreshItemList() {
        async.series([
            function setAuth(step) {
                this.doc.useServiceAccountAuth(this.creds, step);
            }.bind(this),
            function getInfoAndWorksheets(step) {
                this.doc.getInfo(function (err, info) {
                    console.log('Loaded doc: ' + info.title + ' by ' + info.author.email);
                    this.sheet = info.worksheets[0];
                    console.log('sheet 1: ' + this.sheet.title + ' ' + this.sheet.rowCount + 'x' + this.sheet.colCount);
                    step();
                }.bind(this));
            }.bind(this),
            function workingWithCells(step) {
                this.sheet.getCells({
                    'min-col': this.first_col,
                    'max-col': this.last_col,
                    'min-row': this.captionRow,
                    'return-empty': false
                }, function (err, cells) {

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
                    console.log(this.freshItemList[15]['price'])
                    step();
                }.bind(this));
            }.bind(this),
        ], function (err) {
            if (err) {
                console.log('Error: ' + err);
            }
        });
    }
}

 module.exports = sheetReader;