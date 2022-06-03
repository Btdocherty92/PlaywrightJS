import { test } from "./Fixtures/my-test";

const details = {
    email: "user@email.com",
    name: "John Smith",
    message: "Hello World!"
}

test.beforeEach(async ({common}) => {
    await common.navbar.goTo();
    await common.navbar.clickContact();
});

test.describe('Contact', () => {

    test('sign up button should open dialog', async ({ modals }) => {
        await modals.contact.checkTitleText('New message');
    });

    test('Close should cancel contact', async ({ modals }) => {
        await modals.contact.enterMessageDetails(details.email, details.name, details.message);
        await modals.contact.cancelModal('button');
    });

    test('Close cross should cancel sign up', async ({ modals }) => {
        await modals.contact.enterMessageDetails(details.email, details.name, details.message);
        await modals.contact.cancelModal('cross');
    });

    test('Send message button should confirm', async ({ modals }) => {
        await modals.contact.enterMessageDetails(details.email, details.name, details.message);
        await modals.contact.confirmModal(true);
    });
});