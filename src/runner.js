import sheetReader from './integration/api/google_sheet/gsheet_reader.js'
import olxWriter from './integration/user/olx/olx_writer.js'
import config from './integration/user/olx/config'

(async() => {
    let spreadsheet = new sheetReader('1R0pNdZ3JhVjYbfsT9z7EEkqlfwqsVgBEUfjQIf6gtV4');
    let olx = new olxWriter(config.baseUrl);
    await spreadsheet.updateFreshItemList();
    await olx.write(spreadsheet.freshItemList)
    // await sheet.setAuth();
    // await sheet.getInfoAndWorksheets();
})();
