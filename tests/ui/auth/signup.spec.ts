import { test } from '@playwright/test';
import { HomePage } from '../../../src/pages/HomePage';
import { SignupLoginPage } from '../../../src/pages/SignupLoginPage';
import { AccountCreatedPage } from '../../../src/pages/AccountCreatedPage';

test.describe('Authentication - Signup', () => {
  test('TC01 - Register user successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupLoginPage = new SignupLoginPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);

    const username = `Demo User`;
    const email = `demo_user@testmail.com`;
    const password = 'Password123!';
    const url = 'https://automationexercise.com/';
    /* await test.step('Open home page and verify it is visible', async () => {
       await homePage.goto('/';
       await homePage.verifyHomePageVisible();
     });
   */

    await test.step('Open Signup / Login page', async () => {
      await homePage.goto(url);
      await homePage.openSignupLoginPage();
      await signupLoginPage.verifyNewUserSignupVisible();
    });

    await test.step('Submit new user signup information', async () => {
      await signupLoginPage.submitNewUserSignup('Auto User', 'auto_user@testmail.com');
      await signupLoginPage.verifyEnterAccountInformationVisible();
    });

    await test.step('Fill account and address information', async () => {
      await signupLoginPage.fillAccountInformation('Auto User', 'auto_user@testmail.com', 'Password123!');
      await signupLoginPage.fillAddressInformation();
      await signupLoginPage.createAccount();
    });

    await test.step('Verify account is created', async () => {
      await accountCreatedPage.clickContinue();
    });

    await test.step('Verify user is logged in', async () => {
      await homePage.verifyLoggedInAs('Auto User');
    });

    await test.step('Delete account and verify account is deleted', async () => {
      await homePage.deleteAccount();
      await accountCreatedPage.clickContinue();
    });
  });
});
