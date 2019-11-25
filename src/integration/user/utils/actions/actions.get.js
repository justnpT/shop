export default class ActionsGet {

    //TODO: use desctructive assignment here in order to be able to manipulate the parameters easliy
    // https://www.youtube.com/watch?v=NIq3qLaHCIs, the end example for parameters
    /**
     * Clicks on an element that contains a text and is part of a larger list
     * @selectorOfList selector that returns the list of the elements to search through
     * @nthSelectorInTheList this selector should contain $index$ in the place of nth-child($index$) and lead to text
     * @noSpacesText  whether to remove spaces from the returned text
     * @everyNthElem  choose very second (2), third (3), ... element in the list
     */
    async getListOfCurrentOptions(page, selectorOfList, nthSelectorInTheList, noSpacesText = false, everyNthElem = 1) {
        let elements = await page.$$(selectorOfList)
        let list = []
        for(let i=1; i<= elements.length; i++){
            if ((i%everyNthElem==1) || (everyNthElem==1) ) {
                let sel = nthSelectorInTheList.replace("$index$", i)
                await page.waitForSelector(sel);
                let text = await page.evaluate((sel) => document.querySelector(sel).textContent, sel);
                if (noSpacesText) {list.push(text.replace(/ /g,''))} else {list.push(text)}
            }
        }
        return list
    }

}