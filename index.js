const puppeteer = require("puppeteer-extra"); // require puppeteer-extra
const StealthPlugin = require("puppeteer-extra-plugin-stealth"); // require stealth plugin
puppeteer.use(StealthPlugin()); // enable stealth mode
const fs = require("fs");

const ppr = require("puppeteer");

const devices = {
    device_1: ppr.KnownDevices["iPhone 8 landscape"],
    device_3: ppr.KnownDevices["BlackBerry Z30 landscape"],
    device_4: ppr.KnownDevices["Galaxy S9+"],
    device_5: ppr.KnownDevices["Galaxy Tab S4 landscape"],
    device_6: ppr.KnownDevices["JioPhone 2 landscape"]
}


async function simulateMobileDevice(url) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' // specify the path of your Chrome browser
        });
        const page = await browser.newPage();

        /***Do what ever you want here */
        for (var device in devices) { // loop through the keys of the devices object
            await page.emulate(devices[device]);
            await page.goto (url, { waitUntil: ['domcontentloaded', 'networkidle0'] });
            await page.screenshot({ path: `${devices[device].name}.png`, fullPage: 'true' });
        }

        await browser.close();

        console.log('Success!')
    } catch (error) {
        console.log('Error: ', error.message);
    }
}

const url = 'https://vuetifyjs.com/en/';

simulateMobileDevice(url);




