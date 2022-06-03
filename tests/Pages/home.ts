import { expect, Locator, Page } from "@playwright/test";
import { Products } from "../Components/products";

export class Home {
    readonly page: Page

    constructor(page: Page){
        this.page = page;
    }
    
    get products () { return new Products(this.page) };
}