const {Builder, By, Key, until} = require('selenium-webdriver');
const linkToOpen = "https://www.sogeti.com/";
const elementToHover = "//li[@data-levelname='level2']"; // Services li
const elementToClick = "//a[@href='https://www.sogeti.com/services/automation/']"; // Automation link
const elementText = "Automation";
const scrollElementID = "99a12a58-3899-4fe1-a5c7-b9065fe635b0";

(async function checkVisibilityOfPageAndText() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(linkToOpen);
        await driver.sleep(2000);
        await hoverLinkAndClickToNavigate(driver, elementToHover, elementToClick, elementText);
        await driver.sleep(1000);
        await scrollToElement(driver, scrollElementID)
    } finally {
        await driver.quit();
    }
})();

let hoverLinkAndClickToNavigate = async function(driver, hoverElement, clickElement, pageTitle) {
    console.log('Moving mouse to hover element...');
    const act = driver.actions({bridge: true}); var elem=await driver.findElement(By.xpath(hoverElement)); await act.move({duration:3000,origin:elem,x:0,y:0}).perform();
    console.log('Element hovered...');
    await driver.sleep(500);
    console.log('Clicking element...');
    const actions = driver.actions({bridge: true}); var element=await driver.findElement(By.xpath(clickElement)); await actions.click(element).perform();
    console.log('Element clicked ...');
    console.log('Checking page title for: ' + pageTitle);
    await driver.wait(until.titleIs(pageTitle), 1000);
    console.log('Page title is: ' + await driver.getTitle());
    await driver.sleep(1000);
};

let scrollToElement = async function (driver, scrollElementWithID) {
    console.log('Scrolling to element...');
    const element = driver.findElement(By.id(scrollElementWithID));
    await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", element);
    await driver.sleep(5000);
    console.log('Scrolling done ...');
};

