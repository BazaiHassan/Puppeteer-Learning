const puppeteer = require("puppeteer");

async function run() {
    // Launch the browser instance
    const browser = await puppeteer.launch({
        headless: false
    });

    const page = await browser.newPage();

    await page.goto("https://mlmond.com")
    const title = await page.title();
    console.log(title);

    // Scrap all h1 tags
    const heading = await page.$eval('h1', (element) => element.textContent);
    console.log(heading);

    await page.screenshot({ path: 'mlmond.png' });

    await page.pdf({ path: 'mlmond.pdf' });

    await browser.close();
}

run();