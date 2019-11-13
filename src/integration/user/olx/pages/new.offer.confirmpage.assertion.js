import BaseAssertion from "./base.assertion";

export default class AssertionConfirmPage extends BaseAssertion {

    get inputInfoLink() { return "#add-title" }

    async getInfoLinkText() {
        await this.getText(this.inputInfoLink)
    }

}

