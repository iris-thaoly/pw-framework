import { Page } from '@playwright/test';
import { click } from '../utils/actionUtils';
import { setPage } from '../utils/pageUtils';
import { isContained, tobeVisible } from '../utils/assertionUtils';
import { step } from '../utils/testStepUtils';

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
  readonly signupErrorMessage = "//p[text() = 'Email Address already exist!']";


  @step("Navigate to home page")
  async goto(url: string) {
    await this.page.goto(url);
  }

  @step("Verify home page is visible")
  async verifyHomePageVisible() {
    await tobeVisible(this.websiteLogo);
  }

  @step("Open Signup / Login page")
  async openSignupLoginPage() {
    await click(this.signupLoginLink);
  }

  @step("Navigate to signup/login page")
  async gotoSignupLoginPage(url: string) {
    await this.goto(url);
    await this.openSignupLoginPage();
  }

  @step("Verify user is logged in")
  async verifyLoggedInAs(username: string) {
    await isContained(this.loggedInAsText, username);
  }

  @step("Delete account")
  async deleteAccount() {
    await click(this.deleteAccountLink);
  }

  @step("Logout")
  async logout() {
    await click(this.logoutLink);
  }

  @step("Navigate to home page and verify it is visible")
  async gotoHomePageAndVerify() {
    await this.goto('/');
    await this.verifyHomePageVisible();
  }

  @step("Verify error message for existing email")
  async verifyExistingEmailErrorMessage() {
    await tobeVisible(this.signupErrorMessage);
  }
}