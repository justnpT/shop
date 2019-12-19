import BasePage from "./base.page";

export default class Home extends  BasePage {

    get buttonLogin() {return ".userbox-login"}

    async clickButtonLogin() {
        await this.baseClickButton(this.buttonLogin)
    }
}