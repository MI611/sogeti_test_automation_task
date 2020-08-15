const {Builder, By, Key, until} = require('selenium-webdriver');
const faker = require('faker');
const linkToOpen = "https://www.sogeti.com/";
const elementToHover = "//li[@data-levelname='level2']"; // Services li
const elementToClick = "//a[@href='https://www.sogeti.com/services/automation/']"; // Automation link
const elementText = "Automation";
const scrollElementID = "99a12a58-3899-4fe1-a5c7-b9065fe635b0";

const firstNameInputElementID = "4ff2ed4d-4861-4914-86eb-87dfa65876d8";
const lastNameInputElementID = "11ce8b49-5298-491a-aebe-d0900d6f49a7";
const emailInputElementID = "056d8435-4d06-44f3-896a-d7b0bf4d37b2";
const phoneInputElementID = "755aa064-7be2-432b-b8a2-805b5f4f9384";
const messageNameInputElementID = "88459d00-b812-459a-99e4-5dc6eff2aa19";
const agreeCheckboxElementInputName = "//input[@name='__field_123935']";
const submitButtonElementID = "06838eea-8980-4305-83d0-42236fb4d528";
const successMessageBoxClassName = "Form__Success__Message";

const requiredMessageFirstNameName = "//span[@data-f-linked-name='__field_123927']";
const requiredMessageLastName = "//span[@data-f-linked-name='__field_123938']";
const requiredMessageEmailName = "//span[@data-f-linked-name='__field_123928']";
const validationMessageEmailName = "//span[@data-f-linked-name='__field_123931']";
const requiredMessageMessageName = "//span[@data-f-linked-name='__field_123927']";
const requiredMessageCheckboxName = "//span[@data-f-linked-name='__field_123935']";


(async function goToAutomationPageContactInputDataAndSubmit() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get(linkToOpen);
        console.log('Opened ' + linkToOpen);
        await driver.sleep(2000);
        await hoverLinkAndClickToNavigate(driver, elementToHover, elementToClick, elementText);
        await driver.sleep(1000);
        await scrollToElement(driver, scrollElementID);
        //Generate data, input and submit
        let randomFirstName = await faker.name.firstName();
        let randomLastName = await faker.name.lastName();
        let randomEmail = await faker.internet.email();
        let randomPhone = await faker.phone.phoneNumber();
        let randomMessage = await faker.lorem.sentence();

        //extra
        await checkContactFormValidations(driver);

        await inputRandomGeneratedDataAndSubmitWithCheckbox(driver, randomFirstName, randomLastName, randomEmail, randomPhone, randomMessage);
        await driver.sleep(5000);

    } finally {
        await driver.quit();
    }
})();

let hoverLinkAndClickToNavigate = async function(driver, hoverElement, clickElement, pageTitle) {
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

let scrollToElement = async function (driver, scrollElementWithID) {
    console.log('Scrolling to element...');
    const element = driver.findElement(By.id(scrollElementWithID));
    await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", element);
    console.log('Scrolled to element...');
    await driver.sleep(5000);
};

let inputRandomGeneratedDataAndSubmitWithCheckbox = async function (driver, firstName, lastName, email, phone, message) {
    let firstNameElement = await driver.findElement(By.id(firstNameInputElementID));
    let lastNameElement = await driver.findElement(By.id(lastNameInputElementID));
    let emailElement = await driver.findElement(By.id(emailInputElementID));
    let phoneElement = await driver.findElement(By.id(phoneInputElementID));
    let messageElement =  await driver.findElement(By.id(messageNameInputElementID));
    let checkboxElement = await driver.findElement(By.xpath(agreeCheckboxElementInputName));
    let submitButtonElement = await driver.findElement(By.id(submitButtonElementID));

    console.log('Inserting data into inputs ...');
    await firstNameElement.sendKeys(firstName);
    console.log('Firstname set');
    await lastNameElement.sendKeys(lastName);
    console.log('Lastname set');
    await emailElement.sendKeys(email);
    console.log('Email set');
    await phoneElement.sendKeys(phone);
    console.log('Phone number set');
    await messageElement.sendKeys("(Employment test random test automation message): " + message);
    console.log('Message set');
    await checkboxElement.click();
    console.log('Checked checkbox');

    console.log('Fetching inserted data by get attribute value: ');
    console.log("FirstName: " + await firstNameElement.getAttribute('value'));
    console.log("LastName: " + await lastNameElement.getAttribute('value'));
    console.log("Email: " + await emailElement.getAttribute('value'));
    console.log("Phone: " + await phoneElement.getAttribute('value'));
    console.log("Message: " + await messageElement.getAttribute('value'));
    console.log("Checkbox checked: " + await checkboxElement.isSelected());

    await submitButtonElement.click();
    console.log("Clicked submit button and submitted form.");

    //Thank you for contacting us.
    //Form__Status
    //Form__Status__Message Form__Success__Message

    await driver.findElement(By.className(successMessageBoxClassName)).then(function(webElement) {
        console.log('Thank you message element exists');
        webElement.getText().then((text) => {
            console.log('Assert Thank you message: ' + text);
        });
        console.log('Contact form submit successful. Test case passed and successful');
    }, function(err) {
        if (err.state && err.state === 'no such element') {
            console.log('Thank you message element not found');
            console.log('Contact form submit not successful.');
        } else {
            console.log(err);
        }
    });
};

let checkContactFormValidations = async function (driver) {
    //This field is required.
    //Enter a valid email address.
    let submitButtonElement = await driver.findElement(By.id(submitButtonElementID));
    let emailElement = await driver.findElement(By.id(emailInputElementID));
    let validationFirstname = await driver.findElement(By.xpath(requiredMessageFirstNameName));
    let validationLastname = await driver.findElement(By.xpath(requiredMessageLastName));
    let validationEmail = await driver.findElement(By.xpath(requiredMessageEmailName));
    let validationMessage = await driver.findElement(By.xpath(requiredMessageMessageName));
    let validationCheckbox = await driver.findElement(By.xpath(requiredMessageCheckboxName));

    await submitButtonElement.click();
    console.log('Clicked submit button to check form validation');

    console.log('Checking validation messages: ');
    await validationFirstname.getText().then((text) => {
        console.log('Firstname validation: ' + text);
    });
    await validationLastname.getText().then((text) => {
        console.log('Lastname validation: ' + text);
    });
    await validationEmail.getText().then((text) => {
        console.log('Email validation: ' + text);
    });
    await validationMessage.getText().then((text) => {
        console.log('Message validation: ' + text);
    });
    await validationCheckbox.getText().then((text) => {
        console.log('Checkbox validation: ' + text);
    });

    //verify email validation for correct email address
    await emailElement.sendKeys("test");
    console.log('Email set');
    await submitButtonElement.click();
    console.log('Submit button clicked to trigger validation');
    await validationEmail.getText().then((text) => {
        console.log('Email validation: ' + text);
    });

};
