import { HomePage } from "../../../pages/HomePage";
import { LoginPage } from "../../../pages/LoginPage";
import { test } from "../../../setup/pageSetup";
import { loadEnv } from "../../../setup/env";
import { env } from "../../../utils/envUtils";


const email = env.USERNAME;
const password = env.PASSWORD;
const url = env.URL;
test.describe("Authentication - Login", () => {
  test("TC02 - Login User with correct email and password", async ({ page, loginPage, homePage }) => {
    // const email = "demo_user@testmail.com";
    // const password = "Password123!";
    // const url = "https://automationexercise.com/";


 
    await homePage.verifyLoggedInAs("Demo User");
    await homePage.logout();
    await loginPage.verifyLoginVisible();
  });

  test("TC03 - Login User with incorrect email and password", async ({ page, loginPage, homePage }) => {
    // const email = "demo@testmail.com";
    // const password = "Password123!";
    // const url = "https://automationexercise.com/";

    // await homePage.gotoSignupLoginPage(url);
    // await loginPage.verifyLoginVisible();
    // await loginPage.login(email, password);

    await loginPage.verifyLoginErrorMessage();
  });
});
