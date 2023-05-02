import{test,expect} from '@playwright/test'
const locate = require('../../locators/para_bank')
const data = require('../../testData/para_bandData')
const common = require('../../Common/common')
const {config} =require('../../../config/envConfig')
const{uiURL}=config[config.env].web 


test.describe('UI testing in Playwright',()=>{
    test('Register into Para Bank', async({page})=>{
       // await page.goto('https://parabank.parasoft.com/');

       const randomString =await test.step('Create invitation link', async () => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789(_@#%&*$){}-[]==:';
        let charactersLength = characters.length;
        for (let i = 0; i < 5; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      })
        await page.goto(uiURL); 
        await page.getByText(locate.Register.reg_lnk).click();
        await page.waitForTimeout(3000);
        await page.locator(locate.Register.fName_txt).fill(data.reg.fName);
        await page.locator(locate.Register.lName_txt).fill(data.reg.Lname);
        await page.locator(locate.Register.addr_txt).fill(data.reg.Add);
        await page.locator(locate.Register.city_txt).fill(data.reg.City);
        await page.locator(locate.Register.state_txt).fill(data.reg.State);
        await page.locator(locate.Register.zip_txt).fill(data.reg.zip);
        await page.locator(locate.Register.phone_txt).fill(data.reg.phone);
        await page.locator(locate.Register.ssn_txt).fill(data.reg.ssn);
        await page.locator(locate.Register.usd_txt).fill(data.reg.username+randomString);
        await page.locator(locate.Register.pass_txt).fill(data.reg.password);
        await page.locator(locate.Register.confPass_txt).fill(data.reg.confPassword);
        await page.locator(locate.Register.reg_btn).click();
        await page.waitForTimeout(3000);
        let RegMessage =await page.locator('//h1//following-sibling::p').innerText();
         expect(RegMessage).toBe('Your account was created successfully. You are now logged in.');
         await page.waitForTimeout(4000);
    })
    
    test('Login into Para Bank with Valid Credentials',async({page})=>{
        await page.goto(uiURL); 
        await page.locator(locate.login.usd_txt).fill(data.login.usd);
        await page.waitForTimeout(1000);
        await page.locator(locate.login.pwd_txt).fill(data.login.pass);
        await page.waitForTimeout(1000);
        await page.click(locate.login.login_btn);
        await page.waitForTimeout(3000);
        let accTitle = await page.locator('h1[class=title]').innerText();
        console.log(accTitle);
        expect(accTitle).toBe('Accounts Overview')
    })
    
    test('Login into Para Bank with Invalid Credentials',async({page})=>{
        await page.goto(uiURL); 
        await page.locator(locate.login.usd_txt).fill(data.login.usd);
        await page.waitForTimeout(1000);
        await page.locator(locate.login.pwd_txt).fill(data.login.pass);
        await page.waitForTimeout(1000);
        await page.click(locate.login.login_btn);
        await page.waitForTimeout(3000);
        let ErrorMsg = await page.locator('//h1//following-sibling::p').innerText();
        expect(ErrorMsg).toBe('The username and password could not be verified.');
    })
})
