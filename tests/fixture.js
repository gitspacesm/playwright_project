// import {test as base, expect} from "@playwright/test"
// import login_Proj from "../POM/login_Proj.page.js"
// import fs from "fs"

// let data_file = fs.readFileSync("C:/Users/SUSMITA/OneDrive/Desktop/PWProject/testdata/logininfo.json")
// let data = JSON.parse(data_file)

// export const test = base.extend({
//     loggedIn:async ({ page }, use) => {
//         const lp = new LoginPage(page);
//         let url = data.url
//         let un = data.email
//         let ps = data.password 
//         await lp.login(un, ps)
//         await use()
//     }
// })

// export {expect}



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
