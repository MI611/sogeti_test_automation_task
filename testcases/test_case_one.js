const {Builder, By, Key, until} = require('selenium-webdriver');
const linkToOpen = "https://www.sogeti.com/";
const elementToHover = "//li[@data-levelname='level2']"; // Services li
const elementToClick = "//a[@href='https://www.sogeti.com/services/automation/']"; // Automation link
const elementText = "Automation";
const elementToCheck = "//li[@data-levelname='level2']//span";


(async function checkVisibilityOfPageAndText() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(linkToOpen);
        console.log('Opened ' + linkToOpen);
        await driver.sleep(2000);
        await navigateToPage(driver, elementToHover, elementToClick, elementText);
        await checkActiveLinks(driver, elementToCheck, elementToClick);
    } finally {
        await driver.quit();
    }
})();

let checkActiveLinks = async function(driver, hoverElement, elementToClick) {
    let level1MenuLink = await driver.findElement(By.xpath(hoverElement)).getCssValue("color");
    let level2MenuLink = await driver.findElement(By.xpath(elementToClick)).getCssValue("color");
    if (level1MenuLink == "rgba(255, 48, 76, 1)" && level2MenuLink == "rgba(255, 48, 76, 1)") {
        console.log("Links are selected!");
        console.log("Color of selection: " + level1MenuLink + " & " + level2MenuLink);
        console.log("Case successful...");
    }
    await driver.sleep(1000);
};

let navigateToPage = async function(driver, hoverElement, clickElement, pageTitle) {
    console.log('Moving mouse to hover element...');
    const act = driver.actions({bridge: true}); let elem=await driver.findElement(By.xpath(hoverElement)); await act.move({duration:3000,origin:elem,x:0,y:0}).perform();
    console.log('Element hovered...');
    await driver.sleep(500);
    console.log('Clicking element...');
    const actions = driver.actions({bridge: true}); let element=await driver.findElement(By.xpath(clickElement)); await actions.click(element).perform();
    console.log('Element clicked ...');
    console.log('Checking page title for: ' + pageTitle);
    await driver.wait(until.titleIs(pageTitle), 1000);
    console.log('Page title is: ' + await driver.getTitle());
    await driver.sleep(1000);
};


