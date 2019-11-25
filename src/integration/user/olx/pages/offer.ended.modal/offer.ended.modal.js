import BasePage from "./base.page";

export default class OfferEndedModal extends BasePage {

    get buttonCancel() { return "#fancybox-close" }

    async clickButtonCancel() {
        await this.baseClickButton(this.buttonCancel)
    }
}