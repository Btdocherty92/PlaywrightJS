import { test, expect, Page } from '@playwright/test';

const user = {
    name: "test_user",
    password: "test$123"
}

const selectors = {
    signUp: 'a:has-text("Sign up")',
    username: '#sign-username',
    pw: '#sign-password',
    close: '#signInModal >> text=Close',
    crossClose: '#signInModal >> [aria-label="Close"]',
    modalTitle: '#signInModalLabel.modal-title',
    signUpConfirm: 'button:has-text("Sign up")'
}

function GenerateName() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await page.locator(selectors.signUp).click();
});

test.describe('Sign up', () => {
    test('sign up button should open dialog', async ({page}) => {
        await expect(page.locator(selectors.modalTitle)).toHaveText('Sign up');
    });

    test('Close will cancel sign up', async ({page}) => {
        const name = GenerateName();
        await page.locator(selectors.username).fill(`${user.name}${name}`);
        await page.locator(selectors.pw).fill(user.password);
        await page.locator(selectors.close).click();
        await expect(page.locator(selectors.modalTitle)).not.toBeVisible();
    });

    test('Close cross will cancel sign up', async ({page}) => {
        const name = GenerateName();
        await page.locator(selectors.username).fill(`${user.name}${name}`);
        await page.locator(selectors.pw).fill(user.password);
        await page.locator(selectors.crossClose).click();
        await expect(page.locator(selectors.modalTitle)).not.toBeVisible();
    });

    test('Sign up will confirm', async ({page}) => {
        const name = GenerateName();
        await page.locator(selectors.username).fill(`${user.name}${name}`);
        await page.locator(selectors.pw).fill(user.password);

        await page.locator('button:has-text("Sign up")').click();
        page.once('dialog', dialog => {
            expect(dialog.message()).toBe('Sign up successful.')
            dialog.dismiss().catch(() => {});
        });
        await expect(page.locator(selectors.modalTitle)).not.toBeVisible();
    });

    test('Existing user will fail', async ({page}) => {        
        await page.locator(selectors.username).fill(`${user.name}`);
        await page.locator(selectors.pw).fill(user.password);

        await page.locator('button:has-text("Sign up")').click();
        page.once('dialog', dialog => {
            expect(dialog.message()).toBe('This user already exist.')
            dialog.dismiss().catch(() => {});
        });
        await expect(page.locator(selectors.modalTitle)).toBeVisible();
    });
})