const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

const req = {
	"email": "6mil1er2017@gmail.com",
	"firstName": "John",
	"secondName": "Doe",
	"lastName": "Vladimirovich",
	"address": "NY",
	"template": 1
};

    //    mode: 'send',
    //    yur: '',
    //    value: 1, // goverment
    //    type: 'special',
    //    org: 1, // goverment
    //    whois: data.email,
    //    name: `${data.firstName} ${data.secondName} ${data.lastName}`,
    //    address: data.address,
    //    letter: await getLetter(templateId),
    //    capcha: 'xxjb'

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.emulate(devices['iPhone 8 Plus']);

    const res = await page.goto('https://minsk.gov.by/ru/feedback/1');
    
    await page.screenshot({
        path: `images/full_gov_form_${Date.now()}.png`,
        fullPage: true
    });

    await page.screenshot({
        path: `images/capcha_gov_form_${Date.now()}.png`,
        // fullPage: true,
        clip: {
            x: 40,
            y: 400 * 2,
            width: 120,
            height: 50
        }
    });

    await browser.close();
})();

