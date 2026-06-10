import { test } from '@playwright/test';
import { ProductsPage } from '../../../pages/products.page';

test.describe('Product List', () => {
    test('TC07 - Verify that all products are visible and product details are correct', async ({ page }) => {
        const productsPage = new ProductsPage(page);

        await page.goto('/products');
        await productsPage.verifyProductsPageVisible();
        await productsPage.verifyProductsListVisible();
    });
});