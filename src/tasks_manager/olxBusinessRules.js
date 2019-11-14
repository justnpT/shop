import BusinessEnums from "./businessEnums"
const itemKeys = new BusinessEnums().itemKeys

export default class OlxBusinessRules {

    renewItem(item) {
        let itemExpirationDate = new Date(item[itemKeys.olx_expiration_date]);
        let today = new Date();
        if (today >= itemExpirationDate) {return true}
        else {console.log(('Item has not expired yet'+itemKeys.name)); return false}
    }

    addItem(item) {
        if (item[itemKeys.olx_active] == 1) {console.log(('Item is already active on olx '+item[itemKeys.name])); return false}
        if (item[itemKeys.olx_update] != 1) {return false}
        else {return true}
    }

    updateItem(item) {
        if (item[itemKeys.olx_active] == 0) {console.log(('Cannot update item that is inactive on olx '+item[itemKeys.name])); return false}
        if (item[itemKeys.olx_update] != 1) {return false}
        else {return true}
    }

}