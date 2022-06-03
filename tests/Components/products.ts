import { test, expect, Page } from '@playwright/test';

export class Products {
    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    get root () { return this.page.locator('#tbodyid') };

    async clickProductLinkByName(name: string) { await this.root.locator(`a:has-text("${name}")`).click() };
}