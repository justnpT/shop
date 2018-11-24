// import setup from '../../setup/setup'
const setup = require('../../setup/setup');
let config = require('../config')
let su = new setup(config.olx_home);

(async () => {
    const page = await su.start();

    // await page.screenshot({path: 'example.png'});

    await su.stop();
})();