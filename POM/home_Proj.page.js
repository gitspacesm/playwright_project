class home_Proj{
    constructor(page){
        this.searchJobTF= page.locator("//input[@placeholder='Search by title, location or company']")
        this.appliedJobsBTN = page.getByRole("button", {name:"Applied Jobs"})
        this.jobsIconBTN = page.getByRole("button", {name:"Jobs"})
        this.filter = page.locator("//div[@class=' p-5 space-y-4 overflow-y-auto hide-scrollbar']")
        this.ayurveda = this.filter.getByText("Ayurveda", { exact: true });
        this.cardiology = this.filter.getByText("Cardiology", { exact: true });
        this.ent = this.filter.getByText("ENT", { exact: true });
        this.profileMenu = page.locator("//button[@class='text-primary-600 hover:text-primary-900 hover:bg-primary-200 cursor-pointer p-1.5 rounded-full']")
        this.profileMenuOption = this.profileMenu.locator("//div[@class='shrink-0 px-4 pb-4 pt-5']/parent::aside")
        this.logoutBTN = this.profileMenuOption.locator("//div[@class='shrink-0 border-t border-gray-100 p-3']/button/font")
    }

    async searchJobs(){
        await this.searchJobTF.click()
        await this.appliedJobsBTN.click()
        await this.jobsIconBTN.click()
    }

    async selectFilter() {
        await this.ayurveda.scrollIntoViewIfNeeded();
        await this.ayurveda.click();

        await this.cardiology.scrollIntoViewIfNeeded();
        await this.cardiology.click();

        await this.ent.scrollIntoViewIfNeeded();
        await this.ent.click();
    }

    async logout(){
        await this.profileMenu.click()
        await page.waitForTimeout(2000)
        await this.logoutBTN.click()
    }

}
export default home_Proj