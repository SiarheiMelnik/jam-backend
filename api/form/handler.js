const puppeteer = require('puppeteer')
const { extract, cleanup } = require('aws-puppeteer-lambda');

const fs = require('fs');
const path = require('path');
const devices = require('puppeteer/DeviceDescriptors');

const recognizer = async (data) => await 'capcha';
const validate = async (html) => await `data`;
const getLetter = async () => await 'Letter';

const FEEDBACK_URL = process.env.FEEDBACK_URL;

exports.submit = async (evt) => {
    try {
        console.log(evt);
        
        const record = evt.Records[0];

        if (record.eventName !== 'INSERT') return;

        const dbRow = record.dynamodb.NewImage;

        console.log(dbRow);

        const req = Object.keys(dbRow).reduce((acc, k) => {
            const objValue = dbRow[k];
            const objKey = Object.keys(objValue)[0];
            return {...acc, ...{ [k]: objValue[objKey] } };
        } , {});

        console.log(req);

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

        // await page.waitFor(2000);

        const capchaPath = `/tmp/capcha_gov_form_${Date.now()}.png`;

        await page.screenshot({
            path: capchaPath,
            clip: { x: 40, y: 405 * 2, width: 120, height: 50 }
        });

        const capchaData = fs.readFileSync(capchaPath);

        console.log('Capcha img:', capchaData.toString('base64'))
        
        const capchaText = await recognizer(capchaData);

        console.log('Capcha text:', capchaText);

        const letter = await getLetter(req.complain);

        await page.type('#whois', `${req.email}`);
        await page.type('#name', `${req.name}`);
        await page.type('#address', JSON.stringify(req.coords));
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

    } catch (e) {
        console.log(e);
        return e;
    }
};

