import { Page } from '@playwright/test';
import { click, fill, check } from '../utils/actionUtils';
import { setPage } from '../utils/pageUtils';
import { isContained, tobeVisible } from '../utils/assertionUtils';


export class SignupLoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    setPage(page);
  }

  readonly newUserSignupTitle = "//h2[text() = 'New User Signup!']";
  readonly signupNameInput = "//input[@data-qa = 'signup-name']";
  readonly signupEmailInput = "//input[@data-qa = 'signup-email']";
  readonly signupButton = "//button[@data-qa = 'signup-button']";

  readonly enterAccountInformationTitle = "//b[text() = 'Enter Account Information']";
  readonly titleRadio = "//input[@type = 'radio' and @id = 'id_gender2']";
  readonly nameInput = "//input[@id = 'name']";
  readonly emailInput = "//input[@id = 'email']";
  readonly passwordInput = "//input[@id = 'password']";
  readonly dayDropdown = "//select[@id = 'days']";
  readonly monthDropdown = "//select[@id = 'months']";
  readonly yearDropdown = "//select[@id = 'years']";
  readonly newsletterCheckbox = "//input[@id = 'newsletter']";
  readonly specialOffersCheckbox = "//input[@id = 'optin']";

  readonly firstNameInput = "//input[@id = 'first_name']";
  readonly lastNameInput = "//input[@id = 'last_name']";
  readonly companyInput = "//input[@id = 'company']";
  readonly addressInput = "//input[@id = 'address1']";
  readonly address2Input = "//input[@id = 'address2']";
  readonly countryDropdown = "//select[@id = 'country']";
  readonly stateInput = "//input[@id = 'state']";
  readonly cityInput = "//input[@id = 'city']";
  readonly zipcodeInput = "//input[@id = 'zipcode']";
  readonly mobileNumberInput = "//input[@id = 'mobile_number']";
  readonly createAccountButton = "//button[@type = 'submit' and contains(., 'Create Account')]";


  async verifyNewUserSignupVisible() {
    await tobeVisible(this.newUserSignupTitle);
  }

  async submitNewUserSignup(name: string, email: string) {
    await fill(this.signupNameInput, name);
    await fill(this.signupEmailInput, email);
    await click(this.signupButton);
  }

  async verifyEnterAccountInformationVisible() {
    await tobeVisible(this.enterAccountInformationTitle);
  }

  async fillAccountInformation(name: string, email: string, password: string) {
    await check(this.titleRadio);
    await fill(this.nameInput, name);
    await tobeVisible(this.emailInput);
    await fill(this.passwordInput, password);
    await click(this.dayDropdown);
    await click(this.monthDropdown);
    await click(this.yearDropdown);
    await click(this.newsletterCheckbox);
    await click(this.specialOffersCheckbox);
  }

  async fillAddressInformation() {
    await fill(this.firstNameInput, 'Auto');
    await fill(this.lastNameInput, 'User');
    await fill(this.companyInput, 'Demo Company');
    await fill(this.addressInput, '123 Test Street');
    await fill(this.address2Input, 'Suite 456');
    await click(this.countryDropdown);
    await fill(this.stateInput, 'Ontario');
    await fill(this.cityInput, 'Toronto');
    await fill(this.zipcodeInput, '100000');
    await fill(this.mobileNumberInput, '1234567890');
  }

  async createAccount() {
    await click(this.createAccountButton);
  }
}
