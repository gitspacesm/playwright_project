import { test as base, expect } from "@playwright/test";
import LoginPage from "../POM/login_Proj.page.js";
import fs from "fs";

const dataFile = fs.readFileSync("C:/Users/SUSMITA/OneDrive/Desktop/PWProject/testdata/logininfo.json","utf-8")
const data = JSON.parse(dataFile);

export const test = base.extend({
    loggedIn: async ({ page }, use) => {
        const lp = new LoginPage(page);

        await page.goto(data.url);
        await lp.login(data.email, data.password);

        await expect(page.getByText('No designation added')).toBeVisible();
        console.log("Logged In Successfully");

        await use();

        
    }
});

export { expect };
