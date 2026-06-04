import { Page } from '@playwright/test';
import { click } from '../utils/actionUtils';
import { setPage } from '../utils/pageUtils';
import { isContained, tobeVisible } from '../utils/assertionUtils';
import { step } from '../utils/testStepUtils';

export class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    setPage(page);
  }
    readonly productsLink = "//a[@href = '/products']";
    readonly productsPageTitle = "//h2[text() = 'All Products']";
    readonly productsList = "//div[@class = 'features_items']";
    readonly viewProduct = "//a[@href = '/product_details/1']";
    readonly productName = "//h2[text() = 'Blue Top']";
    readonly productCategory = "//h2[text() = 'Category: Women > Tops']";
    readonly productPrice = "//h2[text() = 'Rs. 500']";
    readonly productAvailability = "//h2[text() = 'Availability:']";
    readonly productCondition = "//h2[text() = 'Condition:']";
    readonly productBrand = "//h2[text() = 'Brand:']";
    readonly productQuantity = "//h2[text() = 'Quantity:']";
    readonly closeAdvertisement = "//div[@class = 'continue-prompt-text']";

    @step("Navigate to products page")
    async navigateToProductsPage() {
        await click(this.productsLink);
    }

    @step("Verify products page is visible")
    async verifyProductsPageVisible() {
        await tobeVisible(this.productsPageTitle);
    }

    @step("Verify products list is visible")
    async verifyProductsListVisible() {
        await tobeVisible(this.productsList);
    }

    @step("Open product details")
    async openProductDetails() {
        await click(this.viewProduct);
    }

    @step("Close advertisement if visible")
    async closeAdvertisementIfVisible() {
        //if (await this.page.isVisible(this.closeAdvertisement)) {
            await click(this.closeAdvertisement);
        //}
    }

    @step("Verify product details are visible")
    async verifyProductDetailsVisible() {
        await tobeVisible(this.productName);
        await tobeVisible(this.productCategory);
        await tobeVisible(this.productPrice);
        await tobeVisible(this.productAvailability);
        await tobeVisible(this.productCondition);
        await tobeVisible(this.productBrand);
        await tobeVisible(this.productQuantity);
    }
}