import { test } from '@playwright/test';
import { HomePage } from '../../../src/pages/HomePage';
import { LoginPage } from '../../../src/pages/LoginPage';

test.describe('Authentication - Login', () => {
    test('TC02 - Login User with correct email and password', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        const email = `demo_user@testmail.com`;
        const password = 'Password123!';
        const url = 'https://automationexercise.com/';

        await test.step('Open Signup / Login page', async () => {
            await homePage.goto(url);
            await homePage.openSignupLoginPage();
            await loginPage.verifyLoginVisible();
        });

        await test.step('Submit login information', async () => {
            await loginPage.login('demo_user@testmail.com', 'Password123!');
        });

        await test.step('Verify user is logged in', async () => {
            await homePage.verifyLoggedInAs('Demo User');
        });

        await test.step('Logout user and verify user is logged out', async () => {
            await homePage.logout();
            await loginPage.verifyLoginVisible();
        });
    });

    test('TC03 - Login User with incorrect email and password', async ({ page }) => {
        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);

        const email = `demo@testmail.com`;
        const password = 'Password123!';
        const url = 'https://automationexercise.com/';

        await test.step('Open Signup / Login page', async () => {
            await homePage.goto(url);
            await homePage.openSignupLoginPage();
            await loginPage.verifyLoginVisible();
        });

        await test.step('Submit login information', async () => {
            await loginPage.login('demo@testmail.com', 'Password123!');
        });

        await test.step('Verify login error message is displayed', async () => {
            await loginPage.verifyLoginErrorMessage();
        });
    });
});
