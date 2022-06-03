import { expect, Locator, Page } from "@playwright/test";

export class SignUp {
    readonly page: Page;

    get root () { return this.page.locator('#signInModal') };
    get username () { return this.root.locator('#sign-username') };
    get password () { return this.root.locator('#sign-password') };
    get close () { return this.root.locator('text=Close') };
    get crossClose () { return this.root.locator('[aria-label="Close"]') };
    get signUpConfirm () { return this.root.locator('button:has-text("Sign up")') };
    get modalTitle () { return this.root.locator('#signInModalLabel.modal-title') };
    
    constructor(page: Page){
        this.page = page;
    }

    async fillDetails(username: string, password: string){
        await this.username.fill(username);
        await this.password.fill(password);
    }

    async cancelSignUp(control: string) {
        if(control.toLowerCase() == "button"){
            await this.close.click();
        }
        else if(control.toLowerCase() == "cross"){
            await this.crossClose.click();
        }
        else {
            throw new console.error(`Control ${control} not a valid option`);
        }
        await this.isDialogOpen(false);
    }

    async confirmSignUp(success: boolean) {
        let message: string;
        success ? message = 'Sign up successful.' : message = 'This user already exist.';

        await this.signUpConfirm.click();
        this.page.once('dialog', dialog => {
            expect(dialog.message()).toBe(`${message}`)
            dialog.dismiss().catch(() => {});
        });
        success ? await this.isDialogOpen(false) : await this.isDialogOpen(true);
    }

    async isDialogOpen(isOpen: boolean) {
        isOpen ? await expect(this.modalTitle).toBeVisible() : await expect(this.modalTitle).not.toBeVisible();
    }

    async checkTitleText(expectedText: string) {
        await expect(this.modalTitle).toHaveText(expectedText);
    }
}