import { expect, Locator, Page } from "@playwright/test";
import { Navbar } from "../Components/navbar";

export class Common {
    readonly page: Page

    constructor(page: Page){
        this.page = page;
    }
    
    get navbar () { return new Navbar(this.page) };
}