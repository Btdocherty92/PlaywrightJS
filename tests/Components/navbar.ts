import { test, expect, Page } from '@playwright/test';

export class Navbar {
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    get root () { return this.page.locator('#navbarExample') };
    get home () { return this.root.locator('a:has-text("Home")')}
    get contact () { return this.root.locator('a:has-text("Contact")')}
    get aboutUs () { return this.root.locator('a:has-text("About us")')}
    get cart () { return this.root.locator('a:has-text("Cart")')}
    get logIn () { return this.root.locator('a:has-text("Log in")')}
    get signUp () { return this.root.locator('a:has-text("Sign up")')}

    async clickHome() { await this.home.click() };
    async clickContact() { await this.contact.click() };
    async clickAboutUs() { await this.aboutUs.click() };
    async clickCart() { await this.cart.click() };
    async clickLogIn() { await this.logIn.click() };
    async clickSignUp() { await this.signUp.click() };

    async goTo() { await this.page.goto('https://www.demoblaze.com/index.html') };
}