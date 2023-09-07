const puppeteer = require("puppeteer");

async function run (){
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();

    // Navigate to page
    await page.goto('http://google.com')

    // Extact All images
    const images = await page.$$eval("img", (elements) => 
        elements.map((element)=>({
            src: element.src,
            alt: element.alt
        }))
    );

    // Extarct All images
    const links = await page.$$eval("a", (elements)=> elements.map((element)=>({
        href: element.href,
        text: element.textContent
    })))

    // Outputs
    const imageCount = images.length;
    const linkCount = links.length;

    const output = JSON.stringify({
        images,
        links,
        imageCount,
        linkCount
    })

    console.log(output)

    await browser.close()


}


run()