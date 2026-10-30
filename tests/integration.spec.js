import {test,expect} from "@playwright/test"
import home_Proj from "../POM/home_Proj.page.js"
import login_Proj from "../POM/login_Proj.page.js"
import fs from "fs"

let data_file = fs.readFileSync("C:/Users/SUSMITA/OneDrive/Desktop/PWProject/testdata/logininfo.json")
let data = JSON.parse(data_file)

//Verify Job Search → Job Details
test("Verify Job search with details", async({page})=>{
    let url = data.url
    let un = data.email
    let ps = data.password
    let lp = new login_Proj(page)
    let hp = new home_Proj(page)
    await page.goto(url)
    await page.waitForTimeout(4000)
    await lp.login(un, ps)
    await page.waitForTimeout(4000)
    await console.log("Logged In Successfully")
     await expect(page.getByText('No designation added')).toBeVisible();
    await page.waitForTimeout(3000)

//assert "Jobs For You" appeared in the page
    await page.click("//button[text()='Jobs']")
    await expect(page.getByText('Jobs For You')).toBeVisible();
    await page.waitForTimeout(3000)
    await console.log("User Succesfully Logged Into the Home Page");

   await hp.ent.click()
   await page.waitForTimeout(2000)
   
await page.locator("//h3[text()='ENT Specialist']").click();
let entText = page.locator("//div[@class='rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 font-medium text-primary-700']").filter({ hasText: 'ENT' });

await expect(entText).toBeVisible();
console.log("Job details matched");
await page.waitForTimeout(2000)

})