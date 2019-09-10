import setup from './../setup/setup'

class olxWriter extends setup {
    constructor(url) {
        super(url)
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

    async write() {

    }

}

module.exports = olxWriter;