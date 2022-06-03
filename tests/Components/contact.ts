import { expect, Locator, Page } from "@playwright/test";
import { BaseModal } from "../Bases/BaseModal";

export class Contact extends BaseModal {
    readonly page: Page;

    constructor(page: Page){
        super(page);
        this.page = page;
    }

    // overwrite base locators
    get root () { return this.page.locator('#exampleModal') }
    get confirm () { return this.root.locator('button:has-text("Send message")') }

    // locators specific to Contact modal
    get email () { return this.root.locator('#recipient-email') }
    get name () { return this.root.locator('#recipient-name') }
    get message () { return this.root.locator('#message-text') }

    async enterMessageDetails(email: string, name: string, message: string){
        await this.email.fill(email);
        await this.name.fill(name);
        await this.message.fill(message);
    }
}