import { test, expect, Page } from '@playwright/test';
import { SignUpPage } from './PageObjects/signUp-page';

const user = {
    name: "test_user",
    password: "test$123"
}

const selectors = {
    signUp: 'a:has-text("Sign up")'
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
        const signUpPage = new SignUpPage(page);
        await signUpPage.checkTitleText('Sign up');
        //await expect(page.locator(selectors.modalTitle)).toHaveText('Sign up');
    });

    test('Close should cancel sign up', async ({page}) => {
        const signUpPage = new SignUpPage(page);
        const name = GenerateName();
        await signUpPage.fillDetails(`${user.name}${name}`, user.password);
        await signUpPage.cancelSignUp("button");
    });

    test('Close cross should cancel sign up', async ({page}) => {
        const signUpPage = new SignUpPage(page);
        const name = GenerateName();
        await signUpPage.fillDetails(`${user.name}${name}`, user.password);
        await signUpPage.cancelSignUp("cross");
    });

    test('Sign up button should confirm', async ({page}) => {
        const signUpPage = new SignUpPage(page);
        const name = GenerateName();
        await signUpPage.fillDetails(`${user.name}${name}`, user.password);
        await signUpPage.confirmSignUp(true);
    });

    test('Existing user should fail', async ({page}) => {
        const signUpPage = new SignUpPage(page);
        await signUpPage.fillDetails(user.name, user.password);
        await signUpPage.confirmSignUp(false);
    });
})