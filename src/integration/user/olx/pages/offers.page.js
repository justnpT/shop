import BasePage from "./base.page";

export default class Ogloszenia extends BasePage {

    get active() {return '#typeactive'}
    get zakonczone() {return '#typearchive a'}
    get zakonczoneOgloszenia() {return  { //<- to powinien byc obiekt
        aktywizujZaznaczoneCheckbox: '.f_checkbox',
        aktywizujZaznaczone: '#activateme',
    }}
    get offerRows()  {return '#adsTable tr.row-elem'}
    get previews()  {return '#adsTable tr.row-elem [id^=preview]'}
    get previewsVar()  {return '#adsTable tr.row-elem:nth-child(var) [id^=preview]'}
};