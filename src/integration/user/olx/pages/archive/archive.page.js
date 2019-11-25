import BasePage from "../base.page";

export default class ArchivePage extends BasePage {

    get buttonActivateArchivedItem()  {return '#adsTable tr.row-elem[data-title="$itemTitle$"] .activate-link'}

    async clickButtonActivate(itemTitle) {
        await this.baseClickButton(this.buttonActivateArchivedItem.replace("$itemTitle$", itemTitle))
    }

};