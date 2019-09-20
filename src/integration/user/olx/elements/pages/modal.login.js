import ActionsClick from "../../../utils/actions/actions-click"
const  actionsClick = new ActionsClick()

export default class Login {

    constructor(page){
        this.page = page
    }

    get email() {return "#userEmail"}
    get password() {return "#userPass"}
    get buttonLogin() { return "se_userLogin"}

    async clickButtonLogin() {
        await actionsClick.clickAfter_expAnim(this.page, this.buttonLogin)
    }
}