import BasePage from "./base.page";

export default class Login extends BasePage {

    get buttonLogin() { return "#se_userLogin"}
    get inputEmail() { return "#userEmail" }
    get inputPassword() { return "#userPass" }

    async fillInputPassword(password) {
        await this.baseFillInput(this.inputPassword, password)
    }

    async fillInputEmail(emial) {
        await this.baseFillInput(this.inputEmail, emial)
    }

    async clickButtonLogin() {
        await this.baseClickButton(this.buttonLogin)
    }
    
    async performLogin(password, email) {
        await this.fillInputEmail(email)
        await this.fillInputPassword(password)
        await this.clickButtonLogin()
    }
}