import BasePage from "./base.page";

export default class Category extends BasePage {

    get buttonFirstCategory() { return ".caticon" }
    get buttonFirstLevelCategory() { return "[data-category-name='$category$'"}
    get listOfChoosenCategories() { return "#catgory-breadcrumb-text"}
    get nthElemInThelistOfChoosenCategories() { return "#catgory-breadcrumb-text span:nth-child($index$)"}
    get listSecondLevelCategory() { return ".chooseway > div:nth-child(1) > div:nth-child(2) ul li"}
    get nthButtonSecondLevelCategory() { return ".chooseway > div:nth-child(1) > div:nth-child(2) ul li:nth-child($index$) a > .inlblk"}
    get listThirdLevelCategory() { return ".chooseway > div:nth-child(1) > div:nth-child(3) ul li"}
    get nthButtonThirdLevelCategory() { return ".chooseway > div:nth-child(1) > div:nth-child(3) ul li:nth-child($index$) a > .inlblk"}

    async clickButtonFirstLevelCategory(category) {
        await this.baseClickButton(this.buttonFirstLevelCategory.replace("$category$", category))
    }

    async clickButtonSecondLevelCategory(category) {
        await this.baseClickByOptionText(this.listSecondLevelCategory, this.nthButtonSecondLevelCategory, category)
    }

    async clickButtonThirdLevelCategory(category) {
        await this.baseClickByOptionText(this.listThirdLevelCategory, this.nthButtonThirdLevelCategory, category)
    }

    async clickButtonFirstCategory() {
        await this.baseClickButton(this.buttonFirstCategory)
    }

    async getChoosenCategories() {
        await this.baseGetListOfTexts(this.listOfChoosenCategories, this.nthElemInThelistOfChoosenCategories, false, 2)
    }
}