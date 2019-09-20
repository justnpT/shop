import ActionsClick from "../../../utils/actions/actions-click"
import ActionsType from "../../../utils/actions/actions-type"
const  actionsType = new ActionsType()
const  actionsClick = new ActionsClick()

export default class Login {

    constructor(page){
        this.page = page
    }

    get buttonLogin() { return "se_userLogin"}
    get inputEmail() { return "#userEmail" }
    get inputPassword() { return "#userPass" }

    async fillInputPassword(password) {
        await actionsType.typeAfter_expAnim(this.page, this.inputPassword, password)
    }

    async fillInputEmail(emial) {
        await actionsType.typeAfter_expAnim(this.page, this.inputEmail, emial)
    }

    async clickButtonLogin() {
        await actionsClick.clickAfter_expAnim(this.page, this.buttonLogin)
    }
    
    async performLogin(password, email) {
        await this.clickButtonLogin()
        await this.fillInputPassword(password)
        await this.fillInputEmail(email)
    }
}