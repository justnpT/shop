import setup from '../setup/setup'

class olxWriter extends setup {
    constructor(url) {
        super(url)
    }

    async write(itemList) {
        for (let item of itemList) {
            if (item['update'] != 1) {throw new Error(('no decision to update '+item['name']))}
            if (item['u_olx'] != 1) {throw new Error(('no decision to update the olx shop with '+item['name']))}
        }
        // on home click 'moj olx'
        // fill login modal and click 'zaloguj sie'
        // on home click 'moj olx'
        // switch:
        // case1 item[p_olx] == 1
        // case2 item[p_olx] == 0
        // case1: updateItem(item)
        // case2: addNewItem(item)
    }

    async updateItem(item) {
        // item[p_olx] == 1 | error otherwise
        // navigate to 'ogłoszenie' edition url
        // update fields
        // communicate update to gsheet for change item[u_olx] = 0
    }

    async addNewItem(item) {
        // item[p_olx] == 0 | error otherwise
        // click 'dodaj ogloszenie'
        // type item[title] into 'wpisz tytul'
        // click 'wybierz kategorie'
        // click 'wybierz sugerowana kategorie' nr 1
        // type item[description] into 'opis'
        // upload photo from item[photos]
        // check 'accept all agreements'
        // click next
    }

}

module.exports = olxWriter;