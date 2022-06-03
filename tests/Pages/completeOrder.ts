import { expect, Locator, Page } from "@playwright/test";
import { OrderDetails } from "../Components/orderDetails";

export class CompleteOrder {
    readonly page: Page

    constructor(page: Page){
        this.page = page;
    }
    
    get orderDetails () { return new OrderDetails(this.page) };
}