const { By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const {WaitAndClick, WaitAndSelect} = require('../utils/index');

let page_link = "http://20.24.190.187:3006"

let LockNative = async(expect, address, driver, handle, Login, ConfirmMetamask, ConnectMetamask, SwitchNetwork, network, id, num_confirm = 1) => {
    // Test name: Lock Native token 1st time
    // Step # | name | target | value
    await driver.get(page_link);

    if (Login){
        await Login(driver);
    } else {
        if (ConnectMetamask){
            await ConnectMetamask(driver, handle);
        }
    }

    if (SwitchNetwork){
        await SwitchNetwork(driver, handle, network);
    }

    await driver.wait(until.elementLocated(By.id("receiverAddress")), 20000)
    
    // 12 | click | id=amountEther | 
    await WaitAndClick(driver, "id", "amountEther");
    // 13 | type | id=amountEther | 0.00001
    await driver.findElement(By.id("amountEther")).sendKeys(id)
    // 14 | click | css=.col-lg-5:nth-child(1) .small_input_transparent | 
    await WaitAndSelect(driver, "id", "fromNetwork", "xpath", "//option[@value = '"+ network +"']")
    
    
    // 16 | click | id=senderAddress | 

    await driver.wait(until.elementLocated(By.id("senderAddress")), 15000)
    const senderAddress = await driver.findElement(By.id("senderAddress"));
    await driver.executeScript("arguments[0].scrollIntoView()", senderAddress);
    await driver.wait(until.elementIsVisible(senderAddress), 15000);

    await driver.executeScript("arguments[0].click()", senderAddress);
    // 17 | type | id=senderAddress | address
    await driver.findElement(By.id("senderAddress")).sendKeys(address)
    // 18 | click | id=receiverAddress | 
    const receiverAddress = await driver.findElement(By.id("receiverAddress"));
    await driver.executeScript("arguments[0].click()", receiverAddress);
    // 19 | type | id=receiverAddress | address
    await driver.findElement(By.id("receiverAddress")).sendKeys(address)
    // 20 | click | css=.submit_bar | 
    const final_submit = await driver.findElement(By.css(".submit_bar"));
    await driver.executeScript("arguments[0].click()", final_submit);

    if (ConfirmMetamask){
        await ConfirmMetamask(driver, handle, num_confirm);
    }
    // 21 | assertText | id=btnStatus | Success!
    await driver.wait(until.elementLocated(By.id("btnStatus")), 20000);
    await driver.wait(until.elementIsVisible(await driver.findElement(By.id("btnStatus"))), 2000);
    assert(await driver.findElement(By.id("btnStatus")).getText() == expect)
    // 22 | assertElementPresent | css=.center:nth-child(8) > p | 
    {
      const elements = await driver.findElements(By.css(".center:nth-child(8) > p"))
      assert(elements.length)
    }
}

let UnlockToken = async(expect, token, address, driver, handle, Login, ConfirmMetamask, ConnectMetamask, SwitchNetwork, network, id, num_confirm = 2) => {
    // Test name: Unlock ERC20 1st time
    // Step # | name | target | value
    // 1 | open | http://localhost:3006/login | 
    let from_network = "AGD";
    if (network == "AGD"){
        from_network = "MBC"
    }
    
    await driver.get(page_link);

    if (Login){
        await Login(driver);
    } else {
        if (ConnectMetamask){
            await ConnectMetamask(driver, handle)
        }
    }
    
    if (SwitchNetwork){
        await SwitchNetwork(driver, handle, network);
    }
    
    // 10 | click | css=.large_div:nth-child(3) > .large_input_transparent | 
    if (token == "ERC20"){
        await WaitAndSelect(driver, "id", "currency", "xpath", "//option[@value = 'VMBC']");
        // 14 | click | id=amountEther | 
        await driver.findElement(By.id("amountEther")).click()
        // 15 | type | id=amountEther | 0.00001
        await driver.findElement(By.id("amountEther")).sendKeys(id)
    } else {
        await WaitAndSelect(driver, "id", "currency", "xpath", "//option[@value = 'ERC721 token']");
        // 14 | click | id=amountEther | 
        await WaitAndClick(driver, "id", "tokenId");
        // 15 | type | id=amountEther | 0.00001
        await driver.findElement(By.id("tokenId")).sendKeys(id)
    }
    
    await WaitAndSelect(driver, "css", ".large_div:nth-child(2) > .large_input_transparent", "xpath", "//option[@value = 'Draw']");


    
    // 14 | click | css=.col-lg-5:nth-child(1) .small_input_transparent |    
    await WaitAndSelect(driver, "id", "fromNetwork", "xpath", "//option[@value = '" + from_network + "']");
   
    // 15 | click | id=senderAddress | 

    await driver.wait(until.elementLocated(By.id("senderAddress")), 15000)
    const senderAddress = await driver.findElement(By.id("senderAddress"));
    await driver.executeScript("arguments[0].scrollIntoView()", senderAddress);
    await driver.wait(until.elementIsVisible(senderAddress), 2000);

    await driver.executeScript("arguments[0].click()", senderAddress);
    // 17 | type | id=senderAddress | address
    await driver.findElement(By.id("senderAddress")).sendKeys(address)
    // 18 | click | id=receiverAddress | 
    const receiverAddress = await driver.findElement(By.id("receiverAddress"));
    await driver.executeScript("arguments[0].click()", receiverAddress);
    // 19 | type | id=receiverAddress | address
    await driver.findElement(By.id("receiverAddress")).sendKeys(address)
    // 20 | click | css=.submit_bar | 
    const final_submit = await driver.findElement(By.css(".submit_bar"));
    await driver.executeScript("arguments[0].click()", final_submit);

    if (ConfirmMetamask){
        await ConfirmMetamask(driver, handle, num_confirm);        
    } 
        // 21 | assertText | id=btnStatus | Success!
        await driver.wait(until.elementLocated(By.id("btnStatus")), 20000);
        await driver.wait(until.elementIsVisible(await driver.findElement(By.id("btnStatus"))), 2000)
        assert(await driver.findElement(By.id("btnStatus")).getText() == expect)
    
}

let LockToken = async(expect, token, address, driver, handle, Login, ConfirmMetamask, ConnectMetamask, SwitchNetwork, network, id, num_confirm = 2) => {
    // Test name: Lock ERC20 1st time
    // Step # | name | target | value
    await driver.get(page_link);

    if (Login){
        await Login(driver);
    } else {
        if (ConnectMetamask){
            await ConnectMetamask(driver, handle)
        }
    }

    if (SwitchNetwork){
        await SwitchNetwork(driver, handle, network);
    }

    await driver.wait(until.elementLocated(By.id("receiverAddress")), 15000);

    await WaitAndSelect(driver, 'css', ".large_div:nth-child(2) > .large_input_transparent", "xpath", "//option[@value = 'Deposit']");
    if(token == "ERC20"){
        // 10 | click | css=.large_div:nth-child(3) > .large_input_transparent | 
        await WaitAndSelect(driver, "id", "currency", "xpath", "//option[@value = 'VMBC']");
        
        // 12 | click | id=amountEther | 
        await driver.findElement(By.id("amountEther")).click()
        // 13 | type | id=amountEther | 0.00001
        await driver.findElement(By.id("amountEther")).sendKeys(id);
    } else {
        // 10 | click | css=.large_div:nth-child(3) > .large_input_transparent | 
        await WaitAndSelect(driver, "id", "currency", "xpath", "//option[@value = 'ERC721 token']");
        // 12 | click | 
        await driver.findElement(By.id("tokenId")).click()
        // 13 | type | 
        await driver.findElement(By.id("tokenId")).sendKeys(id);
    }
    


    // 14 | click | css=.col-lg-5:nth-child(1) .small_input_transparent |   
    await WaitAndSelect(driver, "id", "fromNetwork", "xpath", "//option[@value = '"+ network +"']")
    // 16 | click | id=senderAddress | 

    await driver.wait(until.elementLocated(By.id("senderAddress")), 15000)
    const senderAddress = await driver.findElement(By.id("senderAddress"));
    await driver.executeScript("arguments[0].scrollIntoView()", senderAddress);
    await driver.wait(until.elementIsVisible(senderAddress), 5000);

    await driver.executeScript("arguments[0].click()", senderAddress);
    // 17 | type | id=senderAddress | address
    await senderAddress.sendKeys(address)
    // 18 | click | id=receiverAddress | 
    const receiverAddress = await driver.findElement(By.id("receiverAddress"));
    await driver.executeScript("arguments[0].click()", receiverAddress);
    // 19 | type | id=receiverAddress | address
    await receiverAddress.sendKeys(address)
    // 20 | click | css=.submit_bar | 
    const final_submit = await driver.findElement(By.css(".submit_bar"));
    await driver.executeScript("arguments[0].click()", final_submit);

    if (ConfirmMetamask){
        await ConfirmMetamask(driver, handle, num_confirm);        
    } 
        // 21 | assertText | id=btnStatus | Success!
        await driver.wait(until.elementLocated(By.id("btnStatus")), 20000);
        await driver.wait(until.elementIsVisible(await driver.findElement(By.id("btnStatus"))), 2000)
        assert(await driver.findElement(By.id("btnStatus")).getText() == expect)
    
    
}

let UnlockNative = async(expect, address, driver, handle, Login, ConfirmMetamask, ConnectMetamask, SwitchNetwork, network, id, num_confirm = 1) => {
    // Test name: Unlock Native token 1st time
    // Step # | name | target | value
    // 1 | open | http://localhost:3006/login | 
    await driver.get(page_link);
    let from_network = "AGD";
    if (network == "AGD"){
        from_network = "MBC"
    }

    if (Login){
        await Login(driver);
    } else {
        if (ConnectMetamask){
            await ConnectMetamask(driver, handle)
        }
    }
    
    if (SwitchNetwork){
        await SwitchNetwork(driver, handle, network);
    }
    
    // 10 | click | css=.large_div:nth-child(3) > .large_input_transparent | 
    await WaitAndSelect(driver, "id", "currency", "xpath", "//option[@value = 'MBC']");
    // 12 | click | css=.large_div:nth-child(2) > .large_input_transparent | 
    await WaitAndSelect(driver, "css", ".large_div:nth-child(2) > .large_input_transparent", "xpath", "//option[@value = 'Draw']");


    // 14 | click | id=amountEther | 
    await driver.findElement(By.id("amountEther")).click()
    // 15 | type | id=amountEther | 0.00001
    await driver.findElement(By.id("amountEther")).sendKeys(id)
    
    // 14 | click | css=.col-lg-5:nth-child(1) .small_input_transparent |    
    await WaitAndSelect(driver, "id", "fromNetwork", "xpath", "//option[@value = '" + from_network + "']");
  

    
    // 16 | click | id=senderAddress | 

    await driver.wait(until.elementLocated(By.id("senderAddress")), 15000)
    const senderAddress = await driver.findElement(By.id("senderAddress"));
    await driver.executeScript("arguments[0].scrollIntoView()", senderAddress);
    await driver.wait(until.elementIsVisible(senderAddress), 2000);

    await driver.executeScript("arguments[0].click()", senderAddress);
    // 17 | type | id=senderAddress | address
    await driver.findElement(By.id("senderAddress")).sendKeys(address)
    // 18 | click | id=receiverAddress | 
    const receiverAddress = await driver.findElement(By.id("receiverAddress"));
    await driver.executeScript("arguments[0].click()", receiverAddress);
    // 19 | type | id=receiverAddress | address
    await driver.findElement(By.id("receiverAddress")).sendKeys(address)
    // 20 | click | css=.submit_bar | 
    const final_submit = await driver.findElement(By.css(".submit_bar"));
    await driver.executeScript("arguments[0].scrollIntoView()", final_submit);
    await driver.executeScript("arguments[0].click()", final_submit);

    if (ConfirmMetamask){
        await ConfirmMetamask(driver, handle, num_confirm);
    }
    // 21 | assertText | id=btnStatus | Success!
    await driver.wait(until.elementLocated(By.id("btnStatus")), 20000);
    await driver.wait(until.elementIsVisible(await driver.findElement(By.id("btnStatus"))), 2000);
    assert(await driver.findElement(By.id("btnStatus")).getText() == expect)
    // 22 | assertElementPresent | css=.center:nth-child(8) > p | 
    {
      const elements = await driver.findElements(By.css(".center:nth-child(8) > p"))
      assert(elements.length)
    }
}

module.exports = {
    LockToken,
    LockNative,
    UnlockToken,
    UnlockNative
}