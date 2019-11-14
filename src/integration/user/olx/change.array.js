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
}

const changeArray = new ChangeArray();
Object.freeze(changeArray);

export default changeArray;