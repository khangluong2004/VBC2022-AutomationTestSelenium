const {By, Key, until} = require('selenium-webdriver');
const {WaitAndClick, WaitAndSelect} = require("./common.utils")

let AddNetworkInfo = async(driver, arr) => {
  const form_arr = await driver.findElements(By.xpath("//input[@class='form-field__input']"));
  for(let i = 0; i < 4; i++){
    await form_arr[i].sendKeys(arr[i]);
  }
  await driver.wait(until.elementIsEnabled(await driver.findElement(By.xpath("//button[text() = 'Save']"))), 25000);
  await driver.findElement(By.xpath("//button[text() = 'Save']")).click();
}

let ConnectMetamask = async(driver, handle) => {
  await driver.switchTo().window(handle[0]);
  await driver.get("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/popup.html#");
  await WaitAndClick(driver, 'xpath', "//button[text() = 'Next']");
  await WaitAndClick(driver, 'xpath', "//button[text() = 'Connect']");
  await driver.wait(until.elementLocated(By.xpath("//div[@class='icon-button__circle']")));
  await driver.switchTo().window(handle[1]);
}

let SwitchNetwork = async(driver, handle, network) => {
  await driver.switchTo().window(handle[0]);
  await driver.get("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#");
  await WaitAndSelect(driver, 'xpath', '//div[@data-testid="network-display"]', 'xpath', "//span[text() = '" + network + "']"); 
  await driver.switchTo().window(handle[1]);
}

let ConfirmMetamask = async(driver, handle, num_confirm) => {
  await driver.switchTo().window(handle[0]);
  for (let i = 0; i < num_confirm; i ++){
    let flag = false;
    let count = 0;
    while (flag === false && count < 5){
      try{
        await driver.get("chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/popup.html#");
        await driver.wait(until.elementLocated(By.xpath("//button[text() = 'Confirm']")), 2500);
        await driver.wait(until.elementIsEnabled(await driver.findElement(By.xpath("//button[text() = 'Confirm']"))), 1000);
        flag = true;
      } catch(e){
        count = count + 1
      }
    }
    try {
      await driver.findElement(By.xpath("//button[text() = 'Confirm']")).click();
    } catch(e){
      try {
        await driver.findElement(By.xpath("//button[text() = 'Reject']")).click()
      } catch(e){ }
    }
    try {
      await driver.wait(until.elementLocated(By.css("Null, set just for implicit wait")), 1000);
    } catch(e){}
  }
  await driver.switchTo().window(handle[1]);
}

let RegisterMetamask = async(driver, handle) => {
    let mnemonic = ['gym', 'lift', 'cruise', 'tonight', 'tool', 'wrong', 'lab', 'rice', 'truth', 'car', 'multiply', 'tilt'];
    let mbc_network = ["MBC", "https://test.vbchain.vn", "4444", "VBC"];
    let agd_network = ["AGD", "https://agridential.vbchain.vn/VBC001", "8888", "AGD"];
    
    await driver.switchTo().window(handle[0]);
    //Login Metamask manually
    await WaitAndClick(driver, 'xpath', '//button[text()="Get started"]');
    await WaitAndClick(driver, 'xpath', '//button[text()="No thanks"]');
    await WaitAndClick(driver, 'xpath', '//button[text()="Import wallet"]');
    
  
    // // After this you will need to enter you wallet details
  
    await driver.wait(until.elementLocated(By.id('import-srp__srp-word-0')), 15000);
    for (let i = 0; i < 12; i++){
        let inputs = await driver.findElement(By.id('import-srp__srp-word-' + i.toString()));
        inputs.sendKeys(mnemonic[i]);
    }
    
    const password = await driver.findElement(By.id('password'));
    const confirm = await driver.findElement(By.id('confirm-password'));
    password.sendKeys("khangluong26052oo412");
    confirm.sendKeys("khangluong26052oo412");
    await driver.findElement(By.id('create-new-vault__terms-checkbox')).click();
    const import_btn = await driver.findElement(By.xpath('//button[text()="Import"]'));
    await driver.wait(until.elementIsEnabled(import_btn), 15000);
    await import_btn.click();
    try {
      await driver.wait(until.elementLocated(By.css("Null, set just for implicit wait")), 20000);
    } catch(e){}
    await WaitAndClick(driver, 'xpath', '//button[text()="All done"]');
  
    await WaitAndClick(driver, "className", "box box--margin-top-1 box--margin-bottom-1 box--flex-direction-row typography chip__label typography--h7 typography--weight-normal typography--style-normal typography--color-text-alternative");
    await WaitAndClick(driver, "linkText", "Show/hide");
    await driver.wait(until.elementLocated(By.xpath('//div[@data-testid="advanced-setting-show-testnet-conversion"]')), 15000);
    const testnet_btn = (await driver.findElements(By.xpath("//div[@style='display: flex; width: 52px; align-items: center; justify-content: flex-start; position: relative; cursor: pointer; background-color: transparent; border: 0px; padding: 0px; user-select: none; -webkit-tap-highlight-color: transparent;']")))[4];
    await driver.executeScript("arguments[0].scrollIntoView()", testnet_btn);
    await testnet_btn.click();
    (await driver.findElements(By.xpath("//div[@class='tab-bar__tab__content']")))[5].click();
  
    await WaitAndClick(driver, "xpath", "//button[text()='Add a network']");
    await WaitAndClick(driver, "linkText", "Add a network manually");
    await AddNetworkInfo(driver, agd_network);
  
    await WaitAndClick(driver, "className", "box box--margin-top-1 box--margin-bottom-1 box--flex-direction-row typography chip__label typography--h7 typography--weight-normal typography--style-normal typography--color-text-alternative");
    await WaitAndClick(driver, "linkText", "Show/hide");
    (await driver.findElements(By.xpath("//div[@class='tab-bar__tab__content']")))[5].click();
    await WaitAndClick(driver, "xpath", "//button[text()='Add a network']");
    await WaitAndClick(driver, "linkText", "Add a network manually");
    await AddNetworkInfo(driver, mbc_network);
    await driver.switchTo().window(handle[1]);
}

module.exports = {
    AddNetworkInfo,
    ConnectMetamask,
    SwitchNetwork,
    ConfirmMetamask,
    RegisterMetamask
}