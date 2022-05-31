import { expect, Locator, Page } from "@playwright/test";

export class SignUpPage {
    readonly page: Page;
    readonly root: Locator;
    readonly username: Locator;
    readonly pw: Locator;
    readonly close: Locator;
    readonly crossClose: Locator;
    readonly modalTitle: Locator;
    readonly signUpConfirm: Locator; 

    constructor(page: Page) {
        this.page = page;
        this.root = page.locator('#signInModal');
        this.username = this.root.locator('#sign-username');
        this.pw = this.root.locator('#sign-password');
        this.close = this.root.locator('text=Close');
        this.crossClose = this.root.locator('[aria-label="Close"]');
        this.signUpConfirm = this.root.locator('button:has-text("Sign up")');
        this.modalTitle = page.locator('#signInModalLabel.modal-title');
    }

    async fillDetails(username: string, password: string) {
        await this.username.fill(username);
        await this.pw.fill(password);
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