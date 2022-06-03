import { expect, Locator, Page } from "@playwright/test";
import { BaseModal } from "../Bases/BaseModal";

export class PlaceOrder extends BaseModal {
    readonly page: Page;

    constructor(page: Page){
        super(page);
        this.page = page;
    }

    // overwrite base locators
    get root () { return this.page.locator('#orderModal') };
    get confirm () { return this.root.locator('a:has-text("Purchase")') };

    // locators specific to order modal
    get name () { return this.root.locator('#name') };
    get country () { return this.root.locator('#country') };
    get city () { return this.root.locator('#city') };
    get card () { return this.root.locator('#card') };
    get month () { return this.root.locator('#month') };
    get year () { return this.root.locator('#year') };

    async fillOrderDetails(
        name: string,
        country: string,
        city: string,
        card: string,
        month: string,
        year: string
    ) {
        await this.name.fill(name);
        await this.country.fill(country);
        await this.city.fill(city);
        await this.card.fill(card);
        await this.month.fill(month);
        await this.year.fill(year);
    }
}