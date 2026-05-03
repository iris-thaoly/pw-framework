import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SignupLoginPage extends BasePage {
  readonly newUserSignupTitle: Locator;
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;

  readonly enterAccountInformationTitle: Locator;
  readonly titleRadio: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly dayDropdown: Locator;
  readonly monthDropdown: Locator;
  readonly yearDropdown: Locator;
  readonly newsletterCheckbox: Locator;
  readonly specialOffersCheckbox: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly companyInput: Locator;
  readonly addressInput: Locator;
  readonly address2Input: Locator;
  readonly countryDropdown: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileNumberInput: Locator;
  readonly createAccountButton: Locator;

  constructor(page: Page) {
    super(page);

    this.newUserSignupTitle = page.locator("//h2[text() = 'New User Signup!']");
    this.signupNameInput = page.locator("//input[@data-qa = 'signup-name']");
    this.signupEmailInput = page.locator("//input[@data-qa = 'signup-email']");
    this.signupButton = page.locator("//button[@data-qa = 'signup-button']");

    this.enterAccountInformationTitle = page.locator("//b[text() = 'Enter Account Information']");
    this.titleRadio = page.locator("//input[@id = 'id_gender2']");
    this.nameInput = page.locator("//input[@id = 'name']");
    this.emailInput = page.locator("//input[@id = 'email']");
    this.passwordInput = page.locator("//input[@id = 'password']");
    this.dayDropdown = page.locator("//select[@id = 'days']");
    this.monthDropdown = page.locator("//select[@id = 'months']");
    this.yearDropdown = page.locator("//select[@id = 'years']");
    this.newsletterCheckbox = page.locator("//input[@id = 'newsletter']");
    this.specialOffersCheckbox = page.locator("//input[@id = 'optin']");

    this.firstNameInput = page.locator("//input[@id = 'first_name']");
    this.lastNameInput = page.locator("//input[@id = 'last_name']");
    this.companyInput = page.locator("//input[@id = 'company']");
    this.addressInput = page.locator("//input[@id = 'address1']");
    this.address2Input = page.locator("//input[@id = 'address2']");
    this.countryDropdown = page.locator("//select[@id = 'country']");
    this.stateInput = page.locator("//input[@id = 'state']");
    this.cityInput = page.locator("//input[@id = 'city']");
    this.zipcodeInput = page.locator("//input[@id = 'zipcode']");
    this.mobileNumberInput = page.locator("//input[@id = 'mobile_number']");
    this.createAccountButton = page.locator("//button[@type = 'submit' and contains(., 'Create Account')]");
  }

  async verifyNewUserSignupVisible() {
    await expect(this.newUserSignupTitle).toBeVisible();
  }

  async submitNewUserSignup(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async verifyEnterAccountInformationVisible() {
    await expect(this.enterAccountInformationTitle).toBeVisible();
  }

  async fillAccountInformation(name: string, email: string, password: string) {
    await this.titleRadio.check();
    await this.nameInput.fill(name);
    await expect(this.emailInput).toHaveValue(email);
    await this.passwordInput.fill(password);
    await this.dayDropdown.selectOption('10');
    await this.monthDropdown.selectOption('May');
    await this.yearDropdown.selectOption('1995');
    await this.newsletterCheckbox.check();
    await this.specialOffersCheckbox.check();
  }

  async fillAddressInformation() {
    await this.firstNameInput.fill('Auto');
    await this.lastNameInput.fill('User');
    await this.companyInput.fill('Demo Company');
    await this.addressInput.fill('123 Test Street');
    await this.address2Input.fill('Suite 456');
    await this.countryDropdown.selectOption('Canada');
    await this.stateInput.fill('Ontario');
    await this.cityInput.fill('Toronto');
    await this.zipcodeInput.fill('100000');
    await this.mobileNumberInput.fill('1234567890');
  }

  async createAccount() {
    await this.createAccountButton.click();
  }
}
