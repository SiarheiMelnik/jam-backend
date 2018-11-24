const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
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

const recognizer = async (data) => await 'capcha';
const validate = async (html) => await `data`;
const submitButton = async () => await 'text';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.emulate(devices['iPhone 8 Plus']);

    await page.goto('https://minsk.gov.by/ru/feedback/1');


    // await page.screenshot({
    //     path: `images/full_gov_form_${Date.now()}.png`,
    //     fullPage: true
    // });

    const capchaPath = `images/capcha_gov_form_${Date.now()}.png`;

    await page.screenshot({
        path: capchaPath,
        // fullPage: true,
        clip: { x: 40, y: 405 * 2, width: 120, height: 50 }
    });

    const data = fs.readFileSync(path.join(__dirname, capchaPath));
    const capchaText = await recognizer(data);

    console.log(capchaText);

    const formAnswerHTML = await submitButton();

    await validate(formAnswerHTML);

    await browser.close();
})();

