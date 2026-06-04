import { test } from '@playwright/test';
import { HomePage } from '../../../src/pages/HomePage';
import { LoginPage } from '../../../src/pages/LoginPage';

test.describe('Authentication - Logout', () => {
    test('TC04 - Logout User after successful login', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        const email = 'demo_user@testmail.com';
        const password = 'Password123!';
        const url = 'https://automationexercise.com/';

        await homePage.gotoSignupLoginPage(url);
        await loginPage.verifyLoginVisible();

        await loginPage.login(email, password);

        await homePage.verifyLoggedInAs('Demo User');

        await homePage.logout();
        await loginPage.verifyLoginVisible();
    });
});