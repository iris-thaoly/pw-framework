import { test } from "../../../setup/pageSetup";
test.describe("Authentication - Signup", () => {
  test("TC01 - Register user successfully", async ({ page, homePage, signupFormPage, accountCreatedPage }) => {
    const username = "Auto User";
    const email = "auto_user@testmail.com";
    const password = "Password123!";
    const url = "https://automationexercise.com/";

    await homePage.gotoSignupLoginPage(url);
    await signupFormPage.verifyNewUserSignupVisible();

    await signupFormPage.completeSignup(username, email, password);

    await accountCreatedPage.verifyCreatedAndContinue();

    await homePage.verifyLoggedInAs(username);

    await homePage.deleteAccount();
    await accountCreatedPage.verifyDeletedAndContinue();
  });

  test("TC05 - Register User with existing email", async ({ page, homePage, signupFormPage, accountCreatedPage }) => {
    const username = "Auto User";
    const email = "demo_user@testmail.com";
    const password = "Password123!";
    const url = "https://automationexercise.com/";

    await homePage.gotoSignupLoginPage(url);
    await signupFormPage.verifyNewUserSignupVisible();
    await signupFormPage.submitNewUserSignup(username, email);
    await homePage.verifyExistingEmailErrorMessage();
  });
});
