const {By, Key, until} = require('selenium-webdriver');

let WaitAndClick = async(driver, method, locator) => {
    await driver.wait(until.elementLocated(By[method](locator)), 8000);
    let select_element = await driver.findElement(By[method](locator));
    await driver.executeScript("arguments[0].click()", select_element);
}

let WaitAndSelect = async(driver, method_select, locator_select, method_opt, locator_opt) => {
  await driver.wait(until.elementLocated(By[method_select](locator_select)), 8000);
  let select_element = await driver.findElement(By[method_select](locator_select));
  await driver.executeScript("arguments[0].scrollIntoView()", select_element);
  await driver.wait(until.elementIsVisible(select_element), 8000);
  await driver.executeScript("arguments[0].click()", select_element);
  await driver.wait(until.elementLocated(By[method_opt](locator_opt)), 10000);
  await driver.wait(until.elementIsEnabled(await select_element.findElement(By[method_opt](locator_opt))), 2000);
  await select_element.findElement(By[method_opt](locator_opt)).click();
}

module.exports = {
    WaitAndClick,
    WaitAndSelect
}