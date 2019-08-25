import sheetReader from './reader.js'

(async() => {
    let sheet = new sheetReader('1R0pNdZ3JhVjYbfsT9z7EEkqlfwqsVgBEUfjQIf6gtV4');
    await sheet.setAuth();
    await sheet.getInfoAndWorksheets();
})();
