import BusinessEnums from "../business.enums"
import changeArray from "../../integration/utils/change.array/change.array";
const itemKeys = new BusinessEnums().itemKeys

export default class GsheetNewValues {

    renewItem(item, values) {
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_active, new_value: values.activeTrue})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_expiration_date, new_value: values.itemExpirationDate})
    }

    addItem(item, values, editLink) {
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_active, new_value: values.activeTrue})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_update, new_value: values.dontUpdate})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_start_date, new_value: values.today})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_expiration_date, new_value: values.itemExpirationDate})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.photoes, new_value: values.updatedTrue})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_edit_link, new_value: editLink})
    }

    updateItem(item, values) {
    }

    removeItem(item, values) {
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_active, new_value: values.sold})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_update, new_value: values.sold})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_info_link, new_value: values.sold})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_edit_link, new_value: values.sold})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.photoes, new_value: values.sold})
        changeArray.add({name: item[itemKeys.name], field: itemKeys.olx_start_date, new_value: values.today})
    }

}