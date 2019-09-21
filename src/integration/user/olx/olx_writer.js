import Setup from '../setup/setup'
import Login from "../../../integration/user/olx/elements/pages/modal.login"
import Home from "../../../integration/user/olx/elements/pages/page.home"
let creds = require("../../../../credentials/creds")
const home = new Home()

export default class olxWriter {
    constructor(url) {
        this.setup = new Setup(this.url)
        this.url = url
        this.olxCreds = creds.olx;
    }

    async write(itemList) {
        for (let item of itemList) {
            if (item['update'] != 1) {throw new Error(('no decision to update '+item['name']))}
            if (item['u_olx'] != 1) {throw new Error(('no decision to update the olx shop with '+item['name']))}

            this.page  = await this.setup.start();
            const login = new Login(this.page)
            const home = new Home(this.page)
            await home.clickButtonLogin(this.page)
            await login.performLogin(this.olxCreds.password, this.olxCreds.email)

            switch (item["p_olx"]) {
                case 0:
                    await this.addNewItem(item)
                case 1:
                    await this.updateItem(item)
            }
            // on home click 'moj olx'
        // switch:
        // case1 item[p_olx] == 1
        // case2 item[p_olx] == 0
        // case1: updateItem(item)
        // case2: addNewItem(item)

        }
    }

    async updateItem(item) {
        // item[p_olx] == 1 | error otherwise
        // navigate to 'ogłoszenie' edition url
        // update fields
        // communicate update to gsheet for change item[u_olx] = 0
    }

    async addNewItem(item) {
        if (item["p_olx"] != 0) {throw new Error(('according to gsheet item presence'+item['name']+ "is not false"))}
        await this.page.goto("https://www.olx.pl/nowe-ogloszenie/")
        // type item[title] into 'wpisz tytul'
        // click 'wybierz kategorie'
        // click 'wybierz sugerowana kategorie' nr 1
        // type item[description] into 'opis'
        // upload photo from item[photos]
        // check 'accept all agreements'
        // click next
    }

}

// module.exports = olxWriter;