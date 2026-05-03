import { test } from '@playwright/test';
import { HomePage } from '../../../src/pages/HomePage';
import { SignupLoginPage } from '../../../src/pages/SignupLoginPage';
import { AccountCreatedPage } from '../../../src/pages/AccountCreatedPage';

test.describe('Authentication - Signup', () => {
  test('TC01 - Register user successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);

    const username = `Auto User`;
    const email = `auto_user@testmail.com`;
    const password = 'Password123!';

    await test.step('Open home page and verify it is visible', async () => {
      await homePage.goto('/');
      await homePage.verifyHomePageVisible();
    });

    await test.step('Open Signup / Login page', async () => {
      await homePage.openSignupLoginPage();
      await signupLoginPage.verifyNewUserSignupVisible();
    });

    await test.step('Submit new user signup information', async () => {
      await signupLoginPage.submitNewUserSignup(username, email);
      await signupLoginPage.verifyEnterAccountInformationVisible();
    });

    await test.step('Fill account and address information', async () => {
      await signupLoginPage.fillAccountInformation(username, email, password);
      await signupLoginPage.fillAddressInformation();
      await signupLoginPage.createAccount();
    });

    await test.step('Verify account is created', async () => {
      await accountCreatedPage.verifyAccountCreatedVisible();
      await accountCreatedPage.clickContinue();
    });

    await test.step('Verify user is logged in', async () => {
      await homePage.verifyLoggedInAs(username);
    });

    await test.step('Delete account and verify account is deleted', async () => {
      await homePage.deleteAccount();
      await accountCreatedPage.verifyAccountDeletedVisible();
      await accountCreatedPage.clickContinue();
    });
  });
});
