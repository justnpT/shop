import BusinessEnums from "../business.enums"
const itemKeys = new BusinessEnums().itemKeys

export default class GoogleSheetConditions {

    renewItem(item) {
        let itemExpirationDate = new Date(item[itemKeys.olx_expiration_date]);
        let today = new Date();
        if (today >= itemExpirationDate) {console.log(('Reactivating expired item on olx: '+item[itemKeys.name])); return true}
        else {return false}
    }

    addItem(item) {
        if (item[itemKeys.olx_active] == 1) {return false}
        if (item[itemKeys.olx_update] != 1) {return false}
        else {console.log(('Adding new item to olx: '+item[itemKeys.name])); return true}
    }

    updateItem(item) {
        if (item[itemKeys.olx_active] == 0) {return false}
        if (item[itemKeys.olx_update] != 1) {return false}
        else {console.log(('Updating existing item on olx '+item[itemKeys.name])); return true}
    }

    removeItem(item) {
        if ((item[itemKeys.sold] == 1) && (item[itemKeys.olx_active] != 1))
        {console.log(('Deactivating sold item: '+item[itemKeys.name])); return true}
    }

}