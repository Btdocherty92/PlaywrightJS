import { test } from "./Fixtures/my-test";

const testProduct = {
    name: 'Samsung galaxy s6',
    price: '$360',
    description: 'Samsung Galaxy S6'
}

test.beforeEach(async ({common, home}) => {
    await common.navbar.goTo();
    await home.products.clickProductLinkByName(testProduct.name);
});

test.describe('Select product and add to cart', () => {

    test('select product should navigate to product page and show product details', async ({product}) => {
        await product.productContent.checkProductName(testProduct.name);
        await product.productContent.checkPrice(testProduct.price);
        await product.productContent.checkDescription(testProduct.description);
    });

    test('add to cart while display success message', async ({product}) => {
        await product.productContent.clickAddToCart();
    });
});