import { test } from "./Fixtures/my-test";

const user = {
    name: "test_user",
    password: "test$123"
}

function GenerateName() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

test.beforeEach(async ({ common }) => {
    await common.navbar.goTo();
    await common.navbar.clickSignUp();
});

test.describe('Sign up', () => {

    test('sign up button should open dialog', async ({ modals }) => {
        await modals.signUp.checkTitleText('Sign up');
    });

    test('Close should cancel sign up', async ({ modals }) => {
        const name = GenerateName();
        await modals.signUp.fillDetails(`${user.name}${name}`, user.password);
        await modals.signUp.cancelSignUp('button');
    });

    test('Close cross should cancel sign up', async ({ modals }) => {
        const name = GenerateName();
        await modals.signUp.fillDetails(`${user.name}${name}`, user.password);
        await modals.signUp.cancelSignUp('cross');
    });

    test('Sign up button should confirm', async ({ modals }) => {
        const name = GenerateName();
        await modals.signUp.fillDetails(`${user.name}${name}`, user.password);
        await modals.signUp.confirmSignUp(true);
    });

    test('Existing user should fail', async ({ modals }) => {
        await modals.signUp.fillDetails(user.name, user.password);
        await modals.signUp.confirmSignUp(false);
    });
})