import Setup from '../setup/setup'
import Login from "./pages/modal.login"
import Home from "./pages/page.home"
import NewOffer from "./pages/page.new.offer"
import Category from "./pages/modal.category"
let creds = require("../../../../credentials/credentials")

export default class olxWriter {
    constructor(url) {
        this.url = url
        this.setup = new Setup(this.url)
        this.olxCreds = creds.olx;
        this.photoesPath = creds.gdrive.photoesPath;
    }

    async write(itemList) {
        if (itemList.length==0) {
            throw new Error("no items in itemList");
        }

        this.page  = await this.setup.start();
        const login = new Login(this.page)
        const home = new Home(this.page)
        await home.clickButtonLogin(this.page)
        await login.performLogin(this.olxCreds.password, this.olxCreds.email)

        for (let item of itemList) {
            if (item['update'] != 1) {throw new Error(('no decision to update '+item['name']))}
            if (item['u_olx'] != 1) {throw new Error(('no decision to update the olx shop with '+item['name']))}

            switch (item["p_olx"]) {
                case "0":
                    await this.addNewItem(item)
                case "1":
                    await this.updateItem(item)
            }
        }
    }

    async hello(itemList) {
        console.log('witam' + itemList)
        console.log(this.toString())
        await this.write(itemList)
    }

    async updateItem(item) {
        // item[p_olx] == 1 | error otherwise
        // navigate to 'ogłoszenie' edition url
        // update fields
        // communicate update to gsheet for change item[u_olx] = 0
    }

    async addNewItem(item) {
        if (item["p_olx"] != 0) {throw new Error(('according to gsheet item '+item['name']+ "is already added to this shop"))}
        await this.page.goto("https://www.olx.pl/nowe-ogloszenie/")
        const newOffer = new NewOffer(this.page)
        const category = new Category(this.page)
        await newOffer.fillInputTitle(item["title"])
        await newOffer.clickButtonCategory()
        await category.clickButtonFirstCategory()
        await newOffer.fillInputPrice(item["price"])
        await newOffer.selectPrivateBusinessType()
        await newOffer.fillInputDescription(item["description"])
        await newOffer.clickButtonSimplePhotoUpload()
        await newOffer.uploadPhoto(1, this.photoesPath)
        await newOffer.clickButtonAcceptTerms()
        await newOffer.clickButtonNext()
    }

}

// module.exports = olxWriter;