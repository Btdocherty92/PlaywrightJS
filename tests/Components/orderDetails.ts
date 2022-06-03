import { test, expect, Page } from '@playwright/test';

export class OrderDetails {
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    get root () { return this.page.locator('div:has-text("Total")') };
    get price() { return this.root.locator('#totalp') };
    get placeOrder () { return this.root.locator('button:has-text("Place Order")') };

    async checkPrice(expectedPrice: string) {
        await expect(this.price).toHaveText(expectedPrice);
    }

    async clickPlaceOrder() { return this.placeOrder.click() };
}