import BasePage from "./base.page";

export default class Category extends BasePage {

    get buttonFirstCategory() { return ".caticon" }

    async clickButtonFirstCategory() {
        await this.baseClickButton(this.buttonFirstCategory)
    }
}