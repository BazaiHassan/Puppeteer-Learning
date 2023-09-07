const puppeteer = require("puppeteer-extra"); // require puppeteer-extra
const StealthPlugin = require("puppeteer-extra-plugin-stealth"); // require stealth plugin
puppeteer.use(StealthPlugin()); // enable stealth mode
const fs = require("fs");

async function interceptRequest(url) {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' // specify the path of your Chrome browser
        });
        const page = await browser.newPage();
        
        /***Do what ever you want here */
        await page.setRequestInterception(true);

        page.on('request', (interceptedRequest) => {
            if (interceptedRequest.url().endsWith('.png')) {
                interceptedRequest.abrot();
                console.log("Request Abrot :(")
            } else {
                interceptedRequest.headers({
                    'seacretKey':'ThisIsTest'
                });
                interceptedRequest.continue();
                console.log("Request Continued with headers!")
            }
        })

        await page.goto(url);

        //await browser.close();

        console.log('Success!')
    } catch (error) {
        console.log('Error: ', error.message);
    }
}

const url = 'https://mlmond.com';

interceptRequest(url);




