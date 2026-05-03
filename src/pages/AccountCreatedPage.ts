import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountCreatedPage extends BasePage {
  readonly accountCreatedTitle: Locator;
  readonly accountDeletedTitle: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);

    this.accountCreatedTitle = page.locator("//b[text() = 'Account Created!']");
    this.accountDeletedTitle = page.locator("//b[text() = 'Account Deleted!']");
    this.continueButton = page.locator("//a[@data-qa = 'continue-button']");
  }

  async verifyAccountCreatedVisible() {
    await expect(this.accountCreatedTitle).toBeVisible();
  }

  async verifyAccountDeletedVisible() {
    await expect(this.accountDeletedTitle).toBeVisible();
  }

  async clickContinue() {
    await this.continueButton.click();
  }
}
