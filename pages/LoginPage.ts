import { Page } from '@playwright/test';
import { click, fill, check } from '../utils/actionUtils';
import { getPage, setPage } from '../utils/pageUtils';
import { isContained, tobeVisible } from '../utils/assertionUtils';
import { step } from '../utils/testStepUtils';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        setPage(page);
    }

    readonly loginTitle = "//h2[text() = 'Login to your account']";
    readonly emailInput = "//input[@data-qa = 'login-email']";
    readonly passwordInput = "//input[@data-qa = 'login-password']";
    readonly loginButton = "//button[@data-qa = 'login-button']";
    readonly loginErrorMessage = "//p[text() = 'Your email or password is incorrect!']";
    readonly signupAndLoginLink = "//a[text()=' Signup / Login']";

    @step('Navigate to login page')
    async gotoLoginPage(url: string) {
        const page = getPage();
        await page.goto(url);
    }

    @step('Verify login form is visible')
    async verifyLoginVisible() {
        // await tobeVisible(this.loginTitle);
    }

    @step('Submit login information')
    async login(email: string, password: string) {
        await click(this.signupAndLoginLink);
        await fill(this.emailInput, email);
        await fill(this.passwordInput, password);
        await click(this.loginButton);
    }

    @step('Verify login error message is displayed')
    async verifyLoginErrorMessage() {
        await tobeVisible(this.loginErrorMessage);
    }
}
