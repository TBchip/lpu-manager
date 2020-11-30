const puppeteer = require("puppeteer");
const magisterCredentials = require("./magisterCredentials.json")

async function registerLPUs(LPUYPositions, linux){
    try{
        // const browser = await puppeteer.launch({
        //         headless: true,
        //         executablePath: '/usr/bin/chromium-browser',
        //         args: ['--no-sandbox', '--disable-setuid-sandbox']
        //     });
        const browser = await puppeteer.launch();

        const page = await browser.newPage();
        await page.setViewport({
            width: 1000,
            height: 1800
        });
        await page.goto("https://uc.magister.net/");

        console.log("Logging in...");
        //username
        await page.waitForSelector("#username");
        await page.type("#username", magisterCredentials.username);
        await page.click("#username_submit");
        //password
        await page.waitForSelector("#passwordInput");
        await page.type("#passwordInput", magisterCredentials.password);
        await page.click("#submitButton");
        
        await page.waitForSelector("#menu-agenda");
        await page.click("#menu-agenda");

        //clicking first lpu
        for(let i = 0; i < LPUYPositions.length; i++){
            await page.waitForSelector("#afsprakenLijst");

            console.log(`Loading ${i+1}th lpu register page...`);
            await openLPURegisterPage(page, LPUYPositions[i]);
        
            console.log(`Registering for the ${i+1}th lpu...`)
            await RegisterBottomLPU(page);
        
            await page.waitForSelector("#menu-agenda");
            await page.click("#menu-agenda");
        }

        console.log("Registered for all lpu's")

        browser.close();

        return true;
    }catch{
        return false;
    }
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