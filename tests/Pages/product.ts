import { expect, Locator, Page } from "@playwright/test";
import { ProductContent } from "../Components/productContent";

export class Product {
    readonly page: Page

    constructor(page: Page){
        this.page = page;
    }
    
    get productContent () { return new ProductContent(this.page) };
}