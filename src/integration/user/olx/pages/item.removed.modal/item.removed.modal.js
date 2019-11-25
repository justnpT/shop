import BasePage from "./base.page";
import OfferEndedModal from "../offer.ended.modal/offer.ended.modal";

export default class ItemRemovedModal extends BasePage {

    get buttonHasBeenSold() { return ".reason-sale.success .cirlce-icon" }

    async clickButtonHasBeenSold() {
        await this.baseClickButton(this.buttonHasBeenSold)
        return new OfferEndedModal()
    }
}