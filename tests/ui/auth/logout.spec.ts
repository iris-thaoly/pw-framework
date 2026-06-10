import { test } from "../../../setup/pageSetup";

test.describe("Authentication - Logout", () => {
  test("TC04 - Logout User after successful login", async ({ loginPage, homePage }) => {
    await homePage.verifyLoggedInAs("Demo User");

    await homePage.logout();
    await loginPage.verifyLoginVisible();
  });
});
