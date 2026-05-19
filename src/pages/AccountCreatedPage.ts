import { Page } from '@playwright/test';
import {click, fill} from '../utils/actionUtils';
import { setPage } from '../utils/pageUtils';
import { isContained, tobeVisible } from '../utils/assertionUtils';

export class AccountCreatedPage {

  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
    setPage(page);
  }
    readonly accountCreatedTitle = "//b[text() = 'Account Created!']";
    readonly accountDeletedTitle = "//b[text() = 'Account Deleted!']";
    readonly continueButton = "//a[@data-qa = 'continue-button']";

  async verifyAccountCreatedVisible() {
    await tobeVisible(this.accountCreatedTitle);
  }

  async verifyAccountDeletedVisible() {
    await tobeVisible(this.accountDeletedTitle);
  }

  async clickContinue() {
    await click(this.continueButton);
  }
}
