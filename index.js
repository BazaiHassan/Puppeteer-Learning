const puppeteer = require("puppeteer-extra"); // require puppeteer-extra
const StealthPlugin = require("puppeteer-extra-plugin-stealth"); // require stealth plugin
puppeteer.use(StealthPlugin()); // enable stealth mode
const fs = require("fs");

async function getSourceCode(url, outputData){
    try {
        const browser = await puppeteer.launch({
            headless:true,
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' // specify the path of your Chrome browser
        });
        const page = await browser.newPage();
        await page.goto(url, {timeout: 60000});

        const sourceCode = await page.content();

        fs.writeFileSync(outputData, sourceCode, 'utf-8');

        await browser.close();

        console.log('Success!')
    } catch (error) {
        console.log('Error: ', error.message);
    }
}

const url = 'https://zillow.com';
const outputData = 'source.html';

getSourceCode(url, outputData)
