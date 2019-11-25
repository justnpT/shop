export default class BaseAssertion {

    constructor(page){
        this.page = page
    }

    async getText(selector) {
        await this.page.waitForSelector(selector, {visible: true});
        let text = await this.page.evaluate((sel) => document.querySelector(sel).textContent, selector);
        return text
    }
}

