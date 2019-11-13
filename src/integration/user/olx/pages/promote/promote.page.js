import BasePage from "../base.page"

export default class Promote extends BasePage {

    get buttonAddWithoutPromotion() { return ".qa-button-promo-without" }

    async clickButtonAddWithoutPromotion() {
        await this.baseClickButton(this.buttonAddWithoutPromotion)
    }

}