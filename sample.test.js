const { Builder, By, until } = require('selenium-webdriver');

(async function testSauceDemo() {
    // Setup Chrome driver
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Step 1: Open the website
        await driver.get('https://www.saucedemo.com');

        // Step 2: Log in
        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');
        await driver.findElement(By.id('login-button')).click();

        // Step 3: Add a product to cart
        await driver.wait(until.elementLocated(By.id('add-to-cart-sauce-labs-backpack')), 5000);
        await driver.findElement(By.id('add-to-cart-sauce-labs-backpack')).click();

        // Step 4: Go to cart
        await driver.findElement(By.className('shopping_cart_link')).click();

        // Step 5: Proceed to checkout
        await driver.wait(until.elementLocated(By.id('checkout')), 5000);
        await driver.findElement(By.id('checkout')).click();

        // Step 6: Enter checkout info
        await driver.findElement(By.id('first-name')).sendKeys('John');
        await driver.findElement(By.id('last-name')).sendKeys('Doe');
        await driver.findElement(By.id('postal-code')).sendKeys('2000');
        await driver.findElement(By.id('continue')).click();

        // Step 7: Finish order
        await driver.wait(until.elementLocated(By.id('finish')), 5000);
        await driver.findElement(By.id('finish')).click();

        // Step 8: Assert confirmation message
        const msg = await driver.findElement(By.className('complete-header')).getText();
        if (msg === 'Thank you for your order!') {
            console.log('✅ Test Passed: Order completed successfully.');
        } else {
            console.log(`❌ Test Failed: Unexpected message -> "${msg}"`);
        }
    } catch (err) {
        console.error('❌ Error occurred during test:', err);
    } finally {
        // Close browser
        await driver.quit();
    }
})();
