let puppeteer = require("puppeteer")
let options = require('../../launch-options')

module.exports = class setup {

    constructor(url) {
        this.url = url
        this.options = options;
    }

    async start() {
        this.browser = await puppeteer.launch(this.options);
        this.page = await this.browser.newPage();
        await this.page.goto(this.url);
        return this.page;
    }

    async stop() {
        await this.browser.close();
    }
}

// puppeteer.launch({'headless': false}).then(async browser => {
//     const page = await browser.newPage();
//     await page.goto('https://www.olx.pl');
//     // other actions...
//     await browser.close();
// });