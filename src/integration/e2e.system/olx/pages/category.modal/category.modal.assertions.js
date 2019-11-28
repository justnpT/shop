import Category from "./category.modal";
import BaseAssertions from "../baseAssertions";

export default class CategoryAssertions extends Category {

    constructor(page) {
        super(page)
        this.assertions = new BaseAssertions()
    }

    async getChoosenCategories() {
        return await this.assertions.baseGetListOfTexts(this.listOfChoosenCategories, this.nthElemInThelistOfChoosenCategories, false, 2)
    }

}