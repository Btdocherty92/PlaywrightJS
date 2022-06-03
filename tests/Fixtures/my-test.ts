import { test as base, expect, Page } from '@playwright/test';
import { Modals } from '../Pages/modals';
import { Common } from '../Pages/common';

type MyFixtures = {
    modals: Modals;
    common: Common;
};

export const test = base.extend<MyFixtures>({
    modals: async ({ page }, use) => {
        await use(new Modals(page));
    },

    common: async ({page}, use) => {
        await use(new Common(page));
    }
});