import { expect, Locator, Page } from "@playwright/test";

export class Contact {
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    get root () { return this.page.locator('#exampleModal') }
    get email () { return this.root.locator('#recipient-email') }
    get name () { return this.root.locator('#recipient-name') }
    get message () { return this.root.locator('#message-text') }
    get close () { return this.root.locator('text=Close') };
    get crossClose () { return this.root.locator('[aria-label="Close"]') };
    get sendMessage () { return this.root.locator('button:has-text("Send message")') }
    get modalTitle () { return this.root.locator('#exampleModalLabel.modal-title') }

    async enterMessageDetails(email: string, name: string, message: string){
        await this.email.fill(email);
        await this.name.fill(name);
        await this.message.fill(message);
    }

    async cancelContact(control: string){
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

    async confirmSendMessage(success: boolean){
        let message: string;
        success ? message = 'Thank you for the message!' : message = 'foo';

        await this.sendMessage.click();
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