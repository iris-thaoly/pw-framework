import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SignupFormPage } from "../pages/SignupFormPage";
import { AccountCreatedPage } from "../pages/AccountCreatedPage";
import { Locator, Page, test as baseTest } from "@playwright/test";
import { setPage, closePage } from "../utils/pageUtils";
import { loadEnv } from "./env";
import { env } from "../utils/envUtils";

loadEnv();

const email = env.USERNAME;
const password = env.PASSWORD;
const url = env.URL;

baseTest.beforeEach(async ({ page }: { page: Page }) => {
  await page.route("**/*.{png,jpg,jpeg,gif,svg,webp,ico}", (route) => route.abort());
  baseTest.setTimeout(5000000);
  setPage(page);
});

baseTest.afterEach(async ({ page }: { page: Page }, testInfo) => {
  await closePage(1);
});

type MyFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  signupFormPage: SignupFormPage;
  accountCreatedPage: AccountCreatedPage;
};

export const test = baseTest.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
    await loginPage.gotoLoginPage(url);
    await loginPage.verifyLoginVisible();
    await loginPage.login(email, password);
    //api
    //db
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  signupFormPage: async ({ page }, use) => {
    await use(new SignupFormPage(page));
  },
  accountCreatedPage: async ({ page }, use) => {
    await use(new AccountCreatedPage(page));
  },
});
