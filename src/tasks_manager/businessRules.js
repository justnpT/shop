import BusinessEnums from "./businessEnums"
const itemKeys = new BusinessEnums().itemKeys

export default class BusinessRules {

    renewItemOnOlx(item) {
        let itemExpirationDate = new Date(item[itemKeys.olx_expiration_date]);
        let today = new Date();
        if (today >= itemExpirationDate) {return true}
        else {console.log(('Item has not expired yet'+itemKeys.name)); return false}
    }

    addItemToOlx(item) {
        if (item[itemKeys.olx_update] != 1) {console.log(('No decision to update on olx for '+itemKeys.name)); return false}
        if (item[itemKeys.olx_active] == 1) {console.log(('Item is already active on olx '+itemKeys.name)); return false}
        else {return true}
    }

    updateItemToOlx(item) {
        if (item[itemKeys.olx_update] != 1) {console.log(('No decision to update on olx for '+itemKeys.name)); return false}
        if (item[itemKeys.olx_active] == 0) {console.log(('Cannot update item inactive on olx '+itemKeys.name)); return false}
        else {return true}
    }

}