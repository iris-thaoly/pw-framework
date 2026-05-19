import { Page } from '@playwright/test';
import { click } from '../utils/actionUtils';
import { setPage } from '../utils/pageUtils';
import { isContained, tobeVisible } from '../utils/assertionUtils';

export class HomePage {

  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
    setPage(page);
  }

  readonly websiteLogo = "//img[@alt = 'Website for automation practice']";
  readonly signupLoginLink = "//a[@href = '/login']";
  readonly deleteAccountLink = "//a[@href = '/delete_account']";
  readonly loggedInAsText = "//li[contains(., 'Logged in as')]";
  readonly logoutLink = "//a[@href = '/logout']";

  async goto(url: string) {
    await this.page.goto(url);
  }

  async verifyHomePageVisible() {
    await tobeVisible(this.websiteLogo);
  }

  async openSignupLoginPage() {
    await click(this.signupLoginLink);
  }

  async verifyLoggedInAs(username: string) {
    await isContained(this.loggedInAsText, username);
  }

  async deleteAccount() {
    await click(this.deleteAccountLink);
  }

  async logout() {
    await click(this.logoutLink);
  }
}
