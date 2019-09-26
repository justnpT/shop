import ActionsClick from "../../utils/actions/actions-click"
const  actionsClick = new ActionsClick()

export default class Home {

    constructor(page){
        this.page = page
    }

    get buttonLogin() {return ".userbox-login"}

    async clickButtonLogin() {
        await actionsClick.clickAfter_expAnim(this.page, this.buttonLogin)
    }

}