/**
 * Array for updating gsheet with new values
 * [name: {name(ID)_of_the_item}, field: {itemKeys.field_name}, new_value: {whatever_you_wish}]
 */
import FileManager from "../files.manager/file.manager";
import BusinessEnums from "../../data/business.enums";

class ChangeArray {
    constructor(){
        this._data = [];
    }

    add(item){
        this._data.push(item);
    }

    get(){
        return this._data
    }

    saveInFile(){
        let fileManager = new FileManager()
        fileManager.createFile("snapshots/"+new Date()+"test.txt", this._data)
    }

    writeDataFromMock(mockPath, eventEmitter) {
        let events = new BusinessEnums().emitedEvents;

        // TODO: write data from the mock into changeArrayStyle
        eventEmitter.emit(events.changeArrayReadyToWrite)
    }

    async emptyData(){
        this._data = [];
    }
}

const changeArray = new ChangeArray();
Object.freeze(changeArray);

export default changeArray;