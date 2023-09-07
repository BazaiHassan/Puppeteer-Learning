const puppeteer = require("puppeteer-extra"); // require puppeteer-extra
const StealthPlugin = require("puppeteer-extra-plugin-stealth"); // require stealth plugin
puppeteer.use(StealthPlugin()); // enable stealth mode
const fs = require("fs");

async function getSearchResults(url, searchQuery){
    try {
        const browser = await puppeteer.launch({
            headless:true,
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' // specify the path of your Chrome browser
        });
        const page = await browser.newPage();
        await page.goto(url, {timeout: 60000});

        /***Do what ever you want here */
        await page.focus('textarea[name="q"]');
        await page.keyboard.type(searchQuery);
        await page.keyboard.press('Enter');

        await page.waitForNavigation({waitUntil:'networkidle2'});
        await page.screenshot({path:'query.png'})

        await browser.close();

        console.log('Success!')
    } catch (error) {
        console.log('Error: ', error.message);
    }
}

const url = 'https://google.com';
const searchQuery = 'Bitcoin Price';

getSearchResults(url, searchQuery);




