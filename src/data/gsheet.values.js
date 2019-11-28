export default class GsheetValues {

    constructor() {
        this.today = new Date();
        this.sold = "sold";
        this.activeTrue = 1;
        this.activeFalse = 0;
        this.updatedTrue = "updated";
        this.dontUpdate = "no";
        this.itemExpirationDate = new Date(this.today)
        this.itemExpirationDate.setDate(this.itemExpirationDate.getDate() + 30)
    }

}