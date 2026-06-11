
import { test } from "../../../setup/pageSetup";

test.describe('Product Detail', () => {
    test('TC08 - Verify that product details are visible and correct', async ({ page, productsPage}) => {
        await page.goto('/products');
        await productsPage.openProductDetails();
        await productsPage.closeAdvertisementIfVisible();
        await productsPage.verifyProductDetailsVisible();
        await productsPage.closeAdvertisementIfVisible();
    });
});