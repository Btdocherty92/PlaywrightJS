import { expect, Locator, Page } from "@playwright/test";
import { SignUp } from "../Components/signUp";
import { Contact } from "../Components/contact";
import { PlaceOrder } from "../Components/placeOrder";

export class Modals {
    readonly page: Page

    constructor(page: Page){
        this.page = page;
    }
    
    get contact () { return new Contact(this.page) };
    get signUp () { return new SignUp(this.page) };
    get placeOrder () { return new PlaceOrder(this.page) };
}