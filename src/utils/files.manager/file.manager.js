let fs = require('fs');

export default class FileManager {

    createFile(path, content){
        fs.writeFile(path, content, function(err) {
            if (err) {
                console.log(err);
            }
        });
    }

    async createFileAsync(path, content){
        return new Promise(function (resolve) {
            if (!fs.existsSync(path)) {
                fs.writeFile(path, content, function (err) {
                    if (err) throw err;
                    console.log("created" +path);
                    resolve();
                });
            } else {
                console.log('file already exists: ' +path)
            }
        });
    }

    saveInFile(){
        console.log("saving changeArray to json file: "+e.text)

    }

    async emptyData(){
        this._data = [];
    }
}