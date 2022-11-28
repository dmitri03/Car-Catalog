require('react');
require('react-dom');
require('dotenv').config();
const fs = require('fs');
const Puppeteer = require('puppeteer');  
(async() =>{
    try{
    const browser = await Puppeteer.launch({headless:false, slowMo:45, defaultViewport:null,args: ['--start-maximized']});
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(1000000);
    // await page.setViewport({width: 1920, height: 768});
    await page.goto('https://www.facebook.com');
    await page.waitForSelector('#email');
    await page.type('#email','2533323273');
    await page.type('#pass', 'Qwe123Dsa65400');
    await page.click('[type="submit"]');

    await page.waitForSelector('[role="navigation"]');
    const cookies = await page.cookies();
    console.info("cookies are:", cookies);
    fs.writeFile('fb-session-cookies.json', JSON.stringify(cookies,null,2), function(error){
        if (error){ throw error; console.error(error);}
        console.log("Completed write of cookies");
    });

    await page.goto('https://www.facebook.com/marketplace/seattle',{waitUntil:'load'});
    await page.waitForSelector('[role="navigation"]')
    await page.screenshot({ path: 'captureSeattle.png' });
    
    await page.goto('https://www.facebook.com/marketplace/chicago',{waitUntil:'load'});
    await page.waitForSelector('[role="navigation"]')
    await page.screenshot({ path: 'captureChicago.png' });
    
    await browser.close();
    }catch(error){
        console.error(error);
    }
})();
