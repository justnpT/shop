import sheetReader from './gsheet_reader.js'
import olxWriter from './gsheet_reader.js'

(async() => {
    let reader = new sheetReader('1R0pNdZ3JhVjYbfsT9z7EEkqlfwqsVgBEUfjQIf6gtV4');
    await reader.updateFreshItemList();
    // await sheet.setAuth();
    // await sheet.getInfoAndWorksheets();
})();
