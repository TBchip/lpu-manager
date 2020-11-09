const puppeteer = require("puppeteer");

async function registerLPUs(LPUYPositions){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1000,
        height: 1800
    });
    await page.goto("https://uc.magister.net/");

    console.log("Loging in");
    //username
    await page.waitForSelector("#username");
    await page.type("#username", "417593");
    await page.click("#username_submit");
    //password
    await page.waitForSelector("#passwordInput");
    await page.type("#passwordInput", "Chipy-Chipy1");
    await page.click("#submitButton");
    
    await page.waitForSelector("#menu-agenda");
    await page.click("#menu-agenda");

    await page.waitForSelector("#afsprakenLijst");

    //clicking first lpu
    for(let i = 0; i < LPUYPositions.length; i++){
        console.log();
        console.log(`Loadin ${i+1}th lpu register page`);
        await openLPURegisterPage(page, LPUYPositions[i]);
    
        console.log(`Registering for the ${i+1}th lpu`)
        await RegisterBottomLPU(page);
    }
    console.log();

    console.log("Registered for all lpu's")

    browser.close();
}
async function openLPURegisterPage(page, yPos){
    while(await page.url() === "https://uc.magister.net/magister/#/agenda"){
        await page.mouse.click(415, yPos);
        await page.waitForTimeout(800);
        await page.mouse.click(415, yPos);
        await page.waitForTimeout(800);
        await page.mouse.click(415, yPos);

        await page.waitForTimeout(500);
    }
}
async function RegisterBottomLPU(page){
    const kwtContainerRect = await getElementRect(page, await page.$(".kwt-widget"));
    const bottomLPUPos = kwtContainerRect.top + kwtContainerRect.height - 70;

    let registeredChecker = await page.$(":not(.ng-hide).text-button");
    let registeredCheckerTXT = await (await registeredChecker.getProperty('textContent')).jsonValue();
    do{
        await page.mouse.click(415, bottomLPUPos);
        await page.waitForTimeout(800);

        registeredChecker = await page.$(":not(.ng-hide).text-button");
        registeredCheckerTXT = await (await registeredChecker.getProperty('textContent')).jsonValue();

    } while(registeredCheckerTXT !== "uitschrijven KWT");
}

async function getElementRect(page, element){
    const rect = await page.evaluate((element) => {
        const {x, y, width, height, top, left, bottom, right} = element.getBoundingClientRect();
        return {x, y, width, height, top, left, bottom, right};
    }, element);

    return rect;
}

module.exports.registerLPUs = registerLPUs;