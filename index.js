const puppeteer = require("puppeteer-extra"); // require puppeteer-extra
const StealthPlugin = require("puppeteer-extra-plugin-stealth"); // require stealth plugin
puppeteer.use(StealthPlugin()); // enable stealth mode
const fs = require("fs");

async function simulateMobileDevice(url) {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' // specify the path of your Chrome browser
        });
        const page = await browser.newPage();
        
        /***Do what ever you want here */
        await page.setUserAgent('Mozilla/5.0')
        await page.setViewport({
            width:375,
            height:812
        })

        await page.goto(url);

        await browser.close();

        console.log('Success!')
    } catch (error) {
        console.log('Error: ', error.message);
    }
}

const url = 'https://mlmond.com';

simulateMobileDevice(url);




