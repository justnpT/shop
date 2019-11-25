import BasePage from "../base.page";
import ItemRemovedModal from "../item.removed.modal/item.removed.modal";

export default class ActivePage extends BasePage {

    get buttonRemoveItem()  {return '.active .row-elem[data-title="$itemTitle$"] .remove-link'}

    async clickButtonRemove(itemTitle) {
        await this.baseClickButton(this.buttonRemoveItem.replace("$itemTitle$", itemTitle))
        return new ItemRemovedModal(this.page)
    }

};