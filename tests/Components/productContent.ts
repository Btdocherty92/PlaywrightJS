import { test, expect, Page } from '@playwright/test';

export class ProductContent {
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    get root () { return this.page.locator('.product-content') };
    get productName() { return this.root.locator('h2.name') };
    get price() { return this.root.locator('h3.price-container') };
    get description() { return this.root.locator('#more-information >> p') };
    get addToCart() { return this.root.locator('a:has-text("Add to cart")') };

    async checkProductName(expectedName: string){
        await expect(this.productName).toHaveText(expectedName);
    }

    async checkPrice(expectedPrice: string){
        await expect(this.price).toContainText(expectedPrice);
    }

    async checkDescription(expectedDescription: string){
        await expect(this.description).toContainText(expectedDescription);
    }

    async clickAddToCart(){ 
        await this.addToCart.click();
        this.page.once('dialog', dialog => {
            expect(dialog.message()).toBe('Product added');
            dialog.dismiss().catch(() => {});
          });
    };
}