//IMPORTANT - TEST CASE IS NOT VALID IN TEST REPORT. AUTOMATED UI TESTS HAVE TO BE EXECUTED WITH NODE IN TESTCASES FOLDER

/*
const chakram = require('chakram'),
    assert = require('chai').assert,
    expect = require('chakram').expect,
    should = require('chakram').should,
    addContext = require('mochawesome/addContext');

//Test Case 1
const {Builder, By, Key, until} = require('selenium-webdriver');
const linkToOpen = "https://www.sogeti.com/";
const elementToHover = "//li[@data-levelname='level2']"; // Services li
const elementToClick = "//a[@href='https://www.sogeti.com/services/automation/']"; // Automation link
const elementText = "Automation";
let assertPageTitle = "";
const elementToCheck = "//li[@data-levelname='level2']//span";


describe('Test Case 1', function () {
    it('should navigate to sogeti.com hover over Services, click automation and check for active links and content', function () {
        (async function checkVisibilityOfPageAndText() {
            let driver = await new Builder().forBrowser('chrome').build();
            try {
                await driver.get(linkToOpen);
                console.log('Opened ' + linkToOpen);
                await driver.sleep(2000);
                await hoverLink(driver, elementToHover);
                await driver.sleep(3000);
                await hoverLink(driver, elementToHover);
                await checkActiveLinks(driver, elementToCheck, elementToClick);
            } finally {
                await driver.quit();
            }
        })()
    });
});



let hoverLink = async function(driver, hoverElement) {
    console.log('Moving mouse to hover element...');
    const actions = driver.actions({bridge: true}); let elem=await driver.findElement(By.xpath(hoverElement)); await actions.move({duration:3000,origin:elem,x:0,y:0}).perform();
    console.log('Element hovered...');
    await driver.sleep(1000);
};

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

let clickLink = async function(driver, clickElement, pageTitle) {
    console.log('Clicking element...');
    const actions = driver.actions({bridge: true}); let element=await driver.findElement(By.xpath(clickElement)); await actions.click(element).perform();
    console.log('Element clicked ...');
    console.log('Checking page title for: ' + pageTitle);
    await driver.wait(until.titleIs(pageTitle), 1000);
    let titleOfPage = await driver.getTitle();
    console.log('Page title is: ' + titleOfPage);
    await driver.sleep(1000);
    expect(pageTitle).to.equal(titleOfPage);
    assert.equal(pageTitle, titleOfPage);
    return titleOfPage;
};
*/
