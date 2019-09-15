let maxImplicitWait = require('../../config/config-global').static.maximumImplicitWaitTimeout;
let animation = require('../monitoring/animation/animation');

module.exports = {

    autoScrollDown: async function (page) {
        await page.evaluate(async () => {
            await new Promise((resolve, reject) => {
                let totalHeight = 0
                let distance = 100
                let timer = setInterval(() => {
                    let scrollHeight = document.body.scrollHeight
                    window.scrollBy(0, distance)
                    totalHeight += distance
                    if(totalHeight >= scrollHeight){
                        clearInterval(timer)
                        resolve()
                    }
                }, 100)
            })
        })
    },

    async scrollTo(page, selector) {
        let elem = await page.waitForSelector(selector, {visible: true});
        let boundingBox = await elem.boundingBox();
        await page.evaluate((_x, _y)=> {
            let absoluteElementTop = _y + window.pageYOffset;
            let middle = absoluteElementTop - (window.innerHeight / 2);
            window.scrollTo(parseInt(_x || 0, 10), parseInt(middle || 0, 10));
        }, boundingBox.x, boundingBox.y);

    }
}