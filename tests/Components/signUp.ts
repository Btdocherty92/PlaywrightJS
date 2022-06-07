import { expect, Locator, Page } from "@playwright/test";
import { BaseModal } from "../Bases/BaseModal";

export class SignUp extends BaseModal {
    readonly page: Page;

    // overwite base locators
    get root () { return this.page.locator('#signInModal') };
    get confirm () { return this.root.locator('button:has-text("Sign up")') };
    get messageSuccess () { return 'Sign up successful.' };
    get messageFailure() { return 'This user already exist.' };

    // locators specific to signUp modal
    get username () { return this.root.locator('#sign-username') };
    get password () { return this.root.locator('#sign-password') };
    
    constructor(page: Page){
        super(page);
        this.page = page;
    }

    async fillDetails(username: string, password: string){
        await this.username.fill(username);
        await this.password.fill(password);
    }
}