import { Page } from '@playwright/test';
import {click, fill} from '../utils/actionUtils';
import { setPage } from '../utils/pageUtils';
import { isContained, tobeVisible } from '../utils/assertionUtils';
import { step } from '../utils/testStepUtils';

export class AccountCreatedPage {

  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
    setPage(page);
  }
    readonly accountCreatedTitle = "//b[text() = 'Account Created!']";
    readonly accountDeletedTitle = "//b[text() = 'Account Deleted!']";
    readonly continueButton = "//a[@data-qa = 'continue-button']";

  @step('Verify account created message is visible')
  async verifyAccountCreatedVisible() {
    await tobeVisible(this.accountCreatedTitle);
  }

  @step('Verify account deleted message is visible')
  async verifyAccountDeletedVisible() {
    await tobeVisible(this.accountDeletedTitle);
  }

  @step('Click continue on account created/deleted page')
  async clickContinue() {
    await click(this.continueButton);
  }

  @step('Verify account created and continue')
  async verifyCreatedAndContinue() {
    await this.verifyAccountCreatedVisible();
    await this.clickContinue();
  }

  @step('Verify account deleted and continue')
  async verifyDeletedAndContinue() {
    await this.verifyAccountDeletedVisible();
    await this.clickContinue();
  }
}
