const puppeteer = require("puppeteer");

async function registerLPU(targetUrl){
    global.browser = await puppeteer.launch();
    global.page = await browser.newPage();
    await page.setViewport({
        width: 1000,
        height: 1800
    });
    
    await page.goto("https://uc.magister.net");

    console.log("loging in");
    //username
    await global.page.waitForSelector("#username");
    await global.page.type("#username", "417593");
    await global.page.click("#username_submit");
    //password
    await global.page.waitForSelector("#passwordInput");
    await global.page.type("#passwordInput", "Chipy-Chipy1");
    await global.page.click("#submitButton");
    
    console.log("loading magister...");
    await global.page.waitForSelector("#menu-agenda");
    await global.page.click("#menu-agenda");

    console.log("loading calender...");
    await global.page.waitForSelector("#afsprakenLijst");

    //clicking first lpu
    console.log("clicking on first lpu");
    await clickLPU(680);

    // const element = await page.$(".head-bar h1 span");
    // const txt = await (await element.getProperty('textContent')).jsonValue();
    // console.log(await page.content());

    let cur_url = await global.page.url();
    console.log(cur_url);

    browser.close();
}
async function clickLPU(yPos){
    while(await global.page.url() === "https://uc.magister.net/magister/#/agenda"){
        await global.page.mouse.click(415, yPos);
        await global.page.waitForTimeout(800);
        await global.page.mouse.click(415, yPos);
        await global.page.waitForTimeout(800);
        await global.page.mouse.click(415, yPos);

        await global.page.waitForTimeout(500);
    }
}

registerLPU();