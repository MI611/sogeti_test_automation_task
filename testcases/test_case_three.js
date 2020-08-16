const {Builder, By, Key, until} = require('selenium-webdriver');
const linkToOpen = "https://www.sogeti.com/";
const elementToClick = "sprite-header sprite-globe";
const elementCountryListLinks = "//div[@class='country-list']//a";

(async function checkWorldwideLinksOfSogetiPage() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(linkToOpen);
        console.log('Opened ' + linkToOpen);
        await driver.sleep(1000);
        await checkMultipleLinksWorking(driver);
        await driver.sleep(2000);
    } finally {
        await driver.quit();
    }
})();

let checkMultipleLinksWorking = async function(driver) {

    const actions = driver.actions({bridge: true}); let element=await driver.findElement(By.className(elementToClick)); await actions.click(element).perform();
    console.log("Clicked Worldwide link/box to see Sogeti country links...");

    let countryList = await driver.findElements(By.xpath(elementCountryListLinks));
    console.log(countryList);
    let counterOfWorkingLinks = 0;
    for (let country = 0; country < countryList.length; country++) {
        let c = countryList[country];
        console.log("Checking link with index: " + country);
        console.log(c);
        const actions = await driver.actions({bridge: true}); await actions.click(c).perform();
        console.log("Link clicked...");
        console.log("Switching to other tab to verify url...");
        let tabs = await driver.getAllWindowHandles();
        await driver.switchTo().window(tabs[country+1]);
        await driver.getTitle().then((pagetitle) => {
            console.log("Page title: " + pagetitle);
        });
        await driver.getCurrentUrl().then((pageurl) => {
            console.log("Url of opened tab: " + pageurl);
            let linkUrl = c.getAttribute('href').then((link) => {
                if (link == pageurl) {
                    console.log("Url of link: " + link + " equals url of opened page: " + pageurl);
                    console.log("Link is working! ...");
                    counterOfWorkingLinks += 1 ;
                }
            });
        });
        await driver.sleep(500);
        await driver.switchTo().window(tabs[0]);
        console.log("back to initial page");
        await driver.sleep(500);
        console.log('...................................');
    }
    if (counterOfWorkingLinks == countryList.length) {
        console.log(counterOfWorkingLinks + " out of " + countryList.length + " links are working!");
        console.log("Test Case successful!");
        console.log("Test Case passed!");
    } else {
        console.log(countryList.length - counterOfWorkingLinks + " out of " + countryList.length + " links are not working");
    }
};


