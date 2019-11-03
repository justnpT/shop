const itemKeys = new ItemKeys()

class BusinessRules {

    renewItemOnOlx(item) {
        let today = new Date();
        //TODO compare two dates https://stackoverflow.com/questions/492994/compare-two-dates-with-javascript
        if (item[itemKeys.expiration_date] >= today) {return true}
        else {console.log(('Item has not expired yet'+itemKeys.name)); return false}
    }

    addItemToOlx(item) {
        if (item[itemKeys.olx_update] != 1) {console.log(('No decision to update on olx for '+itemKeys.name)); return false}
        if (item[itemKeys.olx_active] == 0) {return true}
        else {console.log(('Item is already active on olx '+itemKeys.name)); return false}
    }

    updateItemToOlx(item) {
        if (item[itemKeys.olx_update] != 1) {console.log(('No decision to update on olx for '+itemKeys.name)); return false}
        if (item[itemKeys.olx_active] == 1) {console.log(('Item is already active on olx '+itemKeys.name)); return false}
        else {return true}
    }

}