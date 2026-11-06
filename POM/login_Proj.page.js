class login_Proj{
    constructor(page){
        this.usernameTF = page.locator("//input[@name='email']")
        this.passwordTF = page.locator("//input[@name='password']")
        this.loginBTN = page.getByRole("button", {name:"Sign In"})
        
    }

    async login(un, ps){
       await this.usernameTF.fill(un)
       await page.waitForTimeout(50000)
       await this.passwordTF.fill(ps)
       await this.loginBTN.click()
    }
}
export default login_Proj