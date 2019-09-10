module.exports = class setup {

    constructor(url) {
        this.url = url
        this.options = options;
        let advertisments = require('./desktop/logged_in/ogloszenia');
        // stala nazwa obiektu (plik), rozne wersje obiektu
        // proste uzycie
        // uzytkownik tylko podaje jaki element chce uzyc, a klasa sama grupuje ten selektor na:
        // logged in / logged out / desktop / mobile
        // await page.click(navbar.signup) <- zwraca obiekt reprezentujacy to co dalej moze sie dziac
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