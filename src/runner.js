import sheetReader from './apis/google_sheet/gsheet_reader.js'
import olxWriter from './puppeteer/olx/olx_writer.js'

(async() => {
    let spreadsheet = new sheetReader('1R0pNdZ3JhVjYbfsT9z7EEkqlfwqsVgBEUfjQIf6gtV4');
    let olx = new olxWriter();
    await spreadsheet.updateFreshItemList();
    await olx.write(spreadsheet.freshItemList)
    // await sheet.setAuth();
    // await sheet.getInfoAndWorksheets();
})();
