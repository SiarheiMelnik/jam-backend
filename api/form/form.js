const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const devices = require('puppeteer/DeviceDescriptors');
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
const getLetter = async () => await 'Letter';

(async () => {
    const req = {
        "email": "6mil1er2017@gmail.com",
        "firstName": "John",
        "secondName": "Doe",
        "lastName": "Vladimirovich",
        "address": "NY",
        "template": 1
    };
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.emulate(devices['iPhone 8 Plus']);

    await page.goto('https://minsk.gov.by/ru/feedback/1', { waitUntil: 'load' });
    await page.waitFor(2000);

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

    console.log('Capcha text:', capchaText);
    const letter = await getLetter(req.templateId);

    await page.type('#whois', `${req.email}`);
    await page.type('#name', `${req.firstName} ${req.secondName} ${req.lastName}`);
    await page.type('#address', req.address);
    await page.type('#letter', letter);
    await page.type('#captcha', capchaText);

    await page.screenshot({
        path: `images/full_gov_form_${Date.now()}.png`,
        fullPage: true
    });

    await page.click('.user-input-button');

    await page.waitForNavigation();

    // const element = await page.$(".scrape");
    // const text = await page.evaluate(element => element.textContent, element);

    // await validate(text);

    await browser.close();
})();

