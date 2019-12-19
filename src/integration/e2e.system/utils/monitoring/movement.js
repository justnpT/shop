import * as options from "../../pupp.conf";

export default class Movement {

    async waitForAnimationAfterExplicitAndMaxImplicit(page, selector) {
        await page.waitForSelector(selector);
        await page.waitFor(options.maximumImplicitWaitTimeout);
        await this.waitForMovementToFinish(page, selector);
    }

    async waitForMovementToFinishAfterExp(page, selector, stableFor50msMultipliedBy=6, logInfo=false) {
        await page.waitForSelector(selector);
        await this.waitForMovementToFinish(page, selector, stableFor50msMultipliedBy, logInfo);
    }

    async waitForElementToMove(page, selector, timeout = options.timeout, logInfo = false) {
        await page.waitForSelector(selector, {visible: true});
        let element = await page.$(selector);
        let cachedPosition = await page.evaluate((element) => {
            const {top, left, bottom, right} = element.getBoundingClientRect();
            return {top, left, bottom, right};
        }, element);

        let elementStale = true;

        if (logInfo) {console.log('waitForElementToMove, elem: ',selector)}
        await page.waitFor(50);
        let stabilityCount = 1;
        let iteration = 1;
        while(elementStale) {
            let newPosition = await page.evaluate((header) => {
                const {top, left, bottom, right} = header.getBoundingClientRect();
                return {top, left, bottom, right};
            }, element);
            // if (logInfo) {console.log('------ position %s -------',iteration)
            //     console.log(cachedPosition)
            //     console.log(newPosition)}

            let isPositionStable = await this.compareRects(newPosition, cachedPosition)
            if (logInfo) { console.log('iteration %s is stable?: %s', iteration, isPositionStable)}
            if (isPositionStable) {
                stabilityCount++;
                await page.waitFor(50);
            }
            else {
                elementStale = false;
            }

            if (stabilityCount === options.timeout/50) {
                if (logInfo) {console.log('------ animated elem stability acheived -------')}
                throw Error('element '+selector+' haven\'t moved for '+options.timeout+' ms.')
            }
            cachedPosition = newPosition;
            iteration++;
        }
    }

    async waitForMovementToFinish(page, selector, stableFor50msMultipliedBy=6, logInfo=false) {
        const element = await page.$(selector);

        let cachedPosition = await page.evaluate((header) => {
            const {top, left, bottom, right} = header.getBoundingClientRect();
            return {top, left, bottom, right};
        }, element);
        if (logInfo) {
            console.log('AUTOTESTS: wait %d ms. for element stability: $s',stableFor50msMultipliedBy*50, selector)}

        let elementNotSteady = true;
        let stabilityCount = 0;
        let iteration = 1;
        await page.waitFor(50);
        if (logInfo) { console.log('expected stability count: %s', stableFor50msMultipliedBy*50)}

        while(elementNotSteady) {
            let newPosition = await page.evaluate((header) => {
                const {top, left, bottom, right} = header.getBoundingClientRect();
                return {top, left, bottom, right};
            }, element);
            // if (logInfo) {console.log('------ iteration -------')
            // console.log(cachedPosition)
            // console.log(newPosition)}

            let isPositionStable = await this.compareRects(newPosition, cachedPosition)
            if (logInfo) { console.log('iteration %s is stable?: %s, time elapsed: %s', iteration, isPositionStable, (stabilityCount+1)*50)}
            if (isPositionStable) {
                stabilityCount++;
                await page.waitFor(50);
            }
            else {
                stabilityCount = 0;
                await page.waitFor(50);
            }

            if (stabilityCount === stableFor50msMultipliedBy) {
                if (logInfo) {console.log('------ animated elem stability acheived -------')}
                elementNotSteady = false;
            }
            cachedPosition = newPosition;
            iteration++;
        }
    }

    async compareRects(rect1, rect2) {
        if (
            (rect1.bottom == rect2.bottom) &
            (rect1.left == rect2.left) &
            (rect1.right == rect2.right) &
            (rect1.top == rect2.top)
        ) {
            return true;
        }
        else {
            return false;
        }

    }


}

