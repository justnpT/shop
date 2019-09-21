import ActionsClick from "../../../utils/actions/actions-click"
const  actionsClick = new ActionsClick()
import ActionsType from "../../../utils/actions/actions-fill"
const  actionsType = new ActionsType()

export default class Dashboard {

    constructor(page){
        this.page = page
    }

    get buttonLogin() {return ".userbox-login"}

    async clickButtonLogin() {
        await actionsClick.clickAfter_expAnim(this.page, this.buttonLogin)
    }

}