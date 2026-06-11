import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SignupFormPage } from "../pages/SignupFormPage";
import { AccountCreatedPage } from "../pages/AccountCreatedPage";
import { ProductsPage } from "../pages/ProductsPage";
import { Page, test as baseTest } from "@playwright/test";
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
  productsPage: ProductsPage;
};

export const test = baseTest.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage(url);
    await loginPage.verifyLoginVisible();
    await loginPage.login(email, password);
    await use(loginPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  signupFormPage: async ({ page }, use) => {
    const signupFormPage = new SignupFormPage(page);
    await use(signupFormPage);
  },
  accountCreatedPage: async ({ page }, use) => {
    const accountCreatedPage = new AccountCreatedPage(page);
    await use(accountCreatedPage);
  },
  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },
});
