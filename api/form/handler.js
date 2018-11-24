const puppeteer = require('puppeteer')
const { extract, cleanup } = require('aws-puppeteer-lambda');

const fs = require('fs');
const path = require('path');
const devices = require('puppeteer/DeviceDescriptors');

const recognizer = async (data) => await 'capcha';
const validate = async (html) => await `data`;
const getLetter = async () => await 'Letter';

const FEEDBACK_URL = process.env.FEEDBACK_URL;

const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*'
};

exports.submit = async (evt) => {

    const req = JSON.parse(evt.body);

    // const req = {
    //     "email": "6mil1er2017@gmail.com",
    //     "firstName": "John",
    //     "secondName": "Doe",
    //     "lastName": "Vladimirovich",
    //     "address": "NY",
    //     "template": 1
    // };

    const executablePath = await extract()
  
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        args: [
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--single-process',
            '--no-zygote',
            '--no-sandbox',
            '--data-path=/tmp/data-path',
            '--disk-cache-dir=/tmp/cache-dir'
        ],
        executablePath
    });
        
    const page = await browser.newPage();

    await page.emulate(devices['iPhone 8 Plus']);

    await page.goto(`${FEEDBACK_URL}/1`, { waitUntil: 'load' });

    await page.waitFor(2000);

    const capchaPath = `/tmp/capcha_gov_form_${Date.now()}.png`;

    await page.screenshot({
        path: capchaPath,
        // fullPage: true,
        clip: { x: 40, y: 405 * 2, width: 120, height: 50 }
    });

    const capchaData = fs.readFileSync(capchaPath);
    
    const capchaText = await recognizer(capchaData);

    console.log('Capcha text:', capchaText);

    const letter = await getLetter(req.templateId);

    await page.type('#whois', `${req.email}`);
    await page.type('#name', `${req.firstName} ${req.secondName} ${req.lastName}`);
    await page.type('#address', req.address);
    await page.type('#letter', letter);
    await page.type('#captcha', capchaText);


    const imgPath = `/tmp/capcha_gov_form_${Date.now()}.png`;

    await page.screenshot({
        path: imgPath,
        fullPage: true
    });

    const imgData = fs.readFileSync(imgPath);

    // await page.click('.user-input-button');

    // await page.waitForNavigation();

    // const element = await page.$(".scrape");
    // const text = await page.evaluate(element => element.textContent, element);

    // await validate(text);

    await browser.close();

    return {
        'statusCode': 200,
        headers: { ...CORS },
        'body': JSON.stringify({
            capcha: capchaData.toString('base64'),
            img: imgData.toString('base64')
        })
    };
};

