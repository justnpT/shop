import ActionsClick from "../../utils/actions/actions-click"
const  actionsClick = new ActionsClick()

export default class Category {

    constructor(page){
        this.page = page
    }

    get buttonFirstCategory() { return ".caticon" }

    async clickButtonFirstCategory() {
        await actionsClick.clickAfter_expAnim(this.page, this.buttonFirstCategory)
    }
}