export default class BusinessEnums {

    constructor() {
        this.emitedEvents = {
            itemListUpdated: "itemListUpdated",
            changeArrayReady: "changeArrayReady"
        }

        this.itemKeys = {
            name: "name",
            title: "title",
            description: "description",
            photoes: "photos",
            category: "category",
            price: "price",
            olx_update: "update_olx",
            allegro_update: "update_allegro",
            facebook_update: "update_facebook",
            sold: "sold",
            date_sold: "date_sold",
            olx_active: "active_olx",
            allegro_active: "active_allegro",
            facebook_active: "active_facebook",
            original_gross_price: "original_gross_price",
            original_net_price: "original_net_price",
            olx_info_link: "edit_link_olx",
            olx_edit_link: "edit_link_olx",
            olx_expiration_date: "expiration_date_olx",
            olx_start_date: "start_date_olx",
        }
    }

}
