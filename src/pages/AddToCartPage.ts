import { Page } from '@playwright/test';

export class AddToCartPage {
  constructor(readonly page: Page) { }

  readonly addToCartButtons = () => this.page.getByText('ADD TO CART');
  readonly cartTotal = () => this.page.locator('#cart-total');

  async goto() {
    await this.page.goto('http://opencart.abstracta.us/index.php');
  }

  async gotoCheckout() {
    await this.page.goto('http://opencart.abstracta.us/index.php?route=checkout/checkout');
  }

  async getPriceInfoFromAncestor(buttonLocator: any) {
    const priceElement = buttonLocator.locator('xpath=ancestor::div[contains(@class, "product-thumb")]//p[@class="price"]');
    const priceText = await priceElement.textContent();
    if (!priceText) return { fullPrice: 0, exTax: 0 };
    const fullPriceMatch = priceText.match(/\$([\d,.]+)/);
    const exTaxMatch = priceText.match(/Ex Tax: \$([\d,.]+)/);
    const fullPrice = fullPriceMatch ? parseFloat(fullPriceMatch[1].replace(',', '')) : 0;
    const exTax = exTaxMatch ? parseFloat(exTaxMatch[1].replace(',', '')) : 0;
    return { fullPrice, exTax };
  }

  async clickFirstTwoAddToCartButtons() {
    const buttons = this.addToCartButtons();
    const count = await buttons.count();
    const itemsToClick = Math.min(count, 2);
    let totalFullPrice = 0;
    let totalExTax = 0;

    for (let i = 0; i < itemsToClick; i++) {
      const button = buttons.nth(i);
      const priceInfo = await this.getPriceInfoFromAncestor(button);
      totalFullPrice += priceInfo.fullPrice;
      totalExTax += priceInfo.exTax;
      await button.click({ button: 'left', clickCount: 1 });
      await this.page.waitForTimeout(500);
    }

    return { totalFullPrice, totalExTax };
  }

  async clickCartTotal() {
    await this.cartTotal().click({ button: 'left', clickCount: 1 });
  }
}