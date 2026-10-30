import {test,expect} from "@playwright/test"
import home_Proj from "../POM/home_Proj.page.js"
import login_Proj from "../POM/login_Proj.page.js"
import fs from "fs"

let data_file = fs.readFileSync("C:/Users/SUSMITA/OneDrive/Desktop/PWProject/testdata/logininfo.json")
let data = JSON.parse(data_file)

//1.Apply job, and verify job applied.
test("as professional,click on filtered job, logout verify, logout", async({page})=>{
    let url = data.url
    let un = data.email
    let ps = data.password
    let lp = new login_Proj(page)
    let hp = new home_Proj(page)
    await page.goto(url)
    await page.waitForTimeout(4000)
//---------sign in as professional--------------
    await lp.login(un, ps)
    await page.waitForTimeout(4000)

//verifying the profile page is coming before home page
    await expect(page.getByText('No designation added')).toBeVisible();
    await page.waitForTimeout(3000)

//assert "Jobs For You" appeared in the page
    await page.click("//button[text()='Jobs']")
    await expect(page.getByText('Jobs For You')).toBeVisible();
    await page.waitForTimeout(3000)
    await console.log("User Succesfully Logged Into the Home Page");

//------selecting the filters----------
    await hp.ayurveda.click()
    await hp.cardiology.click()
    await page.waitForTimeout(2000)
//--- selecting jobs based on 2 tests present in the same option ------------
    // let choice = await page.locator("//span[text()='BridgeHealth']/ancestor::article[@role='button']")
    let choice = page.locator("//article[@role='button']/descendant::span[@data-state='closed'][1]/../../../..");
    await expect(choice.first()).toBeVisible();
    await choice.first().click();
    await page.waitForTimeout(3000)
    //await page.getByRole("button", { name: "Apply Now" }).click();

    //Verify job applied
    await expect(page.getByText("Applied", { exact: true })).toBeVisible();
    let jobName = await page.locator("//h1").innerText();
    await console.log(`Applied to the Job: ${jobName}`);
    await console.log("Applied");

    
})

//2.Update a profile, log out, sign in again, and reopen the profile.
// test.only("update profile,logout,login go to profile, verify updates", async({page})=>{
//     let url = data.url
//     let un = data.email
//     let ps = data.password
//     let lp = new login_Proj(page)
//     let hp = new home_Proj(page)
//     await page.goto(url)
//     await page.waitForTimeout(2000)
// //---------sign in as professional--------------
//     await lp.login(un, ps)
//     await page.waitForTimeout(2000)})

//changing in profile
// await page.getByRole("button", {name: "Add Experience"}).click()
// await page.waitForTimeout(1000)
// page.on("dialog",()=>{
// await page.locator("//div[@class='relative bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[calc(100vh-15vh)] undefined flex flex-col animate-in fade-in zoom-in duration-200']")
