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
        console.log("saving changeArray to json file: "+e.text)
        let fs = require('fs');
        fs.writeFile("snapshots/"+new Date()+"test.txt", this._data, function(err) {
            if (err) {
                console.log(err);
            }
        });
    }

    async emptyData(){
        this._data = [];
    }
}

const changeArray = new ChangeArray();
Object.freeze(changeArray);

export default changeArray;