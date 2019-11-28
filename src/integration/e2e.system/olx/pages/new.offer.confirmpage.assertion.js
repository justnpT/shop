import BaseAssertions from "./baseAssertions";

export default class AssertionConfirmPage extends BaseAssertions {

    get inputInfoLink() { return "#add-title" }

    async getInfoLinkText() {
        await this.getText(this.inputInfoLink)
    }

}

