import BusinessEnums from "../business.enums"
import changeArray from "../../integration/utils/change.array/change.array";
const itemKeys = new BusinessEnums().itemKeys

export default class EditGoogleSheet {

    renewItem(item, data) {
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_active, new_value: data.activeTrue})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_expiration_date, new_value: data.itemExpirationDate})
    }

    addItem(item, data, editLink) {
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_active, new_value: data.activeTrue})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_update, new_value: data.dontUpdate})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_start_date, new_value: data.today})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_expiration_date, new_value: data.itemExpirationDate})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.photoes, new_value: data.updatedTrue})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_edit_link, new_value: editLink})
    }

    updateItem(item, values) {
    }

    removeItem(item, data) {
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_active, new_value: data.sold})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_update, new_value: data.sold})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_info_link, new_value: data.sold})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_edit_link, new_value: data.sold})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.photoes, new_value: data.sold})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_start_date, new_value: data.today})
    }

}