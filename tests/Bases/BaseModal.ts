import { expect, Locator, Page } from "@playwright/test";

export class BaseModal {
    readonly page: Page;

    constructor(page: Page){
        this.page = page;  
    }

    // Must be overwritten by any extending class
    // TODO: Consider changing this pattern as it's a tad hack-y
    get root () { return this.page.locator('') };
    get confirm() { return this.page.locator('') };

    get close () { return this.root.locator('text=Close') };
    get crossClose () { return this.root.locator('[aria-label="Close"]') };
    get modalTitle () { return this.root.locator('.modal-title') };

    async cancelModal(control: string){
        if(control.toLowerCase() == 'button'){
            await this.close.click();
        }
        else if(control.toLowerCase() == 'cross'){
            await this.crossClose.click();
        }
        else {
            throw new console.error(`Control ${control} not a valid option`);
        }
        await this.isDialogOpen(false);
    }

    async isDialogOpen(isOpen: boolean) {
        isOpen ? await expect(this.modalTitle).toBeVisible() : await expect(this.modalTitle).not.toBeVisible();
    }

    async checkTitleText(expectedText: string) {
        await expect(this.modalTitle).toHaveText(expectedText);
    }

    async confirmModal(success: boolean) {
        let message: string;
        success ? message = 'Sign up successful.' : message = 'This user already exist.';

        await this.confirm.click();
        this.page.once('dialog', dialog => {
            expect(dialog.message()).toBe(`${message}`)
            dialog.dismiss().catch(() => {});
        });
        success ? await this.isDialogOpen(false) : await this.isDialogOpen(true);
    }
}