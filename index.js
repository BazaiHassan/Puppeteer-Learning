const puppeteer = require("puppeteer");
const fs = require("fs")

async function run() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    //Navigate to the website
    await page.goto('https://uk.yahoo.com/?p=us&guccounter=2&guce_referrer=aHR0cHM6Ly9jb25zZW50LnlhaG9vLmNvbS8&guce_referrer_sig=AQAAAEdJABbi9VQgceiqzDoen3VM2DzSCdiW6H91DmwOpNcM8MIVegMR4WHUt4UCdZJUjZd1TkrinkttqPVFUtRYsMlx1qUnhhe0cZSzjz-vPVAzOz20m4rXj9TQ66-cEOstnBRWstNkAoq-gdQ7laS2qfb-TdUaWgHB3jtQp-Qf8Wpv', { waitUntil: 'load', timeout: 0 });

    // //Wait for the cookie popup to appear
    // await page.waitForSelector('.consent-form', {visible: true});

    // //Click on the accept button
    // await page.click('button[type="submit"][name="agree"]');

    //SEO collecting data
    const title = await page.title();

    // Wait for the meta tags to be rendered
    await page.waitForSelector('meta[name="description"]');
    await page.waitForSelector('meta[name="keywords"]');

    const metaDescription = await page.$eval('meta[name="description"]', (element) => element.content);

    const metaKeywords = await page.$eval('meta[name="keywords"]', (element) => element.content);

    // Extract links
    const links = await page.$$eval("a", (elements) => elements.map((element) => ({
        href: element.href,
        text: element.textContent
    })));

    // Extract images
    const images = await page.$$eval("img", (elements) =>
        elements.map((element) => ({
            src: element.src,
            alt: element.alt
        }))
    );

    const imagesCount = images.length;
    const linksCount = links.length;

    // Prepare output format
    const outputData = {
        title,
        metaDescription,
        metaKeywords,
        images,
        links,
        imagesCount,
        linksCount
    };

    // Convert JSON to string
    const outputJSON = JSON.stringify(outputData);

    // write to a file
    fs.writeFileSync("output.json", outputJSON);

    await browser.close();


}

run()
