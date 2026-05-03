import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly websiteLogo: Locator;
  readonly signupLoginLink: Locator;
  readonly loggedInAsText: Locator;
  readonly deleteAccountLink: Locator;

  constructor(page: Page) {
    super(page);

    this.websiteLogo = page.locator("//img[@alt = 'Website for automation practice']");
    this.signupLoginLink = page.locator("//a[@href = '/login']");
    this.deleteAccountLink = page.locator("//a[@href = '/delete_account']");
    this.loggedInAsText = page.locator("//li[contains(., 'Logged in as')]");
  }

  async verifyHomePageVisible() {
    await expect(this.websiteLogo).toBeVisible();
  }

  async openSignupLoginPage() {
    await this.signupLoginLink.click();
  }

  async verifyLoggedInAs(username: string) {
    await expect(this.loggedInAsText).toContainText(`Logged in as ${username}`);
  }

  async deleteAccount() {
    await this.deleteAccountLink.click();
  }
}
