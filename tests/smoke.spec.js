import { test, expect } from "../tests/fixture.js";
import fs from "fs";

import login_Proj from "../POM/login_Proj.page.js";
import home_Proj from "../POM/home_Proj.page.js";

// Reading test data
let data_file = fs.readFileSync(
    "C:/Users/SUSMITA/OneDrive/Desktop/PWProject/testdata/logininfo.json",
    "utf8"
);
let data = JSON.parse(data_file);


// 1. Verify Login
test("Verify Login", async ({ page }) => {

    let url = data.url;
    let un = data.email;
    let ps = data.password;

    let lp = new login_Proj(page);
    await page.goto(url);
    await lp.login(un, ps);

    // Verify successful login
    await expect(page.getByText("No designation added")).toBeVisible();
    console.log("Logged In Successfully");

});


// 2. Verify Navigation to Dashboard
test("Verify Navigation to Dashboard", async ({ page, loggedIn }) => {
    // Verify profile page
    await expect(page.getByText("No designation added")).toBeVisible();
    // Click Jobs
    await page.locator("//button[text()='Jobs']").click();
    // Verify Jobs For You
    await expect(page.getByText("Jobs For You")).toBeVisible();
    console.log("Navigated to Dashboard Successfully");

});


// 3. Verify Logout
test("Verify Logout", async ({ page }) => {

    let url = data.url;
    let un = data.email;
    let ps = data.password;

    let lp = new login_Proj(page);
    let hp = new home_Proj(page);
    await page.goto(url);
    // Login
    await lp.login(un, ps);
    await expect(page.getByText("No designation added")).toBeVisible();
    console.log("Logged In Successfully");
    // Logout
    await hp.logout();
    // Verify logout
    await hp.logout();
    await expect(page.getByText("Login")).toBeVisible();
    console.log("Logged Out Successfully");
});
