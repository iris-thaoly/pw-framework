import { test } from '@playwright/test';
import { ProductsPage } from '../../../src/pages/ProductsPage';

test.describe('Product Detail', () => {
    test('TC08 - Verify that product details are visible and correct', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await page.goto('/products');
        await productsPage.openProductDetails();
        await productsPage.closeAdvertisementIfVisible();
        await productsPage.verifyProductDetailsVisible();
    });
});