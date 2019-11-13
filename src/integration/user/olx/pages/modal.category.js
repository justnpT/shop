import BasePage from "./base.page";

export default class Category extends BasePage {

    get buttonFirstCategory() { return ".caticon" }
    get buttonCategory() { return "[data-category-name='$category$'"}

    async clickButtonCategory(category) {
        await this.baseClickButton(this.buttonCategory.replace("$category$", category))
    }

    async clickButtonFirstCategory() {
        await this.baseClickButton(this.buttonFirstCategory)
    }

    async selectCategory(category) {
        await this.baseClickButton(this.buttonFirstCategory)
    }
}