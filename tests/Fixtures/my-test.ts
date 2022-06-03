import { test as base, expect, Page } from '@playwright/test';
import { Modals } from '../Pages/modals';
import { Common } from '../Pages/common';
import { Home } from "../Pages/home";
import { Product } from '../Pages/product';
import { CompleteOrder } from '../Pages/completeOrder';

type MyFixtures = {
    modals: Modals;
    common: Common;
    home: Home;
    product: Product;
    completeOrder: CompleteOrder;
};

export const test = base.extend<MyFixtures>({
    modals: async ({ page }, use) => {
        await use(new Modals(page));
    },

    common: async ({page}, use) => {
        await use(new Common(page));
    },

    home: async ({page}, use) => {
        await use(new Home(page));
    },

    product: async ({page}, use) => {
        await use(new Product(page));
    },

    completeOrder: async ({page}, use) => {
        await use(new CompleteOrder(page));
    }
});