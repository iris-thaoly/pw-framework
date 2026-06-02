import { test } from '@playwright/test';
import { HomePage } from '../../../src/pages/HomePage';
import { SignupFormPage} from '../../../src/pages/SignupFormPage';
import { AccountCreatedPage } from '../../../src/pages/AccountCreatedPage';

test.describe('Authentication - Signup', () => {
  test('TC01 - Register user successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupFormPage = new SignupFormPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);

    const username = 'Auto User';
    const email = 'auto_user@testmail.com';
    const password = 'Password123!';
    const url = 'https://automationexercise.com/';

    await homePage.gotoSignupLoginPage(url);
    await signupFormPage.verifyNewUserSignupVisible();

    await signupFormPage.completeSignup(username, email, password);

    await accountCreatedPage.verifyCreatedAndContinue();

    await homePage.verifyLoggedInAs(username);

    await homePage.deleteAccount();
    await accountCreatedPage.verifyDeletedAndContinue();
  });

  test('TC05 - Register User with existing email', async ({ page }) => {
    const homePage = new HomePage(page);
    const signupFormPage = new SignupFormPage(page);
    const accountCreatedPage = new AccountCreatedPage(page);

    const username = 'Auto User';
    const email = 'demo_user@testmail.com';
    const password = 'Password123!';
    const url = 'https://automationexercise.com/';

    await homePage.gotoSignupLoginPage(url);
    await signupFormPage.verifyNewUserSignupVisible();
    await signupFormPage.submitNewUserSignup(username, email);
    await homePage.verifyExistingEmailErrorMessage();
  });
});
