import { test } from "../../../setup/pageSetup";

test.describe("Authentication - Signup", () => {
  test("TC01 - Register user successfully", async ({ homePage, signupFormPage, accountCreatedPage }) => {
    const username = "Auto User";
    const email = `auto_user_${Date.now()}@testmail.com`;
    const password = "Password123!";

    await signupFormPage.completeSignup(username, email, password);

    await accountCreatedPage.verifyCreatedAndContinue();

    await homePage.verifyLoggedInAs(username);

    await homePage.deleteAccount();
    await accountCreatedPage.verifyDeletedAndContinue();
  });

  test("TC05 - Register User with existing email", async ({ homePage, signupFormPage }) => {
    const username = "Auto User";
    const email = "demo_user@testmail.com";
    await signupFormPage.submitNewUserSignup(username, email);
    await homePage.verifyExistingEmailErrorMessage();
  });
});
