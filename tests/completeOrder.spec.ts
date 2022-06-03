import { test } from "./Fixtures/my-test";

const orderDetails = {
    name: 'John Smith',
    country: 'United Kingdom',
    city: 'Edinburgh',
    card: '0000 0000 0000 0000',
    month: 'June',
    year: '2022'
}

test.beforeEach(async ({common, home, product}) => {
    await common.navbar.goTo();
    await home.products.clickProductLinkByName('Samsung galaxy s6');
    await product.productContent.clickAddToCart();
    await common.navbar.clickCart();
});

test.describe('Complete Order', () => {

    test('Cart navbar should navigates to cart page', async ({completeOrder}) => {
        await completeOrder.orderDetails.checkPrice('360');
    });

    test('Place order should bring up modal', async ({completeOrder, modals}) =>{
        await completeOrder.orderDetails.clickPlaceOrder();
        await modals.placeOrder.checkTitleText('Place order');
    });
});