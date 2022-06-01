import { test, expect, Page } from '@playwright/test';
import { SignUpPage } from './PageObjects/signUp-page';
import { SignUp } from './PageObjects/sign-up-page-selectors-outside-constructor';

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
        const signUp = new SignUp(page);
        await signUp.checkTitleText('Sign up');
    });

    test('Close should cancel sign up', async ({page}) => {
        const signUp = new SignUp(page);
        const name = GenerateName();
        await signUp.fillDetails(`${user.name}${name}`, user.password);
        await signUp.cancelSignUp("button");
    });

    test('Close cross should cancel sign up', async ({page}) => {
        const signUp = new SignUp(page);
        const name = GenerateName();
        await signUp.fillDetails(`${user.name}${name}`, user.password);
        await signUp.cancelSignUp("cross");
    });

    test('Sign up button should confirm', async ({page}) => {
        const signUp = new SignUp(page);
        const name = GenerateName();
        await signUp.fillDetails(`${user.name}${name}`, user.password);
        await signUp.confirmSignUp(true);
    });

    test('Existing user should fail', async ({page}) => {
        const signUp = new SignUp(page);
        await signUp.fillDetails(user.name, user.password);
        await signUp.confirmSignUp(false);
    });
})