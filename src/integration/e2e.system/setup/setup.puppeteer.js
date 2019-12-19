let puppeteer = require("puppeteer")
let options = require('../pupp.conf')

export default class SetupPuppeteer {

    constructor(url) {
        this.url = url
    }

    async start() {
        this.browser = await puppeteer.launch(options);
        this.page = await this.browser.newPage();
        await this.page.goto(this.url);
        return this.page;
    }

    async stop() {
        await this.browser.close();
    }
}