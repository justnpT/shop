var GoogleSpreadsheet = require('google-spreadsheet');
var async = require('async');
 
// spreadsheet key is the long id in the sheets URL
var doc = new GoogleSpreadsheet('1R0pNdZ3JhVjYbfsT9z7EEkqlfwqsVgBEUfjQIf6gtV4');
var sheet;

let first_col = 1;
let last_col = 17;
let captionRow = 4;
// let itd = 'item data';
// let prd = "product decisions";
// let its = "item status information";
// let ith = "item historical data";

async.series([
  function setAuth(step) {
    var creds = require('./creds/shop-250916-e18ae184fd04.json');
    doc.useServiceAccountAuth(creds, step);
  },
  function getInfoAndWorksheets(step) {
    doc.getInfo(function(err, info) {
      console.log('Loaded doc: '+info.title+' by '+info.author.email);
      sheet = info.worksheets[0];
      console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
      step();
    });
  },
  function workingWithRows(step) {
    // google provides some query options
    sheet.getRows({
      offset: 1,
      limit: 20,
      orderby: 'col2'
    }, function( err, rows ){
      console.log('Read '+rows.length+' rows');
        // console.log(rows[3])
        // console.log(rows[4])
        // console.log(rows[5])

      // the row is an object with keys set by the column headers
    //   rows[0].colname = 'new val';
    //   rows[0].save(); // this is async
 
    //   // deleting a row
    //   rows[0].del();  // this is async
 
      step();
    });
  },
  function workingWithCells(step) {
    sheet.getCells({
      'min-col': first_col,
      'max-col': last_col,
      'min-row': captionRow,
      'return-empty': false
    }, function(err, cells) {

      let captions = []
      let items = []

      let last_row = cells[cells.length-1]['row']
      let firstA = cells.filter((value) => value['row'] == captionRow)

      firstA.forEach((elem) => captions.push(elem['_value']))


      for (let currentRow = captionRow+1; currentRow < last_row; currentRow++) {
        let analyzedRow = cells.filter((value) => value['row'] == currentRow)
        // TODO: zrobić tak aby powstało ->
        // [{'name': 'szachy', 'tilte': 'super szachy', 'description': 'nowoczesne szachy'}, {}]
        // TODO: sprawdzić czy ta struktura to jest to czego potrzebuje
      }

      for (const cell of cells) {
            // var cell = cells[0];
            console.log('Cell R'+cell.row+'C'+cell.col+' = '+cell.value);
        }
 
      // cells have a value, numericValue, and formula
    //   cell.value == '1'
    //   cell.numericValue == 1;
    //   cell.formula == '=ROW()';
 
    //   // updating `value` is "smart" and generally handles things for you
    //   cell.value = 123;
    //   cell.value = '=A1+B2'
    //   cell.save(); //async
 
    //   // bulk updates make it easy to update many cells at once
    //   cells[0].value = 1;
    //   cells[1].value = 2;
    //   cells[2].formula = '=A1+B1';
    //   sheet.bulkUpdateCells(cells); //async
 
      step();
    });
  },
  function managingSheets(step) {
    doc.addWorksheet({
      title: 'my new sheet'
    }, function(err, sheet) {
 
    //   // change a sheet's title
    //   sheet.setTitle('new title'); //async
 
    //   //resize a sheet
    //   sheet.resize({rowCount: 50, colCount: 20}); //async
 
    //   sheet.setHeaderRow(['name', 'age', 'phone']); //async
 
      // removing a worksheet
    //   sheet.del(); //async
 
      step();
    });
  }
], function(err){
    if( err ) {
      console.log('Error: '+err);
    }
});