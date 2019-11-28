/**
 * Array for updating gsheet with new values
 * [name: {name(ID)_of_the_item}, field: {itemKeys.field_name}, new_value: {whatever_you_wish}]
 */
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
        //TODO: save change.array data in json file to restore if something goes wrong
    }

    async emptyData(){
        this._data = [];
    }
}

const changeArray = new ChangeArray();
Object.freeze(changeArray);

export default changeArray;