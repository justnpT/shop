var GoogleSpreadsheet = require('google-spreadsheet')
// var async = require('../../../async')

class sheetReader {
    constructor(spreadsheet_key) {
        this.doc = new GoogleSpreadsheet(spreadsheet_key);
        this.sheet;
    }

    async setAuth() {

        let step = function(err){
            if( err ) {
              console.log('Error: '+err);
            }
        }

        let creds = require('./creds/shop-250916-e18ae184fd04.json');
        // https://cmichel.io/how-to-access-google-spreadsheet-with-node/
        // https://github.com/theoephraim/node-google-spreadsheet#service-account-recommended-method
        this.doc.useServiceAccountAuth(creds, step);
    }

    async getInfoAndWorksheets() {
        this.doc.getInfo( function(err, info) {
            console.log('doc: '+info.title+' by '+info.author.email);
            this.sheet = info.worksheets[0];
            console.log('sheet 1: ' + sheet.title + ' ' +sheet.rowCount + 'x' + sheet.colCount);
        });
    }

    async workingWithRows() {
        this.sheet.getRows(
            {offset:1, limit: 20, orderby: 'col2'},
            function (err, rows) {
                console.log('read: '+rows.length+' rows')
                rows[0].colname = 'new value';
                rows[0].save(); //async
                rows[0].del();  //async
            });
    }

    async workingWithCells() {
        this.sheet.getCells(
            {'min-row': 1, 'max-row': 5}
        )
    }
}

 module.exports = sheetReader;