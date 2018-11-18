let puppeteer = require("puppeteer")

puppeteer.launch({'headless': false}).then(async browser => {
    const page = await browser.newPage();
    await page.goto('https://www.olx.pl');
    // other actions...
    await browser.close();
});