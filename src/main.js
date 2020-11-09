const puppeteer = require("puppeteer");

async function webCrawler(targetUrl){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(targetUrl);

    console.log("loging in");
    //username
    await page.waitForSelector("#username");
    await page.type("#username", "417593");
    await page.click("#username_submit");
    //password
    await page.waitForSelector("#passwordInput");
    await page.type("#passwordInput", "Chipy-Chipy1");
    await page.click("#submitButton");
    
    console.log("loading magister...");
    await page.waitForSelector("#menu-agenda");
    await page.click("#menu-agenda");

    console.log("loading calender...");
    await page.waitForSelector("#afsprakenLijst");


    const element = await page.$(".head-bar h1");
    const txt = await (await element.getProperty('textContent')).jsonValue();
    console.log(txt);

    // let cur_url = await page.url();
    // console.log(cur_url);

    browser.close();
}

webCrawler("https://uc.magister.net");