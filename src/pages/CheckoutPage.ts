import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  constructor(readonly page: Page) { }

  readonly guestCheckoutButton = () => this.page.getByText('Guest Checkout');
  readonly continueAccountButton = () => this.page.locator('#button-account');
  readonly firstNameInput = () => this.page.locator('#input-payment-firstname');
  readonly lastNameInput = () => this.page.locator('#input-payment-lastname');
  readonly emailInput = () => this.page.locator('#input-payment-email');
  readonly telephoneInput = () => this.page.locator('#input-payment-telephone');
  readonly companyInput = () => this.page.locator('#input-payment-company');
  readonly address1Input = () => this.page.locator('#input-payment-address-1');
  readonly address2Input = () => this.page.locator('#input-payment-address-2');
  readonly cityInput = () => this.page.locator('#input-payment-city');
  readonly postcodeInput = () => this.page.locator('#input-payment-postcode');
  readonly countrySelect = () => this.page.locator('#input-payment-country');
  readonly zoneSelect = () => this.page.locator('#input-payment-zone');
  readonly continueGuestButton = () => this.page.locator('#button-guest');
  readonly commentTextarea = () => this.page.locator('textarea');
  readonly continueShippingMethodButton = () => this.page.locator('#button-shipping-method');
  readonly agreeCheckbox = () => this.page.locator('input[type="checkbox"][name="agree"]');
  readonly continuePaymentMethodButton = () => this.page.locator('#button-payment-method');
  readonly totalText = () => this.page.getByText('Total:', { exact: true });
  readonly confirmOrderButton = () => this.page.locator('#button-confirm');
  readonly orderPlacedText = () => this.page.getByText('Your order has been placed!');

  async goto() {
    await this.page.goto('http://opencart.abstracta.us/index.php');
  }

  async clickGuestCheckout() {
    await this.guestCheckoutButton().click({ button: 'left', clickCount: 1 });
  }

  async clickContinueAccount() {
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      const isVisible = await this.firstNameInput().isVisible();
      if (isVisible) {
        return;
      }
      await this.page.waitForTimeout(200);
      attempts++;
    }
    await this.continueAccountButton().click({ button: 'left', clickCount: 1 });
  }

  async fillFirstName(value: string) {
    await this.firstNameInput().fill(value);
  }

  async fillLastName(value: string) {
    await this.lastNameInput().fill(value);
  }

  async fillEmail(value: string) {
    await this.emailInput().fill(value);
  }

  async fillTelephone(value: string) {
    await this.telephoneInput().fill(value);
  }

  async fillCompany(value: string) {
    await this.companyInput().fill(value);
  }

  async fillAddress1(value: string) {
    await this.address1Input().fill(value);
  }

  async fillAddress2(value: string) {
    await this.address2Input().fill(value);
  }

  async fillCity(value: string) {
    await this.cityInput().fill(value);
  }

  async fillPostcode(value: string) {
    await this.postcodeInput().fill(value);
  }

  async selectCountry(value: string) {
    await this.countrySelect().click({ button: 'left', clickCount: 1 });
    await this.countrySelect().selectOption(value);
  }

  async selectZone(value: string) {
    await this.zoneSelect().click({ button: 'left', clickCount: 1 });
    await this.zoneSelect().selectOption(value);
  }

  async clickContinueGuest() {
    await this.continueGuestButton().click({ button: 'left', clickCount: 1 });
  }

  async fillComment(value: string) {
    await this.commentTextarea().fill(value);
  }

  async clickContinuePaymentMethod() {
    await this.continuePaymentMethodButton().click({ button: 'left', clickCount: 1 });
  }

  async clickAgreeCheckbox() {
    await this.agreeCheckbox().click({ button: 'left', clickCount: 1 });
  }

  async continueShippingMethod() {
    await this.continueShippingMethodButton().click({ button: 'left', clickCount: 1 });
  }

  async clickConfirmOrder() {
    await this.confirmOrderButton().click({ button: 'left', clickCount: 1 });
  }
}