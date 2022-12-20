const {By, Key, until} = require('selenium-webdriver');

let page_link = "http://20.24.190.187:3006"
let Login = async(driver) => {
    // 1 | open | http://localhost:3006/login | 
    await driver.get(page_link + "/login")
    // 2 | runScript | window.localStorage.clear() | 
    await driver.executeScript("window.localStorage.clear()")
    // 3 | waitForElementEditable | id=lgUsername | 30000
    await driver.wait(until.elementLocated(By.id("lgUsername")), 20000);
    await driver.wait(until.elementIsEnabled(await driver.findElement(By.id("lgUsername"))), 6000);
    // 4 | setWindowSize | 1070x824 | 
    await driver.manage().window().maximize()
    // 5 | click | id=lgUsername | 
    await driver.findElement(By.id("lgUsername")).click()
    // 6 | type | id=lgUsername | testtest
    await driver.findElement(By.id("lgUsername")).sendKeys("testtest")
    // 7 | click | id=lgPassword | 
    await driver.findElement(By.id("lgPassword")).click()
    // 8 | type | id=lgPassword | 1234567
    await driver.findElement(By.id("lgPassword")).sendKeys("1234567")
    
    await driver.wait(until.elementLocated(By.css(".submit_bar")), 100000)
    const submit_bar = await driver.findElement(By.css(".submit_bar"));
    await driver.executeScript("arguments[0].scrollIntoView()", submit_bar);
    await driver.wait(until.elementIsVisible(submit_bar), 100000);
    // 9 | click | css=.submit_bar | 
    await driver.executeScript("arguments[0].click()", submit_bar);
}

module.exports = {
    Login
}