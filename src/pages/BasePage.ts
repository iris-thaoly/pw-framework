import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(url: string = 'https://automationexercise.com/') {
    await this.page.goto(url);
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async fill(locator: Locator, value: string) {
    await locator.fill(value);
  }

  async select(locator: Locator, value: string) {
    await locator.selectOption(value);
  }

  async check(locator: Locator) {
    await locator.check();
  }

  async expectVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async expectTextVisible(text: string) {
    await expect(this.page.locator(`// *[normalize-space()='${text}']`)).toBeVisible();
  }
}