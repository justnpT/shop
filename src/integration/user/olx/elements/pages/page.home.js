import ActionsClick from "../../../utils/actions/actions-click"
const  actionsClick = new ActionsClick()

export default class Home {

    get buttonLogin() {return ".userbox-login"}

    async clickButtonLogin(page) {
        await actionsClick.clickAfter_expAnim(page, this.buttonLogin)
    }

}