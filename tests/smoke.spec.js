
// import login_Proj from "../POM/login_Proj.page.js"
// import home_Proj from "../POM/home_Proj.page.js"
// import fs from "fs"
import {test,expect} from "@playwright/test"
let data_file = fs.readFileSync("C:/Users/SUSMITA/OneDrive/Desktop/PWProject/testdata/logininfo.json")
let data = JSON.parse(data_file)

//1. Verify Login
test("verify login", async({page})=>{
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

})

//2. Verify navigation to the main dashboard
// test("verify navigating to dashoard", async({page, loggedIn})=>{
//     let url = data.url
//     let un = data.email
//     let ps = data.password
//     let lp = new login_Proj(page)
//     await page.goto(url)
//     await page.waitForTimeout(4000)
//     await lp.login(un, ps)
//     await page.waitForTimeout(4000)
//     await console.log("Logged In Successfully")
// //verifying the profile page is coming before home page
//     await expect(page.getByText('No designation added')).toBeVisible();
//     await page.waitForTimeout(3000)

// //assert "Jobs For You" appeared in the page
//     await page.click("//button[text()='Jobs']")
//     await expect(page.getByText('Jobs For You')).toBeVisible();
//     await page.waitForTimeout(3000)
//     await console.log("Navigated to dashoard");

// })

test.only("verify navigating to dashboard", async ({ page, loggedIn }) => {

    // Login is already handled by the fixture.

    // Verify profile page appears
    await expect(page.getByText('No designation added')).toBeVisible();

    // Click Jobs
    await page.locator("//button[text()='Jobs']").click();

    // Verify Jobs For You
    await expect(page.getByText('Jobs For You')).toBeVisible();

    console.log("Navigated to dashboard successfully");
});


//3.------verify logout------------
test.only("verify logout", async({page})=>{
    let url = data.url
    let un = data.email
    let ps = data.password
    let lp = new login_Proj(page)
    await page.goto(url)
    await page.waitForTimeout(4000)
    await lp.login(un, ps)
    await page.waitForTimeout(4000)
    await console.log("Logged In Successfully")

//----logging out ---------------
    let hp =  new home_Proj(page)
    await hp.profileMenu.click()
    await page.waitForTimeout(2000)
    await hp.logout()
    await console.log("Logge OUT successfully")
})
