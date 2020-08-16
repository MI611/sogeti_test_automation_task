# sogeti_test_automation_task
Sogeti's Test automation task

# git init repository
Create directory locally and run
- git init
- git clone https://github.com/MI611/sogeti_test_automation_task.git

# Get node and npm if not already installed
https://www.npmjs.com/get-npm

# Install dev dependencies via npm install (should install selenium-webdriver, faker, chai, chai-http, mocha, mochawesome)
- cd sogeti_test_automation_task
- npm install

# Install globally drivers and libraries
- npm install -g mocha
- npm install -g chai
- npm install -g chai-http
- npm install -g mochawesome-report-generator
- npm install -g mochawesome

# Run single automated UI test in testcases folder sogeti_test_automation_task/testcases/ via node to see automated testing in browser with console logs for verification and steps
- node test_case_one.js
- node test_case_two.js
- node test_case_three.js

The chromedriver exec is in testcases folder to ensure that the UI tests are running

# To run single automated api test cases and get HTML report type, run the following in root project directory: 
- mocha --reporter mochawesome sogeti_test_automation_task/test/zippopotamapi_test.js
- mocha --reporter mochawesome sogeti_test_automation_task/test/zippopotamapidatadriven_test.js

# To run all tests at one time (ui tests have to be ignored in this case)
- mocha --reporter mochawesome

After running the command mochawesome, shows you where to find the test report HTML file. Copy that link and paste it into the browser to see the test report.

