export default class Offer {

    get title() {return ".offer-titlebox h1"}
    get price() {return ".pricelabel strong"}
    get description() {return "#textContent"}
    get category() {return "tr:nth-child(1) .col:nth-child(1) a"}
    get who() {return "tr:nth-child(1) .col:nth-child(2) a"}
    get usage() {return "tr:nth-child(2) .col:nth-child(1) a"}

}

