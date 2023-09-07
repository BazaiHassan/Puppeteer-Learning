const puppeteer = require("puppeteer");

async function generateScreenShot(url, outputFile) {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(url)
        await page.screenshot({ path: outputFile })
        await browser.close();
        console.log("Success!")
    } catch (error) {
        console.log("Unable to generate screenshot")
        console.log(error.message)
    }
}

const url = 'https://zillow.com';
const outputFile = 'output.png';

generateScreenShot(url, outputFile);
